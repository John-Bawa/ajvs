import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { OJSRedirectNotice } from "@/components/ojs/OJSRedirectNotice";
import { getOJSLink } from "@/config/ojs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Shield, BookOpen, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        toast.success("Signed in successfully");
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { full_name: formData.fullName },
          },
        });
        if (error) throw error;
        toast.success("Account created! You can now sign in.");
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Tabs defaultValue="ojs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ojs" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Authors & Reviewers
              </TabsTrigger>
              <TabsTrigger value="admin" className="gap-2">
                <Shield className="w-4 h-4" />
                Staff Login
              </TabsTrigger>
            </TabsList>

            {/* OJS Tab - Existing functionality */}
            <TabsContent value="ojs">
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
            </TabsContent>

            {/* Admin Login Tab */}
            <TabsContent value="admin">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">
                    {isLogin ? "Staff Sign In" : "Staff Registration"}
                  </CardTitle>
                  <CardDescription>
                    For editorial staff, editors, and administrators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAdminAuth} className="space-y-4">
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Dr. John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        minLength={6}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {isLogin ? "Sign In" : "Create Account"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      {isLogin ? "Don't have a staff account?" : "Already have an account?"}{" "}
                      <button
                        type="button"
                        className="text-primary underline-offset-4 hover:underline"
                        onClick={() => setIsLogin(!isLogin)}
                      >
                        {isLogin ? "Register" : "Sign in"}
                      </button>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
