import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, signUpWithGoogle, signUpWithFacebook } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordDialog } from "./reset-password-dialog";
import { SiGoogle, SiFacebook } from "react-icons/si";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signIn(values.email, values.password);
      toast({
        title: "Success",
        description: "You have been logged in",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Error",
        description: error.message || "Failed to log in. Please try again.",
      });
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signUpWithGoogle();
      toast({
        title: "Success",
        description: "You have been logged in with Google",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google Sign-In Error",
        description: error.message,
      });
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signUpWithFacebook();
      toast({
        title: "Success",
        description: "You have been logged in with Facebook",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Facebook Sign-In Error",
        description: error.message,
      });
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm">
              <ResetPasswordDialog />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <SiGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleFacebookSignIn}
              >
                <SiFacebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}