import { PageHero } from "@/components/layout/PageHero";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { OJSCurrentIssueSection } from "@/components/ojs/OJSCurrentIssueSection";
import { SEOHead } from "./SEOHead";

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
      <PageHero eyebrow="Latest scholarship" title="Current Issue" description="Browse the latest articles published in AJVS, synced live from the journal portal." />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-12">
              <OJSCurrentIssueSection />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CurrentIssue;
