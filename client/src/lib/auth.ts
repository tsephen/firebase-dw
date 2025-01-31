import { useEffect, useState } from "react";
import { auth, getUserRole } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// Synchronous auth state check from localStorage
function getStoredAuthState() {
  try {
    const stored = localStorage.getItem('firebaseAuth');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const storedAuth = getStoredAuthState();
    return storedAuth ? { ...storedAuth.user, stsTokenManager: storedAuth.stsTokenManager } : null;
  });
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>(() => {
    const storedAuth = getStoredAuthState();
    return storedAuth?.role || 'user';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch user role from Firestore
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
      }
      setLoading(false);
    });

    // Update localStorage after auth state resolves
    const updateStorage = async () => {
      if (user) {
        const userRole = await getUserRole(user.uid);
        localStorage.setItem('firebaseAuth', JSON.stringify({
          user: {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            providerData: user.providerData
          },
          stsTokenManager: (user as any).stsTokenManager,
          role: userRole
        }));
      } else {
        localStorage.removeItem('firebaseAuth');
      }
    };

    updateStorage();

    return () => unsubscribe();
  }, []);

  return { user, loading, role };
}

export function useRequireAuth(redirectTo: string = "/") {
  const { user, loading, role } = useAuth();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = redirectTo;
    }

    // Consider user verified if:
    // 1. Their email is verified OR
    // 2. They signed in with Facebook
    if (user && (user.emailVerified || user.providerData.some(provider => provider.providerId === 'facebook.com'))) {
      setVerified(true);
    }
  }, [user, loading, redirectTo]);

  return { user, loading, verified, role };
}

export function useRequireAdmin(redirectTo: string = "/") {
  const { user, loading, role } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || role !== 'admin') {
        window.location.href = redirectTo;
      } else {
        setIsAdmin(true);
      }
    }
  }, [user, role, loading, redirectTo]);

  return { user, loading, isAdmin };
}