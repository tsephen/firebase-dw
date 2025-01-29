import { useRequireAdmin } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  auth,
  listUsersWithRoles,
  setUserRole,
  type UserRole,
  deleteAccount
} from "@/lib/firebase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

type UserWithRole = {
  userId: string;
  role: UserRole;
  updatedAt: string;
  email?: string | null;
  displayName?: string | null;
};

export default function Admin() {
  const { user, loading } = useRequireAdmin();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadUsers() {
      try {
        const usersWithRoles = await listUsersWithRoles();

        // Enhance user data with Firebase Auth user info
        const enhancedUsers = usersWithRoles.map(userRole => ({
          ...userRole,
          email: auth.currentUser?.email,
          displayName: auth.currentUser?.displayName
        }));

        setUsers(enhancedUsers);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to load users"
        });
      } finally {
        setLoadingUsers(false);
      }
    }

    if (!loading) {
      loadUsers();
    }
  }, [loading, toast]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await setUserRole(userId, newRole, user?.uid);

      // Update local state
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.userId === userId
            ? { ...u, role: newRole, updatedAt: new Date().toISOString() }
            : u
        )
      );

      toast({
        title: "Success",
        description: "User role updated successfully"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update user role"
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteAccount(userId); // Assuming deleteAccount now accepts userId

      // Update local state to remove the deleted user
      setUsers(prevUsers => prevUsers.filter(u => u.userId !== userId));

      toast({
        title: "Success",
        description: "User account and related data deleted successfully"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete user account"
      });
    }
  };

  if (loading || loadingUsers) {
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
      <p className="mt-4 text-muted-foreground mb-6">
        Welcome to the admin area, {user?.displayName}
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.displayName || "N/A"}</TableCell>
                <TableCell>{user.email || "N/A"}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleRoleChange(
                          user.userId,
                          user.role === "admin" ? "user" : "admin"
                        )
                      }
                    >
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User Account</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            user account and all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteUser(user.userId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}