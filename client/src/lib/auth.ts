import { useEffect, useState } from "react";
import { auth, getUserRole } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}

export function useRequireAuth(redirectTo: string = "/") {
  const { user, loading } = useAuth();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = redirectTo;
    }
    if (user && user.emailVerified) {
      setVerified(true);
    }
  }, [user, loading, redirectTo]);

  return { user, loading, verified };
}

export function useRequireAdmin(redirectTo: string = "/") {
  const { user, loading } = useRequireAuth(redirectTo);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      const role = getUserRole(user.displayName);
      if (role !== 'admin') {
        window.location.href = redirectTo;
      } else {
        setIsAdmin(true);
      }
    }
  }, [user, redirectTo]);

  return { user, loading, isAdmin };
}