import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export default function DataDeletion() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("requestReceived"),
      description: t("dataDeletionRequestDescription"),
    });
    setEmail("");
  };

  return (
    <div className="container py-8">
      <Card>
        <CardContent className="prose dark:prose-invert">
          <h2>{t("howToDeleteYourData")}</h2>
          <h3>{t("option1")}</h3>
          <p>{t("option1Description")}</p>
          <ol>
            <li>{t("logIntoAccount")}</li>
            <li>{t("goToProfileSettings")}</li>
            <li>{t("clickDeleteAccount")}</li>
          </ol>
          <h3>{t("option2")}</h3>
          <p>{t("option2Description")}</p>
          <form onSubmit={handleSubmit} className="space-y-4 not-prose">
            <div>
              <Input
                type="email"
                placeholder={t("enterYourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit">{t("submitDeletionRequest")}</Button>
          </form>
          <h3 className="mt-8">{t("whatGetsDeleted")}</h3>
          <p>{t("whatGetsDeletedDescription")}</p>
          <ul>
            <li>{t("profileInformation")}</li>
            <li>{t("authenticationData")}</li>
            <li>{t("usageHistory")}</li>
          </ul>
          <p>{t("deletionProcessNote")}</p>
          <h3>{t("contactUs")}</h3>
          <p>{t("contactUsDescription")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
