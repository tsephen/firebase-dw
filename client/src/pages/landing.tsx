import { useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [_, navigate] = useLocation();

  useEffect(() => {
    if (user?.emailVerified) {
      navigate("/welcome");
    }
  }, [user, navigate]);

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold">{t("welcomeMessage")}</h1>
        <Tabs defaultValue="login" className="w-[350px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t("login")}</TabsTrigger>
            <TabsTrigger value="signup">{t("signup")}</TabsTrigger>
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
