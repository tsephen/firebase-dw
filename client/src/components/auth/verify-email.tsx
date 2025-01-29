import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { sendVerificationEmail } from "@/lib/firebase";

export function VerifyEmail() {
  const { toast } = useToast();

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

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Please check your email for a verification link. Once verified, you can access the app.
        </p>
        <Button onClick={handleResend} className="w-full">
          Resend verification email
        </Button>
      </CardContent>
    </Card>
  );
}
