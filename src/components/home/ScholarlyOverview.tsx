import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ajvsLogo from "@/assets/ajvs-logo-enhanced.png";
import { OJSCurrentIssueSection } from "@/components/ojs/OJSCurrentIssueSection";
import { OJSAnnouncementsWidget } from "@/components/ojs/OJSAnnouncementsWidget";
import { getOJSLink } from "@/config/ojs";

export function ScholarlyOverview() {
  return (
    <>
      <section className="border-b border-border bg-secondary/25">
        <motion.div
          className="container mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:py-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={ajvsLogo}
                  alt="African Journal of Veterinary Sciences logo"
                  className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                />
                <div className="border-l border-border pl-4 text-xs font-semibold uppercase text-muted-foreground">
                  <span className="block text-primary">University of Jos</span>
                  <span>Faculty of Veterinary Medicine</span>
                </div>
              </div>
              <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                African Journal of Veterinary Sciences
              </h1>
              <p className="mt-5 max-w-3xl text-base text-muted-foreground sm:text-lg">
                A peer-reviewed, open access journal advancing veterinary, biomedical, environmental, and animal sciences in Africa and beyond.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
                <span>e-ISSN: 3043-4246</span>
                <span>Open Access</span>
                <span>Double-Blind Peer Review</span>
                <span>Published twice yearly</span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">
                  Submit Manuscript <ExternalLink />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link to="/current-issue">Browse Current Issue</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto grid gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-8">
            <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase text-primary">Latest scholarship</p>
                <h2 className="font-serif text-3xl font-semibold">Current Issue</h2>
              </div>
              <Button asChild variant="link" className="shrink-0 px-0">
                <Link to="/current-issue">View all <ArrowRight /></Link>
              </Button>
            </div>
            <OJSCurrentIssueSection />
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-md bg-primary p-6 text-primary-foreground">
              <p className="mb-4 text-xs font-bold uppercase text-primary-foreground/65">Journal at a glance</p>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="font-serif text-3xl font-semibold text-primary-foreground">2</p>
                  <p className="text-xs text-primary-foreground/70">Issues per year</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-semibold text-primary-foreground">Open</p>
                  <p className="text-xs text-primary-foreground/70">Reader access</p>
                </div>
              </div>
              <p className="mt-6 border-t border-primary-foreground/15 pt-5 text-sm text-primary-foreground/75">
                Published by the Faculty of Veterinary Medicine, University of Jos, Nigeria.
              </p>
            </div>
            <OJSAnnouncementsWidget />
          </aside>
        </div>
      </section>
    </>
  );
}