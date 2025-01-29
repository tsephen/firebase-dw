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
import { useAuth } from "@/lib/auth";
import { VerifyEmail } from "@/components/auth/verify-email";

// Initialize Firebase before rendering the app
import "./lib/firebase";

function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Landing />;
  }

  if (!user.emailVerified) {
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
      <Route path="/admin" component={Admin} />
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