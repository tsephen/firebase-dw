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
  reauthenticateWithCredential
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
  authDomain: `${requiredEnvVars.projectId}.firebaseapp.com`,
  projectId: requiredEnvVars.projectId,
  storageBucket: `${requiredEnvVars.projectId}.appspot.com`,
  appId: requiredEnvVars.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
auth.useDeviceLanguage();

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

export type UserRole = 'user' | 'admin';

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

// Updated listUsersWithRoles function to include user details
export async function listUsersWithRoles(): Promise<{ userId: string; role: UserRole; updatedAt: string; email?: string | null; displayName?: string | null; }[]> {
  try {
    // Get all role documents
    const rolesRef = collection(db, 'userRoles');
    const rolesSnapshot = await getDocs(rolesRef);

    // Get user details from Firebase Auth
    const users = await Promise.all(
      rolesSnapshot.docs.map(async (doc) => {
        const roleData = doc.data();
        try {
          // Get user details from Auth
          const userRecord = await auth.getUser(doc.id);
          return {
            userId: doc.id,
            role: roleData.role as UserRole,
            updatedAt: roleData.updatedAt,
            email: userRecord.email,
            displayName: userRecord.displayName
          };
        } catch (error) {
          // If user not found in Auth, return basic info
          return {
            userId: doc.id,
            role: roleData.role as UserRole,
            updatedAt: roleData.updatedAt,
            email: null,
            displayName: null
          };
        }
      })
    );

    return users;
  } catch (error: any) {
    console.error('Error listing users with roles:', error);
    throw new Error('Failed to list users with roles');
  }
}

// Enhanced adminDeleteUser function
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

    // Delete user's role document from Firestore
    console.log(`Attempting to delete role document for user ${userId}`);
    const roleRef = doc(db, 'userRoles', userId);

    try {
      await deleteDoc(roleRef);
      console.log(`Successfully deleted role document for user ${userId}`);

      // Delete the user's authentication account
      await auth.deleteUser(userId);
      console.log(`Successfully deleted user authentication for ${userId}`);
    } catch (error: any) {
      console.error('Error deleting user:', error);
      if (error.code === 'permission-denied') {
        throw new Error('Permission denied: Unable to delete user. Please check your Firebase rules.');
      }
      throw error;
    }

    return true;
  } catch (error: any) {
    console.error('Error in admin delete user:', error);
    throw new Error(getErrorMessage(error));
  }
}


// Admin function to delete a user and their data
export async function adminDeleteUserOld(userId: string) {
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

    // Delete only the userRole document from Firestore
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
      throw new Error('Failed to delete user role from Firestore');
    }

    return true;
  } catch (error: any) {
    console.error('Error in admin delete user:', error);
    if (error.code === 'auth/user-token-expired') {
      throw new Error('Your session has expired. Please sign in again.');
    }
    throw new Error(getErrorMessage(error));
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

export async function signUpWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    if (!result?.user) {
      throw new Error('No user data returned from Google sign-in');
    }

    const user = result.user;
    const name = user.displayName || user.email?.split('@')[0] || 'User';

    // Set default role for new users
    await setUserRole(user.uid, 'user');

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

    // Set default role for new users
    await setUserRole(user.uid, 'user');

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
  return auth.signOut();
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