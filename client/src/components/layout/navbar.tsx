// client/src/components/Navbar.tsx
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { signOut } from "@/lib/firebase";
import { Link } from "wouter";
import { UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { user, role } = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              {t("appTitle")}
            </span>
          </Link>
          <div className="flex gap-6 md:gap-10">
            {user && user.emailVerified && (
              <>
                <Link href="/welcome">{t("menuWelcome")}</Link>
                {role === "admin" && <Link href="/admin">{t("menuAdmin")}</Link>}
                <Link href="/profile">{t("menuProfile")}</Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="gap-2" asChild>
                <Link href="/settings">
                  <UserCircle className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">
                    {user.displayName}
                  </span>
                </Link>
              </Button>
              <Button variant="ghost" onClick={() => signOut()}>
                {t("signOut")}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
