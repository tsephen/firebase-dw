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
import { getErrorMessage } from "./error-handler";
import { app } from "./firestore";

export const auth = getAuth(app);
auth.useDeviceLanguage();

// Set up auth state persistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

// Configure Auth Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Authentication functions
export async function signUpWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return handleAuthResult(result.user);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function signUpWithFacebook() {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return handleAuthResult(result.user);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

async function handleAuthResult(user: User) {
  const name = user.displayName || user.email?.split('@')[0] || 'User';
  await firebaseUpdateProfile(user, { displayName: name });
  return user;
}