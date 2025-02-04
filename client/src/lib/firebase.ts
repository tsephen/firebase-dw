import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile as firebaseUpdateProfile,
  deleteUser,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  User,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
  writeBatch,
  where
} from "firebase/firestore";

// Verify Firebase config
const requiredEnvVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim()
};

if (Object.values(requiredEnvVars).some(value => !value)) {
  throw new Error("Missing required Firebase configuration. Please check your environment variables.");
}

const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: requiredEnvVars.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: requiredEnvVars.appId
};

// Initialize Firebase with session persistence
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
auth.useDeviceLanguage();

// Set up auth state persistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

// Configure Auth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export type SignUpData = {
  email: string;
  password: string;
  name: string;
  age: number;
};

export type UserRole = 'user' | 'admin' | 'disabled';

export interface UserRoleData {
  role: UserRole;
  updatedAt: string;
  updatedBy?: string;
}

// Role management functions
export async function setUserRole(userId: string, role: UserRole, updatedBy?: string) {
  try {
    console.log(`Setting role ${role} for user ${userId}`);
    // Create a plain object with only the necessary fields
    const roleData = {
      role: role,
      updatedAt: new Date().toISOString(),
      updatedBy: updatedBy || null // Ensure updatedBy is never undefined
    };

    await setDoc(doc(db, 'userRoles', userId), roleData);
    console.log(`Successfully set role for user ${userId}`);
  } catch (error: any) {
    console.error('Error setting user role:', error);
    throw new Error(error.message || 'Failed to set user role');
  }
}

export async function getUserRole(userId: string): Promise<UserRole> {
  try {
    const roleDoc = await getDoc(doc(db, 'userRoles', userId));
    return roleDoc.exists() ? roleDoc.data().role : 'user';
  } catch (error: any) {
    console.error('Error getting user role:', error);
    return 'user'; // Default to user role if there's an error
  }
}

// Updated listUsersWithRoles function to work with client-side SDK
export async function listUsersWithRoles(): Promise<{ userId: string; role: UserRole; updatedAt: string; email?: string | null; displayName?: string | null; }[]> {
  try {
    // Get all role documents
    const rolesRef = collection(db, 'userRoles');
    const rolesSnapshot = await getDocs(rolesRef);

    // Map role documents to user data
    const users = rolesSnapshot.docs.map(doc => {
      const roleData = doc.data();
      return {
        userId: doc.id,
        role: roleData.role as UserRole,
        updatedAt: roleData.updatedAt,
        email: roleData.email,
        displayName: roleData.displayName
      };
    });

    return users;
  } catch (error: any) {
    console.error('Error listing users with roles:', error);
    throw new Error('Failed to list users with roles');
  }
}

