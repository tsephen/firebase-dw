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
  adminEnableUser,
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
import { useTranslation } from "react-i18next";

type UserWithRole = {
  userId: string;
  role: UserRole;
  updatedAt: string;
  email?: string | null;
  displayName?: string | null;
};

export default function Admin() {
  const { t } = useTranslation();
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
          title: t("error"),
          description: error.message || t("failedToLoadUsers"),
        });
      } finally {
        setLoadingUsers(false);
      }
    }

    if (!loading) {
      loadUsers();
    }
  }, [loading, toast, t]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await setUserRole(userId, newRole);
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.userId === userId
            ? { ...u, role: newRole, updatedAt: new Date().toISOString() }
            : u
        )
      );
      toast({
        title: t("success"),
        description: t("userRoleUpdated", { role: newRole }),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message || t("failedToUpdateUserRole"),
      });
    }
  };

  const handleEnableUser = async (userId: string) => {
    try {
      await adminEnableUser(userId);
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.userId === userId
            ? { ...u, role: "user", updatedAt: new Date().toISOString() }
            : u
        )
      );
      toast({
        title: t("success"),
        description: t("userEnabled"),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message || t("failedToEnableUser"),
      });
    }
  };

  const handleDisableUser = async (userId: string) => {
    try {
      await adminDisableUser(userId);
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.userId === userId
            ? { ...u, role: "disabled", updatedAt: new Date().toISOString() }
            : u
        )
      );
      toast({
        title: t("success"),
        description: t("userDisabled"),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message || t("failedToDisableUser"),
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await adminDeleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(u => u.userId !== userId));
      toast({
        title: t("success"),
        description: t("userDeleted"),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message || t("failedToDeleteUser"),
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
          <h1 className="text-3xl font-bold">{t("adminDashboard")}</h1>
          <p className="mt-2 text-muted-foreground">{t("manageUsers")}</p>
        </div>
      </div>

      <div className="mt-8 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("user")}</TableHead>
              <TableHead>{t("userId")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("role")}</TableHead>
              <TableHead>{t("lastUpdated")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.displayName || t("nA")}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {user.userId}
                </TableCell>
                <TableCell>{user.email || t("nA")}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {user.role === "disabled" ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Shield className="h-4 w-4" />
                            {t("enableUser")}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {t("enableUserAccountTitle")}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {t("enableUserAccountDescription")}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleEnableUser(user.userId)}
                              className="bg-green-600 text-white hover:bg-green-700"
                            >
                              {t("enableUserAction")}
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
                            {t("removeAdmin")}
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            {t("makeAdmin")}
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
                          disabled={user.role === "disabled"}
                        >
                          <Ban className="h-4 w-4" />
                          {t("disableUser")}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t("disableUserAccountTitle")}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("disableUserAccountDescription")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDisableUser(user.userId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {t("disable")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="gap-2">
                          <Trash2 className="h-4 w-4" />
                          {t("deleteUser")}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t("permanentlyDeleteUserTitle")}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("permanentlyDeleteUserDescription")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteUser(user.userId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {t("delete")}
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
