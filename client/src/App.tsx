import { StrictMode } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Welcome from "@/pages/welcome";
import Admin from "@/pages/admin";
import Profile from "@/pages/profile";
import Settings from "@/pages/settings";
import PrivacyPolicy from "@/pages/privacy-policy";
import DataDeletion from "@/pages/data-deletion";
import { useAuth } from "@/lib/auth";
import { VerifyEmail } from "@/components/auth/verify-email";

// Initialize Firebase before rendering the app
import "./lib/firebase";

function Router() {
  const { user, loading, role } = useAuth();

  // These routes are always accessible
  if (window.location.pathname === "/privacy-policy") {
    return <PrivacyPolicy />;
  }
  if (window.location.pathname === "/data-deletion") {
    return <DataDeletion />;
  }

  if (loading) {
    return null;
  }

  if (!user) {
    return <Landing />;
  }

  // Skip email verification for Facebook users
  const isFacebookUser = user.providerData.some(
    provider => provider.providerId === 'facebook.com'
  );

  if (!user.emailVerified && !isFacebookUser) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <VerifyEmail />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/welcome" component={Welcome} />
      {role === 'admin' && <Route path="/admin" component={Admin} />}
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/data-deletion" component={DataDeletion} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Navbar />
          <Router />
        </div>
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  );
}