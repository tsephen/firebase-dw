import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h2>Introduction</h2>
          <p>
            This Privacy Policy outlines how we collect, use, and protect your personal information when you use our authentication service.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Basic profile information (name, email)</li>
            <li>Authentication provider information</li>
            <li>Usage data and timestamps</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul>
            <li>Provide and maintain our authentication service</li>
            <li>Improve user experience</li>
            <li>Communicate with you about your account</li>
          </ul>

          <h2>Data Protection</h2>
          <p>
            We implement appropriate security measures to protect your personal information. Your data is stored securely using industry-standard encryption.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@example.com
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>

          <p className="text-sm text-muted-foreground mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
