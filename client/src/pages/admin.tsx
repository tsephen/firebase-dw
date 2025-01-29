import { useRequireAdmin } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Admin() {
  const { user, loading } = useRequireAdmin();

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="mt-4 h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 text-muted-foreground">
        Welcome to the admin area, {user?.displayName}
      </p>
    </div>
  );
}
