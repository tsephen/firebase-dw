// client/src/pages/profile.tsx
import { useRequireAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Edit } from "lucide-react";
import React from "react";

// Define a proper Textarea component.
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => (
  <textarea {...props} className={`p-2 border rounded w-full ${className || ""}`} />
);

// Get Firestore and Storage instances.
const firestore = getFirestore();
const storage = getStorage();

export default function Profile() {
  const { user, loading } = useRequireAuth();
  const { toast } = useToast();

  // State for profile fields.
  const [interests, setInterests] = useState("");
  const [bio, setBio] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [gender, setGender] = useState("");
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const [primaryPhoto, setPrimaryPhoto] = useState<number | null>(null);
  // Temporary state for files selected for upload.
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  // State for toggling between view and edit modes.
  const [editing, setEditing] = useState(false);
  // Store the originally fetched profile so we can compare changes.
  const [originalProfile, setOriginalProfile] = useState<any>({});

  // On mount, fetch existing profile data from Firestore.
  useEffect(() => {
    if (user?.uid) {
      const docRef = doc(firestore, "users", user.uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setOriginalProfile(data);
            setInterests(data.interests || "");
            setBio(data.bio || "");
            setLookingFor(data.lookingFor || "");
            setGender(data.gender || "");
            setPhotoURLs(data.photos || []);
            setPrimaryPhoto(data.primaryPhoto ?? null);
            console.log("Fetched profile data:", data);
          } else {
            console.log("No profile document found; using defaults.");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
        });
    }
  }, [user]);

  // Validate file type and size.
  const validateFiles = (files: File[]): string | null => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return "Only JPEG and PNG files are allowed.";
      }
      if (file.size > maxSize) {
        return "Each file must be less than 2MB.";
      }
    }
    return null;
  };

  // Handle photo file selection and upload using Promise.all.
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        toast({
          title: "Error",
          description: "You can upload up to 5 photos only.",
        });
        return;
      }
      const validationError = validateFiles(files);
      if (validationError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: validationError,
        });
        return;
      }
      setUploadFiles(files);
      const uploadPromises = files.map((file) => {
        const storageRef = ref(
          storage,
          `users/${user!.uid}/photos/${Date.now()}-${file.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Optional: update progress if desired.
            },
            (error) => {
              console.error("Upload error:", error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
              } catch (err) {
                reject(err);
              }
            }
          );
        });
      });
      try {
        const uploadedURLs = await Promise.all(uploadPromises);
        console.log("Uploaded photo URLs:", uploadedURLs);
        setPhotoURLs(uploadedURLs);
        if (uploadedURLs.length > 0) {
          setPrimaryPhoto(0); // Set the first image as primary.
        }
        toast({
          title: "Photos Uploaded",
          description: "Photos have been uploaded successfully.",
        });
      } catch (err) {
        console.error("Error uploading photos:", err);
        toast({
          variant: "destructive",
          title: "Upload Error",
          description: "Failed to upload one or more photos.",
        });
      }
    }
  };

  // Save the profile data to Firestore—only update fields that have changed.
  const handleSaveProfile = async () => {
    if (!user?.uid) return;
    try {
      const profileData: any = {};
      if (interests !== originalProfile.interests) profileData.interests = interests;
      if (bio !== originalProfile.bio) profileData.bio = bio;
      if (lookingFor !== originalProfile.lookingFor) profileData.lookingFor = lookingFor;
      if (gender !== originalProfile.gender) profileData.gender = gender;
      // Only update photos if the array is non-empty.
      if (photoURLs.length > 0 && JSON.stringify(photoURLs) !== JSON.stringify(originalProfile.photos)) {
        profileData.photos = photoURLs;
        profileData.primaryPhoto = primaryPhoto !== null ? primaryPhoto : 0;
      }
      console.log("Saving profile data:", profileData);
      const docRef = doc(firestore, "users", user.uid);
      await setDoc(docRef, profileData, { merge: true });
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
      setEditing(false);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  if (loading) return <div className="container py-8">Loading...</div>;

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* Toggle between view and edit modes */}
      <div className="flex justify-end">
        {editing ? (
          <Button variant="ghost" onClick={handleSaveProfile}>
            Save
          </Button>
        ) : (
          <Button variant="ghost" onClick={() => setEditing(true)}>
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Interests */}
          <div>
            <Label>Interests</Label>
            {editing ? (
              <Input
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="E.g., hiking, cooking, movies"
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {interests || "Not provided"}
              </p>
            )}
          </div>
          {/* Bio */}
          <div>
            <Label>Bio</Label>
            {editing ? (
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                rows={4}
              />
            ) : (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {bio || "Not provided"}
              </p>
            )}
          </div>
          {/* Looking For */}
          <div>
            <Label>Looking For</Label>
            {editing ? (
              <Input
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                placeholder="E.g., friendship, long-term relationship"
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {lookingFor || "Not provided"}
              </p>
            )}
          </div>
          {/* Gender */}
          <div>
            <Label>Gender</Label>
            {editing ? (
              <Select value={gender} onValueChange={(val) => setGender(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="nonbinary">Non-binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-muted-foreground">
                {gender || "Not provided"}
              </p>
            )}
          </div>
          {/* Photos */}
          <div>
            <Label>Photos (up to 5)</Label>
            {editing ? (
              <>
                <Input
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  onChange={handlePhotoUpload}
                />
                {photoURLs.length > 0 ? (
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photoURLs.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Photo ${index + 1}`}
                          className="object-cover w-full h-32 rounded border"
                        />
                        <div className="absolute top-1 right-1">
                          <input
                            type="radio"
                            checked={primaryPhoto === index}
                            onChange={() => setPrimaryPhoto(index)}
                            title="Set as primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No photos uploaded
                  </p>
                )}
              </>
            ) : (
              <>
                {photoURLs.length > 0 ? (
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photoURLs.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Photo ${index + 1}`}
                          className="object-cover w-full h-32 rounded border"
                        />
                        {primaryPhoto === index && (
                          <div className="absolute top-1 right-1 bg-primary text-white px-1 text-xs rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No photos uploaded
                  </p>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
