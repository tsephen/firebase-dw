import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { signOut } from "@/lib/firebase";
import { Link } from "wouter";

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Auth Demo
            </span>
          </Link>
          <div className="flex gap-6 md:gap-10">
            {user && user.emailVerified && (
              <>
                <Link href="/welcome">Welcome</Link>
                {user.customClaims?.admin && (
                  <Link href="/admin">Admin</Link>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user.displayName}
              </span>
              <Button
                variant="ghost"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
