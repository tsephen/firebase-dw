// client/src/pages/profile.tsx
import { useRequireAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll
} from "firebase/storage";
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

// A simple Textarea component.
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => (
  <textarea {...props} className={`p-2 border rounded w-full ${className || ""}`} />
);

// Helper: Extract the file name from a download URL.
const extractFileName = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    const decodedPath = decodeURIComponent(parsedUrl.pathname);
    const segments = decodedPath.split('/');
    return segments[segments.length - 1];
  } catch (err) {
    console.error("Error parsing URL:", url, err);
    return "";
  }
};

// Initialize Firestore and Storage.
const firestore = getFirestore();
const storage = getStorage();

export default function Profile() {
  const { user, loading } = useRequireAuth();
  const { toast } = useToast();

  // Profile text fields.
  const [interests, setInterests] = useState("");
  const [bio, setBio] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [gender, setGender] = useState("");

  // The folder location where all photos are stored (saved to Firestore as "url").
  const [folderPath, setFolderPath] = useState<string>("");

  // For display purposes, we keep an array of photo download URLs.
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  // The generated filenames corresponding to each uploaded photo.
  const [photoFileNames, setPhotoFileNames] = useState<string[]>([]);
  // The primary photo filename (a singular value, saved to Firestore as "primaryPhoto").
  const [primaryPhoto, setPrimaryPhoto] = useState<string>("");

  // Temporary state for files selected for upload.
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  // Toggle between view and edit modes.
  const [editing, setEditing] = useState(false);

  // Store the originally fetched profile document.
  const [originalProfile, setOriginalProfile] = useState<any>({});

  // Helper function to refresh the list of photos in the folder.
  const refreshPhotoList = async (folder: string) => {
    const folderRef = ref(storage, folder);
    try {
      const res = await listAll(folderRef);
      const allURLs = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );
      console.log("Refreshed download URLs:", allURLs);
      setPhotoURLs(allURLs);
      const allNames = allURLs.map((url) => extractFileName(url));
      setPhotoFileNames(allNames);
      // If no primary photo is set, default to the first file.
      if (!primaryPhoto && allNames.length > 0) {
        setPrimaryPhoto(allNames[0]);
      }
    } catch (err: any) {
      if (err.code === "storage/object-not-found") {
        console.log("No photos found in folder.");
        setPhotoURLs([]);
        setPhotoFileNames([]);
      } else {
        console.error("Error listing photos:", err);
      }
    }
  };

  // On mount, fetch profile data from Firestore.
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

            // If a folder URL was stored, set it and refresh the photo list.
            if (data.url) {
              setFolderPath(data.url);
              console.log("Fetched folder path from Firestore:", data.url);
              refreshPhotoList(data.url);
              // Set primaryPhoto if already saved.
              if (data.primaryPhoto) {
                setPrimaryPhoto(data.primaryPhoto);
              }
            }
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

  // Validate selected files.
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

  // Handle photo upload.
  // This function uploads files to Storage and then refreshes the local photo list.
  // It does not update Firestore until the Save button is clicked.
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Photo upload triggered.");
    if (e.target.files) {
      const files = Array.from(e.target.files);
      console.log("Selected files:", files);
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

      // Use an existing folderPath if available; otherwise, generate one.
      const folder = folderPath || `users/${user!.uid}/photos/`;
      console.log("Using folder path:", folder);
      setFolderPath(folder);

      // Generate unique filenames.
      const timestamp = Date.now();
      const fileNames = files.map((file) => `${timestamp}-${file.name}`);
      console.log("Generated file names:", fileNames);
      setPhotoFileNames(fileNames);

      // Build full file paths.
      const filePaths = fileNames.map((name) => folder + name);
      console.log("Generated full file paths:", filePaths);

      // Upload each file.
      const uploadPromises = files.map((file, index) => {
        const fullPath = filePaths[index];
        const storageRef = ref(storage, fullPath);
        console.log("Uploading file:", file.name, "to", storageRef.fullPath);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {
              // (Optional) Track upload progress.
            },
            (error) => {
              console.error("Upload error for file", file.name, ":", error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log("File uploaded:", file.name, "Download URL:", downloadURL);
                resolve(downloadURL);
              } catch (err) {
                console.error("Error getting download URL for file", file.name, ":", err);
                reject(err);
              }
            }
          );
        });
      });

      try {
        await Promise.all(uploadPromises);
        // Refresh the entire photo list from Storage (merging existing and new images).
        await refreshPhotoList(folder);
        // If no primary photo is set yet, default to the first uploaded file.
        if (photoFileNames.length === 0 && fileNames.length > 0) {
          setPrimaryPhoto(fileNames[0]);
          console.log("Primary photo set to:", fileNames[0]);
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

  // When the user selects a photo as the main image, update the local primary photo value.
  // Note: This function does not update Firestore; the change will be saved when Save is clicked.
  const handleSelectMain = (fileName: string) => {
    console.log("Selecting main photo with file name:", fileName);
    setPrimaryPhoto(fileName);
  };

  // Save profile data to Firestore.
  // Only the allowed fields are written:
  // - interests, bio, lookingFor, gender,
  // - url (which is folderPath, the folder location),
  // - primaryPhoto (a single filename for the main photo).
  // This function updates Firestore only once (when Save is clicked) and only if changes were made.
  const handleSaveProfile = async () => {
    if (!user?.uid) return;

    // If primaryPhoto is still empty but files were uploaded, default to the first filename.
    const primaryPhotoToSave =
      primaryPhoto || (photoFileNames.length > 0 ? photoFileNames[0] : "");

    try {
      const profileData = {
        interests,
        bio,
        lookingFor,
        gender,
        url: folderPath,               // Folder location for all photos.
        primaryPhoto: primaryPhotoToSave // The singular primary photo filename.
      };
      console.log("Saving profile data to Firestore:", profileData);
      const docRef = doc(firestore, "users", user.uid);
      await setDoc(docRef, profileData);
      console.log("Profile data saved successfully to Firestore.");
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
      setEditing(false);
    } catch (error: any) {
      console.error("Error saving profile to Firestore:", error);
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

      {/* Toggle edit mode */}
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
                        {/* Only render "Select as Main" if this photo is not already the primary */}
                        {photoFileNames[index] !== primaryPhoto && (
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => handleSelectMain(photoFileNames[index])}
                            className="absolute bottom-1 right-1"
                          >
                            Select as Main
                          </Button>
                        )}
                        {photoFileNames[index] === primaryPhoto && (
                          <div className="absolute top-1 right-1 bg-primary text-white px-1 text-xs rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No photos uploaded</p>
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
                        {photoFileNames[index] === primaryPhoto && (
                          <div className="absolute top-1 right-1 bg-primary text-white px-1 text-xs rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No photos uploaded</p>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
