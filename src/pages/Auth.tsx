import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { OJSRedirectNotice } from "@/components/ojs/OJSRedirectNotice";
import { getOJSLink } from "@/config/ojs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Auth = () => {

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Account Management</CardTitle>
              <CardDescription>All user accounts and manuscript submissions are managed through our OJS platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  AJVS uses Open Journal Systems (OJS) for all manuscript-related activities including submission, peer review, and author/reviewer accounts.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <OJSRedirectNotice
                  title="Login to Your Account"
                  description="If you already have an OJS account for manuscript submission, review, or editorial tasks, click below to sign in."
                  actionLabel="Go to Login"
                  actionUrl={getOJSLink('LOGIN')}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <OJSRedirectNotice
                  title="Create a New Account"
                  description="New to AJVS? Register for an OJS account to submit manuscripts, participate in peer review, or manage editorial tasks."
                  actionLabel="Register Now"
                  actionUrl={getOJSLink('REGISTER')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