// Enhanced adminDeleteUser function for client-side
export async function adminDeleteUser(userId: string) {
  try {
    // Check if the current user is an admin
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    const adminRole = await getUserRole(currentUser.uid);
    if (adminRole !== 'admin') {
      throw new Error('Only admins can delete other users');
    }

    // Delete user's role document from Firestore first
    console.log(`Attempting to delete role document for user ${userId}`);
    const roleRef = doc(db, 'userRoles', userId);

    try {
      await deleteDoc(roleRef);
      console.log(`Successfully deleted role document for user ${userId}`);
    } catch (error: any) {
      console.error('Error deleting role document:', error);
      if (error.code === 'permission-denied') {
        throw new Error('Permission denied: Unable to delete user role. Please check your Firebase rules.');
      }
      throw error;
    }

    // Delete the user from Firebase Authentication using the Admin SDK endpoint
    const idToken = await currentUser.getIdToken();
    const response = await fetch(`/api/admin/deleteUser?userId=${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete user');
    }
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'User deletion partially failed');
    }

    console.log('User successfully deleted from both Firestore and Authentication');
    return true;
  } catch (error: any) {
    console.error('Error in admin delete user:', error);
    throw new Error(error.message || 'Failed to delete user');
  }
}

// Updated deleteAccount function for self-deletion
export async function deleteAccount() {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in');
  }

  const userId = auth.currentUser.uid;
  try {
    // First delete the user's role document from Firestore
    const roleRef = doc(db, 'userRoles', userId);
    await deleteDoc(roleRef);
    console.log('User role document deleted');

    // Then delete the user account from Firebase Auth
    await deleteUser(auth.currentUser);
    console.log('Account successfully deleted');
  } catch (error: any) {
    console.error('Error deleting account:', error);
    throw new Error(getErrorMessage(error));
  }
}

function getErrorMessage(error: any): string {
  if (typeof error === 'string') return error;

  const code = error?.code;
  switch (code) {
    case 'auth/invalid-credential':
      return 'Incorrect email or password';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/requires-recent-login':
      return 'Please log in again before updating your profile';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.';
    default:
      console.error('Firebase auth error:', error);
      return error?.message || 'An error occurred. Please try again';
  }
}

export async function updateProfile(user: User, updates: { displayName?: string }) {
  try {
    await firebaseUpdateProfile(user, updates);
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

// Helper function to check if role exists
async function checkAndSetDefaultRole(userId: string) {
  try {
    const roleDoc = await getDoc(doc(db, 'userRoles', userId));
    if (!roleDoc.exists()) {
      // Only set role if it doesn't exist
      await setUserRole(userId, 'user');
    }
  } catch (error) {
    console.error('Error checking/setting role:', error);
  }
}

export async function signUpWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    if (!result?.user) {
      throw new Error('No user data returned from Google sign-in');
    }

    const user = result.user;
    const name = user.displayName || user.email?.split('@')[0] || 'User';

    // Only set role for new users
    await checkAndSetDefaultRole(user.uid);

    await firebaseUpdateProfile(user, {
      displayName: name
    });

    return user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function signUpWithFacebook() {
  try {
    const result = await signInWithPopup(auth, facebookProvider);

    if (!result?.user) {
      throw new Error('No user data returned from Facebook sign-in');
    }

    const user = result.user;
    const name = user.displayName || user.email?.split('@')[0] || 'User';

    // Only set role for new users
    await checkAndSetDefaultRole(user.uid);

    await firebaseUpdateProfile(user, {
      displayName: name
    });

    return user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function signUp({ email, password, name, age }: SignUpData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Set default role for new users
    await setUserRole(userCredential.user.uid, 'user');

    await firebaseUpdateProfile(userCredential.user, {
      displayName: name
    });

    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function signIn(email: string, password: string) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export async function sendVerificationEmail() {
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser);
  }
}


export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updatePassword(user: User, currentPassword: string, newPassword: string) {
  try {
    // Re-authenticate user before changing password
    const credential = EmailAuthProvider.credential(
      user.email!,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    // Update password
    await firebaseUpdatePassword(user, newPassword);
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export { auth, db };

// Enhanced adminDisableUser function for client-side
export async function adminDisableUser(userId: string) {
  try {
    // Check if the current user is an admin
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    const adminRole = await getUserRole(currentUser.uid);
    if (adminRole !== 'admin') {
      throw new Error('Only admins can disable other users');
    }

    // First update user's role to disabled
    await setUserRole(userId, 'disabled');

    // Then disable the user's authentication account using Admin SDK endpoint
    const idToken = await currentUser.getIdToken();
    const response = await fetch(`/api/admin/disableUser?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to disable user');
    }

    // If the disabled user is currently signed in, sign them out
    if (auth.currentUser?.uid === userId) {
      await signOut();
    }

    console.log('User successfully disabled');
    return true;
  } catch (error: any) {
    console.error('Error in admin disable user:', error);
    throw new Error(error.message || 'Failed to disable user');
  }
}

export async function adminEnableUser(userId: string) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    const adminRole = await getUserRole(currentUser.uid);
    if (adminRole !== 'admin') {
      throw new Error('Only admins can enable other users');
    }

    // First enable the user's authentication account
    const idToken = await currentUser.getIdToken();
    const response = await fetch(`/api/admin/enableUser?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to enable user');
    }

    // Then update user's role to user
    await setUserRole(userId, 'user');

    console.log('User successfully enabled');
    return true;
  } catch (error: any) {
    console.error('Error in admin enable user:', error);
    throw new Error(error.message || 'Failed to enable user');
  }
}