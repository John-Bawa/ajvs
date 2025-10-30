import { AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface OJSRedirectNoticeProps {
  title: string;
  description: string;
  actionLabel: string;
  actionUrl: string;
}

export const OJSRedirectNotice = ({
  title,
  description,
  actionLabel,
  actionUrl,
}: OJSRedirectNoticeProps) => {
  const handleRedirect = () => {
    window.open(actionUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Alert className="mb-6 border-primary/20 bg-primary/5">
        <AlertCircle className="h-5 w-5 text-primary" />
        <AlertTitle className="text-lg font-semibold mb-2">{title}</AlertTitle>
        <AlertDescription className="text-base leading-relaxed">
          {description}
        </AlertDescription>
      </Alert>

      <div className="bg-card border rounded-lg p-8 text-center space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">External Journal System</h2>
          <p className="text-muted-foreground">
            AJVS uses Open Journal Systems (OJS) for manuscript submission and editorial workflows.
            You'll need to create a separate account on our OJS platform.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Button 
            size="lg" 
            onClick={handleRedirect}
            className="gap-2"
          >
            {actionLabel}
            <ExternalLink className="w-4 h-4" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            This will open our submission system in a new window
          </p>
        </div>
      </div>

      <div className="mt-8 bg-muted/50 rounded-lg p-6">
        <h3 className="font-semibold mb-3">What happens next?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• You'll be redirected to our OJS platform</li>
          <li>• Create an account or login if you already have one</li>
          <li>• Follow the submission guidelines to submit your manuscript</li>
          <li>• Track your submission status through the OJS dashboard</li>
        </ul>
      </div>
    </div>
  );
};
