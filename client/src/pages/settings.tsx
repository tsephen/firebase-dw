// client/src/pages/settings.tsx
import { useRequireAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { getFirestore, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "@/lib/firebase";
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
import { useTranslation } from "react-i18next";
import i18nInstance from "@/i18n"; // Our initialized i18n instance

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

const firestore = getFirestore();

declare module "@/lib/firebase" {
  interface User {
    displayName?: string;
    birthdate?: string;
    location?: string;
    language?: string;
  }
}

type ExtendedUser = {
  uid: string;
  email?: string;
  displayName?: string;
  birthdate?: string;
  location?: string;
  language?: string;
} & Record<string, any>;

// Mapping: user sees full names but we store the short code.
const languageMapping: { [key: string]: string } = {
  English: "en",
  Spanish: "es",
  en: "en",
  es: "es",
};

// Options for the language select.
const languageOptions = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function Settings() {
  const { t } = useTranslation();
  const { user, loading } = useRequireAuth();
  const { toast } = useToast();

  // Local state for personal info.
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [location, setLocation] = useState("");
  // Store language as a short code; default to "en"
  const [language, setLanguage] = useState("en");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const extendedUser = user as ExtendedUser | null;

  useEffect(() => {
    if (extendedUser?.uid) {
      const docRef = doc(firestore, "users", extendedUser.uid);
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (!isEditing) {
              setDisplayName(data.displayName ?? "");
              setBirthdate(data.birthdate ?? "");
              // Only update location if Firestore has a valid value
              if (data.location && data.location.trim() !== t("unknownLocation")) {
                setLocation(data.location);
              }
              // If location is not set, fetch and update only the location field
              if ((!data.location || data.location.trim() === "") && navigator.geolocation) {
                fetchLocation();
                (async () => {
                  const locationUpdate = { location };
                  const docRef = doc(firestore, "users", extendedUser.uid);
                  try {
                    await updateDoc(docRef, locationUpdate);
                  } catch (error) {
                    console.error("Error updating location in Firestore:", error);
                  }
                })();
              }
              setLanguage(languageMapping[data.language ?? "en"] || "en");
            }
          } else {
            if (!isEditing) {
              setDisplayName(extendedUser.displayName ?? "");
              setBirthdate(extendedUser.birthdate ?? "");
              setLocation(extendedUser.location ?? "");
              setLanguage(languageMapping[extendedUser.language ?? "en"] || "en");
            }
          }
          if (!isLoaded) setIsLoaded(true);
        },
        (error) => {
          console.error("Failed to subscribe to user profile:", error);
        }
      );
      return () => unsubscribe();
    }
  }, [extendedUser, isEditing, isLoaded, t, location]);  

  // When language changes, update local storage and i18next.
  useEffect(() => {
    localStorage.setItem("lang", language);
    i18nInstance.changeLanguage(language);
  }, [language]);

  // Fetch location using the browser's geolocation API.
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const localityLang = language === "es" ? "es" : "en";
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=${localityLang}`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.city || t("unknownCity") || "Unknown city";
              const country =
                data.country || data.countryName || t("unknownCountry") || "Unknown country";
              setLocation(`${city}, ${country}`);
            })
            .catch(() => setLocation(t("unknownLocation")));
        },
        (error) => {
          console.error("Geolocation error:", error);
          if (error.code === error.PERMISSION_DENIED) {
            toast({
              variant: "destructive",
              title: t("error"),
              description: t("enableLocationPermission"),
            });
          }
          setLocation(t("unknownLocation"));
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("geolocationNotSupported"),
      });
      setLocation(t("unknownLocation"));
    }
  };

  // When saving, include location only if it's valid.
  const handleUpdateProfile = async () => {
    if (birthdateError) return;
    if (!extendedUser?.uid) return;
    try {
      const profileData: any = {
        displayName,
        birthdate,
        language,
      };
      if (location && location.trim() !== "" && location !== t("unknownLocation")) {
        profileData.location = location;
      }
      const docRef = doc(firestore, "users", extendedUser.uid);
      await setDoc(docRef, profileData, { merge: true });
      toast({
        title: t("save"),
        description: t("profileUpdatedSuccessfully"),
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message,
      });
    }
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

  if (loading || !isLoaded) {
    return (
      <div className="container py-8">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="mt-4 h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">{t("profileSettings")}</h1>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{t("personalInformation")}</CardTitle>
          {isEditing ? (
            <div className="flex gap-2">
              <Button onClick={handleUpdateProfile}>{t("save")}</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                {t("cancel")}
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              {t("edit")}
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("email")}</Label>
            <p className="text-sm text-muted-foreground">{extendedUser?.email}</p>
          </div>
          <div className="space-y-2">
            <Label>{t("displayName")}</Label>
            {isEditing ? (
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t("displayName")}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {displayName || t("notSet")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("birthdate")}</Label>
            {isEditing ? (
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
                    setBirthdateError(t("youMustBe18OrOlder"));
                  } else {
                    setBirthdateError("");
                  }
                  setBirthdate(inputValue);
                }}
                max={new Date().toISOString().split("T")[0]}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {birthdate ? new Date(birthdate).toLocaleDateString() : t("notSet")}
              </p>
            )}
            {birthdateError && (
              <p className="text-sm text-red-500">{birthdateError}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("location")}</Label>
            {isEditing ? (
              <div className="flex items-center">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t("enterLocation")}
                />
                <RefreshIcon onClick={fetchLocation} />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {location || t("notSet")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("language")}</Label>
            {isEditing ? (
              <Select value={language} onValueChange={(val) => setLanguage(val)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {languageOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "English" : language === "es" ? "Español" : language}
              </p>
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
