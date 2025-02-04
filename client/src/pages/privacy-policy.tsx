import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("privacyPolicy")}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h2>{t("introduction")}</h2>
          <p>{t("privacyPolicyIntroduction")}</p>
          <h2>{t("informationWeCollect")}</h2>
          <ul>
            <li>{t("basicProfileInformation")}</li>
            <li>{t("authenticationProviderInfo")}</li>
            <li>{t("usageDataAndTimestamps")}</li>
          </ul>
          <h2>{t("howWeUseYourInformation")}</h2>
          <p>{t("howWeUseYourInformationDescription")}</p>
          <ul>
            <li>{t("provideAndMaintainService")}</li>
            <li>{t("improveUserExperience")}</li>
            <li>{t("communicateAboutAccount")}</li>
          </ul>
          <h2>{t("dataProtection")}</h2>
          <p>{t("dataProtectionDescription")}</p>
          <h2>{t("contactUs")}</h2>
          <p>{t("privacyPolicyContact")}</p>
          <h2>{t("updatesToThisPolicy")}</h2>
          <p>{t("updatesToPolicyDescription")}</p>
          <p className="text-sm text-muted-foreground mt-8">
            {t("lastUpdated", { date: new Date().toLocaleDateString() })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
