import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { sendVerificationEmail } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export function VerifyEmail() {
  const { toast } = useToast();
  const [checking, setChecking] = useState(false);

  const handleResend = async () => {
    try {
      await sendVerificationEmail();
      toast({
        title: "Success",
        description: "Verification email sent",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleVerifyAndContinue = async () => {
    setChecking(true);
    try {
      // Reload the user to get the latest email verification status
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        // Force a page reload to update the app state
        window.location.reload();
      } else {
        toast({
          variant: "destructive",
          title: "Not verified",
          description: "Please check your email and verify your address before continuing",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Please check your email for a verification link. Once verified, click the button below to continue.
        </p>
        <div className="space-y-2">
          <Button 
            onClick={handleVerifyAndContinue} 
            className="w-full"
            disabled={checking}
          >
            {checking ? "Checking..." : "Verify and Continue"}
          </Button>
          <Button 
            onClick={handleResend} 
            variant="outline" 
            className="w-full"
            disabled={checking}
          >
            Resend verification email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}