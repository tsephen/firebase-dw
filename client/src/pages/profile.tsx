import { useRequireAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { updateProfile, updatePassword } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const { user, loading } = useRequireAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="mt-4 h-32 w-full" />
      </div>
    );
  }

  const displayName = user?.displayName?.split('|')[0] || 'User';
  const role = user?.displayName?.match(/\|role:(\w+)/)?.[1] || 'user';
  const isFacebookUser = user?.providerData.some(
    provider => provider.providerId === 'facebook.com'
  );

  const handleUpdateProfile = async () => {
    try {
      if (newDisplayName) {
        const roleAndAge = user?.displayName?.match(/\|.+$/)?.[0] || '';
        await updateProfile(user!, {
          displayName: newDisplayName + roleAndAge
        });
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        setIsEditing(false);
        setNewDisplayName("");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in both current and new password fields",
      });
      return;
    }

    try {
      await updatePassword(user!, currentPassword, newPassword);
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>

          <div className="space-y-2">
            <Label>Display Name</Label>
            {isEditing ? (
              <div className="flex gap-2">
                <Input 
                  value={newDisplayName} 
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  placeholder={displayName}
                />
                <Button onClick={handleUpdateProfile}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{displayName}</p>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <p className="text-sm text-muted-foreground capitalize">{role}</p>
          </div>

          <div className="space-y-2">
            <Label>Email Status</Label>
            <p className="text-sm text-muted-foreground">
              {isFacebookUser 
                ? "Verified by Facebook" 
                : user?.emailVerified 
                  ? "Verified" 
                  : "Not verified"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input 
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleUpdatePassword}>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}