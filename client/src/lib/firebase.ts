import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile as firebaseUpdateProfile, deleteUser, sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, User, updatePassword as firebaseUpdatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

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

// Role management functions
export async function setUserRole(userId: string, role: 'user' | 'admin') {
  try {
    await setDoc(doc(db, 'userRoles', userId), {
      role,
      updatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error setting user role:', error);
    throw new Error('Failed to set user role');
  }
}

export async function getUserRole(userId: string): Promise<string> {
  try {
    const roleDoc = await getDoc(doc(db, 'userRoles', userId));
    return roleDoc.exists() ? roleDoc.data().role : 'user';
  } catch (error: any) {
    console.error('Error getting user role:', error);
    return 'user'; // Default to user role if there's an error
  }
}

// Clean up user data when account is deleted
async function cleanupUserData(userId: string) {
  try {
    await deleteDoc(doc(db, 'userRoles', userId));
  } catch (error) {
    console.error('Error cleaning up user data:', error);
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

export async function deleteAccount() {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    await deleteUser(auth.currentUser);
    await cleanupUserData(userId);
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