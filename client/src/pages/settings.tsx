import { useRequireAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { updateProfile, User } from "@/lib/firebase";
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

declare module "@/lib/firebase" {
  interface User {
    displayName?: string;
    birthdate?: string;
    location?: string;
    language?: string;
  }
}

export default function Settings() {
  const { user, loading } = useRequireAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [birthdate, setBirthdate] = useState(user?.birthdate || "");
  const [userLocation, setUserLocation] = useState(user?.location || "");
  const [language, setLanguage] = useState(user?.language || "English");

  useEffect(() => {
    // Get user's current location using geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              const city = data.city || 'Unknown city';
              const country = data.country || 'Unknown country';
              setUserLocation(`${city}, ${country}`);
            })
            .catch(() => setUserLocation('Unknown location'));
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocation('Unknown location');
        }
      );
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="mt-4 h-32 w-full" />
      </div>
    );
  }

  const handleUpdateProfile = async () => {
    try {
      const profileData: Partial<User> = {};
      if (newDisplayName !== user?.displayName) profileData.displayName = newDisplayName;
      if (birthdate !== user?.birthdate) profileData.birthdate = birthdate;
      if (userLocation !== user?.location) profileData.location = userLocation;
      if (language !== user?.language) profileData.language = language;

      await updateProfile(user!, profileData);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
      setNewDisplayName("");
      setBirthdate("");
      setLocation("");
      setLanguage("English");
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
      <h1 className="text-3xl font-bold">Settings</h1>

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
                  placeholder={user?.displayName || ""}
                />
                <Button onClick={handleUpdateProfile}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{user?.displayName || "No display name"}</p>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Birthdate</Label>
            <Input
              type="date"
              value={birthdate}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const today = new Date();
                const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 18));
                
                if (selectedDate > minAgeDate) {
                  toast({
                    variant: "destructive",
                    title: "Validation Error",
                    description: "You must be 18 years or older",
                  });
                  return;
                }
                setBirthdate(e.target.value);
              }}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="City, Country" 
            />
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {['English', 'Spanish', 'French', 'German', 'Japanese'].map((lang) => (
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

      <Button onClick={handleUpdateProfile}>Update Profile</Button>
    </div>
  );
}