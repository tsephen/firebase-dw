import { useRequireAuth } from "@/lib/auth";
import { VerifyEmail } from "@/components/auth/verify-email";
import { Skeleton } from "@/components/ui/skeleton";

export default function Welcome() {
  const { user, loading, verified } = useRequireAuth();

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="mt-4 h-32 w-full" />
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <VerifyEmail />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Welcome, {user?.displayName}!</h1>
      <p className="mt-4 text-muted-foreground">
        You've successfully logged in and verified your email.
      </p>
    </div>
  );
}
