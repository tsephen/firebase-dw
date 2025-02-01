// client/src/pages/settings.tsx
import { useRequireAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile, updatePassword, User } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// A simple refresh icon component; you can replace this with an icon from your library.
const RefreshIcon = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    title="Refresh location"
    className="ml-2 text-muted-foreground hover:text-primary"
    style={{ fontSize: "1.2rem" }}
  >
    &#x21bb;
  </button>
);

// Get Firestore instance.
const firestore = getFirestore();

// Module augmentation for extended profile properties.
declare module "@/lib/firebase" {
  interface User {
    displayName?: string;
    birthdate?: string;
    location?: string;
    language?: string;
  }
}

// Extended type alias for our user (ensuring uid is present)
type ExtendedUser = {
  uid: string;
  email?: string;
  displayName?: string;
  birthdate?: string;
  location?: string;
  language?: string;
} & Record<string, any>;

export default function Settings() {
  const { user, loading } = useRequireAuth();
  const { toast } = useToast();

  // Profile state.
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [language, setLanguage] = useState("English");

  // Password state.
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Cast user to our extended type.
  const extendedUser = user as ExtendedUser | null;

  // On mount, fetch profile data from Firestore.
  useEffect(() => {
    if (extendedUser?.uid) {
      const docRef = doc(firestore, "users", extendedUser.uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setNewDisplayName(data.displayName || extendedUser.displayName || "");
            setBirthdate(data.birthdate || extendedUser.birthdate || "");
            setUserLocation(data.location || extendedUser.location || "");
            setLanguage(data.language || extendedUser.language || "English");
          } else {
            // No document exists yet, so use values from the auth user.
            setNewDisplayName(extendedUser.displayName || "");
            setBirthdate(extendedUser.birthdate || "");
            setUserLocation(extendedUser.location || "");
            setLanguage(extendedUser.language || "English");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user profile:", error);
        });
    }
  }, [extendedUser]);

  // Auto-populate location only if no record exists.
  useEffect(() => {
    if (!extendedUser?.location && !userLocation && navigator.geolocation) {
      fetchLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extendedUser, userLocation]);

  // Function to fetch location via geolocation and reverse-geocode API.
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.city || "Unknown city";
              const country = data.country || data.countryName || "Unknown country";
              setUserLocation(`${city}, ${country}`);
            })
            .catch(() => setUserLocation("Unknown location"));
        },
        (error) => {
          console.error("Geolocation error:", error);
          setUserLocation("Unknown location");
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="mt-4 h-32 w-full" />
      </div>
    );
  }

  // Handle profile update (display name, birthdate, location, language).
  const handleUpdateProfile = async () => {
    if (birthdateError) return;
    if (!extendedUser?.uid) return;

    try {
      const profileData = {
        displayName: newDisplayName,
        birthdate,
        location: userLocation,
        language,
      };

      const docRef = doc(firestore, "users", extendedUser.uid);
      await setDoc(docRef, profileData, { merge: true });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  // Handle password update.
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

      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email Display */}
          <div className="space-y-2">
            <Label>Email</Label>
            <p className="text-sm text-muted-foreground">{extendedUser?.email}</p>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <Label>Display Name</Label>
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  placeholder={extendedUser?.displayName || ""}
                />
                <Button onClick={handleUpdateProfile}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {extendedUser?.displayName || "No display name"}
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </div>
            )}
          </div>

          {/* Birthdate */}
          <div className="space-y-2">
            <Label>Birthdate</Label>
            <Input
              type="date"
              value={birthdate}
              onChange={(e) => {
                const inputValue = e.target.value;
                const selectedDate = new Date(inputValue);
                const today = new Date();
                const minAgeDate = new Date(
                  today.getFullYear() - 18,
                  today.getMonth(),
                  today.getDate()
                );
                if (selectedDate > minAgeDate) {
                  setBirthdateError("You must be 18 years or older");
                } else {
                  setBirthdateError("");
                }
                setBirthdate(inputValue);
              }}
              max={new Date().toISOString().split("T")[0]}
            />
            {birthdateError && <p className="text-sm text-red-500">{birthdateError}</p>}
          </div>

          {/* Location with Refresh Icon */}
          <div className="space-y-2 flex items-center">
            <Label>Location</Label>
            <div className="flex items-center">
              <Input
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                placeholder="City, Country"
              />
              <RefreshIcon onClick={fetchLocation} />
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["English", "Spanish", "French", "German", "Japanese"].map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Card */}
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
