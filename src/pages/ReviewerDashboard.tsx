import { useEffect } from "react";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { OJSRedirectNotice } from "@/components/ojs/OJSRedirectNotice";
import { getOJSLink } from "@/config/ojs";

export default function ReviewerDashboard() {
  useEffect(() => {
    // Auto-redirect to OJS reviewer dashboard after 2 seconds
    const timer = setTimeout(() => {
      window.location.href = getOJSLink('REVIEWER_DASHBOARD');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">Reviewer Dashboard</h1>
            <p className="text-muted-foreground">
              Access your peer review assignments through OJS
            </p>
          </div>

          <OJSRedirectNotice
            title="Access Reviewer Dashboard"
            description="All peer review assignments and manuscript evaluations are managed through the OJS platform. You'll be redirected to your reviewer dashboard where you can view assigned manuscripts, submit reviews, and manage your review workload."
            actionLabel="Go to Reviewer Dashboard"
            actionUrl={getOJSLink('REVIEWER_DASHBOARD')}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
