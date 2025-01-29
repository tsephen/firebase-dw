import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Welcome from "@/pages/welcome";
import Admin from "@/pages/admin";

// Initialize Firebase before rendering the app
import "./lib/firebase";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <Router />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;