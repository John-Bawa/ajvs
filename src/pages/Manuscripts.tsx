import { useEffect } from "react";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { OJSRedirectNotice } from "@/components/ojs/OJSRedirectNotice";
import { getOJSLink } from "@/config/ojs";

const Manuscripts = () => {
  useEffect(() => {
    // Auto-redirect to OJS author dashboard after 2 seconds
    const timer = setTimeout(() => {
      window.location.href = getOJSLink('AUTHOR_DASHBOARD');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Author Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your manuscripts and submissions through OJS
            </p>
          </div>

          <OJSRedirectNotice
            title="View Your Manuscripts"
            description="All manuscript submissions and tracking are managed through the OJS platform. You'll be redirected to your author dashboard where you can view submission status, respond to reviewer comments, and manage revisions."
            actionLabel="Go to Author Dashboard"
            actionUrl={getOJSLink('AUTHOR_DASHBOARD')}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Manuscripts;
