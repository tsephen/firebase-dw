import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function DataDeletion() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit to your backend
    toast({
      title: "Request Received",
      description: "We'll process your data deletion request within 30 days.",
    });
    setEmail("");
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Data Deletion Request</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h2>How to Delete Your Data</h2>
          
          <h3>Option 1: Through Your Account</h3>
          <p>
            If you have an active account, you can delete your data by:
          </p>
          <ol>
            <li>Logging into your account</li>
            <li>Going to Profile settings</li>
            <li>Clicking on "Delete Account"</li>
          </ol>

          <h3>Option 2: Submit a Deletion Request</h3>
          <p>
            If you don't have access to your account, you can submit a deletion request:
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4 not-prose">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Submit Deletion Request</Button>
          </form>

          <h3 className="mt-8">What Gets Deleted</h3>
          <p>
            When you request data deletion, we will remove:
          </p>
          <ul>
            <li>Your profile information</li>
            <li>Authentication data</li>
            <li>Usage history</li>
          </ul>

          <p>
            Note: The deletion process may take up to 30 days to complete across all our systems.
          </p>

          <h3>Contact Us</h3>
          <p>
            If you have any questions about data deletion, please contact us at privacy@example.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
