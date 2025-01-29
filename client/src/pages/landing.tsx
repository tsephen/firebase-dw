import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";

export default function Landing() {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Auth Demo</h1>
        <Tabs defaultValue="login" className="w-[350px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
