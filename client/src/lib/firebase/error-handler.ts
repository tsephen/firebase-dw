export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  
  const err = error as any;
  if (!err?.code) return 'An unknown error occurred';

  switch (err.code) {
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
      return 'An account already exists with the same email address but different sign-in credentials';
    default:
      console.error('Firebase error:', err);
      return err.message || 'An error occurred. Please try again';
  }
}