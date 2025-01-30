import { useEffect, useState } from "react";
import { auth, getUserRole } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>('user');

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
  const { user, loading, role } = useRequireAuth(redirectTo);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || role !== 'admin') {
        window.location.href = redirectTo;
      } else if (role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, [user, role, loading, redirectTo]);

  return { user, loading, isAdmin };
}