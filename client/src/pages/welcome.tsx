import { useRequireAuth } from "@/lib/auth";
import { VerifyEmail } from "@/components/auth/verify-email";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { deleteAccount } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Welcome() {
  const { user, loading, verified } = useRequireAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted",
      });
      setLocation("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

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

  const displayName = user?.displayName?.split('|')[0] || 'User';

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Welcome, {displayName}!</h1>
      <p className="mt-4 text-muted-foreground">
        You've successfully logged in and verified your email.
      </p>
      <div className="mt-8">
        <Button 
          variant="destructive" 
          onClick={handleDeleteAccount}
          className="w-full max-w-xs"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}