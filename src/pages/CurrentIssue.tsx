import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { OJSCurrentIssueSection } from "@/components/ojs/OJSCurrentIssueSection";
import { SEOHead } from "./SEOHead";
import { motion } from "framer-motion";
import scholarlyWorkspaceImg from "@/assets/scholarly-workspace.jpg";
import academicConferenceImg from "@/assets/academic-conference.jpg";

const CurrentIssue = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Current Issue"
        description="Browse the latest published articles in the current issue of AJVS. Open access peer-reviewed veterinary research."
        canonicalUrl="https://africanjournalvetsci.org/current-issue"
      />
      <TopBar />
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">Current Issue</h1>
                <p className="text-lg text-muted-foreground">
                  Browse the latest articles published in AJVS
                </p>
              </div>
              
              <OJSCurrentIssueSection />
            </div>

            {/* Academic Imagery Sidebar */}
            <motion.aside 
              className="hidden lg:block lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sticky top-24 space-y-6">
                <div className="rounded-lg overflow-hidden shadow-md border border-border/30">
                  <img 
                    src={scholarlyWorkspaceImg} 
                    alt="Scholarly research workspace" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md border border-border/30">
                  <img 
                    src={academicConferenceImg} 
                    alt="Academic conference presentation" 
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-border/30">
                  <h3 className="text-sm font-semibold mb-2">Open Access</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All articles are freely accessible, promoting global knowledge sharing in veterinary sciences.
                  </p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CurrentIssue;
