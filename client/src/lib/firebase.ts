import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile, deleteUser, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Verify all required Firebase config values are present
if (!import.meta.env.VITE_FIREBASE_API_KEY || !import.meta.env.VITE_FIREBASE_PROJECT_ID || !import.meta.env.VITE_FIREBASE_APP_ID) {
  throw new Error("Missing required Firebase configuration. Please check your environment variables.");
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage(); // Set auth language to match device

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export type SignUpData = {
  email: string;
  password: string;
  name: string;
  age: number;
};

function getErrorMessage(code: string): string {
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
    case 'auth/popup-closed-by-user':
      return 'Sign in was cancelled. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'Only one sign in window can be open at a time';
    case 'auth/popup-blocked':
      return 'Sign in popup was blocked by your browser. Please allow popups for this site';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled. Please contact support.';
    case 'auth/network-request-failed':
      return 'Network error occurred. Please check your connection.';
    default:
      console.error('Firebase auth error:', code);
      return 'An error occurred. Please try again';
  }
}

export async function signUpWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!user) {
      throw new Error('No user data returned from Google sign-in');
    }

    // Get user's name from Google profile
    const name = user.displayName || user.email?.split('@')[0] || 'User';

    // Update profile with role
    await updateProfile(user, {
      displayName: name,
      photoURL: JSON.stringify({ role: 'user' }) // We don't have age from Google
    });

    return user;
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    throw new Error(getErrorMessage(error.code));
  }
}

export async function signUp({ email, password, name, age }: SignUpData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: JSON.stringify({ age, role: 'user' })
    });
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
}

export async function signIn(email: string, password: string) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
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
    await deleteUser(auth.currentUser);
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
}

export { auth };