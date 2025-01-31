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
  listUsersWithRoles,
  setUserRole,
  type UserRole,
  adminDisableUser,
  adminDeleteUser,
  adminEnableUser
} from "@/lib/firebase";
import { Shield, ShieldOff, Ban, Trash2 } from "lucide-react";
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

type UserWithRole = {
  userId: string;
  role: UserRole;
  updatedAt: string;
  email?: string | null;
  displayName?: string | null;
};

export default function Admin() {
  const { loading } = useRequireAdmin();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadUsers() {
      try {
        const usersWithRoles = await listUsersWithRoles();
        setUsers(usersWithRoles);
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
      await setUserRole(userId, newRole);

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
        description: `User role updated to ${newRole}`
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update user role"
      });
    }
  };

  const handleEnableUser = async (userId: string) => {
    try {
      await adminEnableUser(userId);

      // Update local state to show user as enabled
      setUsers(prevUsers => prevUsers.map(u =>
        u.userId === userId
          ? { ...u, role: 'user', updatedAt: new Date().toISOString() }
          : u
      ));

      toast({
        title: "Success",
        description: "User has been enabled"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to enable user"
      });
    }
  };

  const handleDisableUser = async (userId: string) => {
    try {
      await adminDisableUser(userId);

      // Update local state to show user as disabled
      setUsers(prevUsers => prevUsers.map(u =>
        u.userId === userId
          ? { ...u, role: 'disabled', updatedAt: new Date().toISOString() }
          : u
      ));

      toast({
        title: "Success",
        description: "User has been disabled"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to disable user"
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Delete from both Firestore and Auth
      await adminDeleteUser(userId);
      await adminDeleteUser(userId);

      // Remove user from local state
      setUsers(prevUsers => prevUsers.filter(u => u.userId !== userId));

      toast({
        title: "Success",
        description: "User has been permanently deleted"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete user"
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Manage users and their roles
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.displayName || "N/A"}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {user.userId}
                </TableCell>
                <TableCell>{user.email || "N/A"}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {user.role === 'disabled' ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            <Shield className="h-4 w-4" />
                            Enable User
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Enable User Account</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will restore the user's access to the application.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleEnableUser(user.userId)}
                              className="bg-green-600 text-white hover:bg-green-700"
                            >
                              Enable User
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
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
                        {user.role === "admin" ? (
                          <>
                            <ShieldOff className="mr-2 h-4 w-4" />
                            Remove Admin
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            Make Admin
                          </>
                        )}
                      </Button>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="gap-2"
                          disabled={user.role === 'disabled'}
                        >
                          <Ban className="h-4 w-4" />
                          Disable User
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Disable User Account</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will disable the user account. The user will no longer be able to access the application.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDisableUser(user.userId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Disable
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete User
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Permanently Delete User</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the user account and all associated data. This action cannot be undone.
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