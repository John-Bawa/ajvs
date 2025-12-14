import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { OJSRedirectNotice } from "@/components/ojs/OJSRedirectNotice";
import { getOJSLink } from "@/config/ojs";
import { FileText, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SubmitManuscript = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <TopBar />
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Before You Submit Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Submit Your Manuscript</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Review important information before submitting to AJVS
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass rounded-xl p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Processing Fee</h3>
              <p className="text-2xl font-bold text-primary mb-1">₦5,000 / $30</p>
              <p className="text-sm text-muted-foreground">Non-refundable, paid before review</p>
            </div>

            <div className="glass rounded-xl p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-accent/20 dark:bg-accent/30 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Page Charge</h3>
              <p className="text-2xl font-bold text-primary mb-1">₦7,000 / $35</p>
              <p className="text-sm text-muted-foreground">Per page for accepted articles</p>
            </div>

            <div className="glass rounded-xl p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Review Time</h3>
              <p className="text-2xl font-bold text-primary mb-1">3 Weeks</p>
              <p className="text-sm text-muted-foreground">Double-blind peer review</p>
            </div>
          </div>

          {/* Submission Requirements */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-6">Submission Requirements</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Manuscript Format</p>
                  <p className="text-sm text-muted-foreground">Times New Roman, 12pt, A4, double-spaced with 2.5cm margins</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Cover Letter Required</p>
                  <p className="text-sm text-muted-foreground">Signed declaration with copyright transfer statement</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Ethical Approval</p>
                  <p className="text-sm text-muted-foreground">Required for research involving humans or animals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Word Limits</p>
                  <p className="text-sm text-muted-foreground">Reviews: 30,000 words | Short communications: 2,000 words</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Plagiarism Screening</p>
                  <p className="text-sm text-muted-foreground">All manuscripts screened with similarity detection software</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Link to="/for-authors">
                <Button variant="outline" className="w-full sm:w-auto">
                  <FileText className="w-4 h-4 mr-2" />
                  View Complete Author Guidelines
                </Button>
              </Link>
            </div>
          </div>

          {/* OJS Redirect Notice */}
          <OJSRedirectNotice
            title="Ready to Submit?"
            description="To submit your manuscript, you'll be redirected to our Open Journal Systems (OJS) platform where all submission and editorial workflows are managed. Make sure you have your manuscript and supporting documents ready."
            actionLabel="Go to Submission System"
            actionUrl={getOJSLink('SUBMIT_MANUSCRIPT')}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitManuscript;
