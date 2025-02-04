import { useRequireAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
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
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { updatePassword } from "@/lib/firebase";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => (
  <textarea {...props} className={`p-2 border rounded w-full ${className || ""}`} />
);

const extractFileName = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    const decodedPath = decodeURIComponent(parsedUrl.pathname);
    const segments = decodedPath.split("/");
    return segments[segments.length - 1];
  } catch (err) {
    console.error("Error parsing URL:", url, err);
    return "";
  }
};

const firestore = getFirestore();
const storage = getStorage();

export default function Profile() {
  const { t } = useTranslation();
  const { user, loading } = useRequireAuth();
  const { toast } = useToast();

  // Profile fields.
  const [interests, setInterests] = useState("");
  const [bio, setBio] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [gender, setGender] = useState("");

  // Folder path (stored in Firestore as "url").
  const [folderPath, setFolderPath] = useState<string>("");

  // Photo state.
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const [photoFileNames, setPhotoFileNames] = useState<string[]>([]);
  const [primaryPhoto, setPrimaryPhoto] = useState<string>("");

  // Files for upload.
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  // Edit toggle.
  const [editing, setEditing] = useState(false);

  // Password state.
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [originalProfile, setOriginalProfile] = useState<any>({});

  const refreshPhotoList = async (folder: string) => {
    const folderRef = ref(storage, folder);
    try {
      const res = await listAll(folderRef);
      const allURLs = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );
      setPhotoURLs(allURLs);
      const allNames = allURLs.map((url) => extractFileName(url));
      setPhotoFileNames(allNames);
      if (!primaryPhoto && allNames.length > 0) {
        setPrimaryPhoto(allNames[0]);
      }
    } catch (err: any) {
      if (err.code === "storage/object-not-found") {
        setPhotoURLs([]);
        setPhotoFileNames([]);
      } else {
        console.error("Error listing photos:", err);
      }
    }
  };

  useEffect(() => {
    if (user?.uid) {
      const docRef = doc(firestore, "users", user.uid);
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setOriginalProfile(data);
            setInterests(data.interests || "");
            setBio(data.bio || "");
            setLookingFor(data.lookingFor || "");
            setGender(data.gender || "");
            if (data.url) {
              setFolderPath(data.url);
              refreshPhotoList(data.url);
              if (data.primaryPhoto) {
                setPrimaryPhoto(data.primaryPhoto);
              }
            }
          } else {
            console.log("No profile document found; using defaults.");
          }
        },
        (error) => {
          console.error("Failed to subscribe to profile:", error);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  const validateFiles = (files: File[]): string | null => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024;
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return t("onlyJpegPngAllowed");
      }
      if (file.size > maxSize) {
        return t("eachFileLessThan2MB");
      }
    }
    return null;
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        toast({
          title: t("error"),
          description: t("uploadLimitError"),
        });
        return;
      }
      const validationError = validateFiles(files);
      if (validationError) {
        toast({
          variant: "destructive",
          title: t("error"),
          description: validationError,
        });
        return;
      }
      setUploadFiles(files);
      const folder = folderPath || `users/${user!.uid}/photos/`;
      setFolderPath(folder);
      const timestamp = Date.now();
      const fileNames = files.map((file) => `${timestamp}-${file.name}`);
      setPhotoFileNames(fileNames);
      const filePaths = fileNames.map((name) => folder + name);
      const uploadPromises = files.map((file, index) => {
        const fullPath = filePaths[index];
        const storageRef = ref(storage, fullPath);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
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
        await Promise.all(uploadPromises);
        await refreshPhotoList(folder);
        if (photoFileNames.length === 0 && fileNames.length > 0) {
          setPrimaryPhoto(fileNames[0]);
        }
        toast({
          title: t("photosUploaded"),
          description: t("photosUploadedSuccess"),
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: t("uploadError"),
          description: t("failedToUploadPhotos"),
        });
      }
    }
  };

  const handleSelectMain = (fileName: string) => {
    setPrimaryPhoto(fileName);
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("pleaseFillBothPasswordFields"),
      });
      return;
    }
    try {
      await updatePassword(user!, currentPassword, newPassword);
      toast({
        title: t("success"),
        description: t("passwordUpdatedSuccessfully"),
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message,
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.uid) return;
    const primaryPhotoToSave =
      primaryPhoto || (photoFileNames.length > 0 ? photoFileNames[0] : "");
    try {
      const profileData = {
        interests,
        bio,
        lookingFor,
        gender,
        url: folderPath,
        primaryPhoto: primaryPhotoToSave,
      };
      const docRef = doc(firestore, "users", user.uid);
      // Use merge:true so that only these fields are updated
      await setDoc(docRef, profileData, { merge: true });
      toast({
        title: t("success"),
        description: t("profileUpdatedSuccessfully"),
      });
      setEditing(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message,
      });
    }
  };  

  if (loading) return <div className="container py-8">Loading...</div>;

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">{t("profileSettings")}</h1>
      <div className="flex justify-end">
        {editing ? (
          <Button variant="ghost" onClick={handleSaveProfile}>
            {t("save")}
          </Button>
        ) : (
          <Button variant="ghost" onClick={() => setEditing(true)}>
            <Edit className="h-4 w-4" />
            {t("editProfile")}
          </Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("personalInformation")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("interests")}</Label>
            {editing ? (
              <Input
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder={t("interestsPlaceholder")}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {interests || t("notProvided")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("bio")}</Label>
            {editing ? (
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={t("bioPlaceholder")}
                rows={4}
              />
            ) : (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {bio || t("notProvided")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("lookingFor")}</Label>
            {editing ? (
              <Input
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                placeholder={t("lookingForPlaceholder")}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {lookingFor || t("notProvided")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("gender")}</Label>
            {editing ? (
              <Select value={gender} onValueChange={(val) => setGender(val)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectGender")} />
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
                {gender || t("notProvided")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("photos")} ({t("upTo5")})</Label>
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
                          alt={`${t("photo")} ${index + 1}`}
                          className="object-cover w-full h-32 rounded border"
                        />
                        {photoFileNames[index] !== primaryPhoto && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSelectMain(photoFileNames[index])}
                            className="absolute bottom-1 right-1"
                          >
                            {t("selectAsMain")}
                          </Button>
                        )}
                        {photoFileNames[index] === primaryPhoto && (
                          <div className="absolute top-1 right-1 bg-primary text-white px-1 text-xs rounded">
                            {t("main")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("noPhotosUploaded")}
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
                          alt={`${t("photo")} ${index + 1}`}
                          className="object-cover w-full h-32 rounded border"
                        />
                        {photoFileNames[index] === primaryPhoto && (
                          <div className="absolute top-1 right-1 bg-primary text-white px-1 text-xs rounded">
                            {t("main")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("noPhotosUploaded")}
                  </p>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t("changePassword")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("currentPassword")}</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("newPassword")}</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleUpdatePassword}>{t("updatePassword")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
