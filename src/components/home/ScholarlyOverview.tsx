import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ajvsLogo from "@/assets/ajvs-logo-enhanced.png";
import { OJSCurrentIssueSection } from "@/components/ojs/OJSCurrentIssueSection";
import { OJSAnnouncementsWidget } from "@/components/ojs/OJSAnnouncementsWidget";
import { OJS_BASE_URL, getOJSLink } from "@/config/ojs";

const journalLinks = [
  { label: "Aims & Scope", to: "/about" },
  { label: "Editorial Board", to: "/editorial-board" },
  { label: "Author Guidelines", to: "/for-authors" },
  { label: "Publication Ethics", to: "/policies" },
  { label: "Journal Archives", to: "/archives" },
];

export function ScholarlyOverview() {
  return (
    <>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 text-xs sm:px-6">
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-primary-foreground/75">
            <span>e-ISSN 3043-4246</span>
            <span>Open Access</span>
            <span>Published twice yearly</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link to="/for-authors" className="hover:text-accent">For Authors</Link>
            <Link to="/policies" className="hover:text-accent">For Reviewers</Link>
            <a href={getOJSLink("LOGIN")} className="hover:text-accent">Journal Login</a>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-9 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="mb-5 flex items-center gap-4">
                <img src={ajvsLogo} alt="African Journal of Veterinary Sciences logo" className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
                <div className="border-l-2 border-highlight pl-4 text-xs font-semibold uppercase text-muted-foreground">
                  <span className="block text-primary">University of Jos</span>
                  <span>Faculty of Veterinary Medicine</span>
                </div>
              </div>
              <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                African Journal of Veterinary Sciences
              </h1>
              <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
                Peer-reviewed research advancing veterinary, biomedical, environmental, and animal sciences in Africa and beyond.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button asChild size="lg" className="w-full rounded-sm sm:w-auto">
                <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">
                  Submit Manuscript <ExternalLink />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-sm sm:w-auto">
                <Link to="/current-issue">Current Issue</Link>
              </Button>
            </div>
          </div>

          <form action={`${OJS_BASE_URL}/index.php/ajvs/search/search`} method="get" target="_blank" className="mt-8 max-w-4xl" role="search">
            <label htmlFor="journal-search" className="sr-only">Search AJVS articles, authors, and keywords</label>
            <div className="flex border-2 border-border bg-background focus-within:border-primary">
              <Search className="ml-4 mt-3.5 h-5 w-5 shrink-0 text-muted-foreground" />
              <input id="journal-search" name="query" type="search" placeholder="Search articles, authors, or keywords" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground" />
              <Button type="submit" className="h-auto rounded-none px-6 sm:px-8">Search</Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
              <Link to="/current-issue" className="hover:text-primary">Latest articles</Link>
              <Link to="/archives" className="hover:text-primary">Browse issues</Link>
              <Link to="/about" className="hover:text-primary">About the journal</Link>
            </div>
          </form>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto grid px-4 sm:px-6 lg:grid-cols-12">
          <aside className="border-b border-border bg-secondary/35 py-8 lg:col-span-3 lg:border-b-0 lg:border-r lg:pr-8">
            <Button asChild className="mb-6 w-full rounded-sm">
              <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">Submit to AJVS <ExternalLink /></a>
            </Button>
            <nav aria-label="Journal information" className="divide-y divide-border border-y border-border">
              {journalLinks.map((item) => (
                <Link key={item.label} to={item.to} className="flex items-center justify-between py-3 text-sm font-semibold text-foreground hover:text-primary">
                  {item.label}<ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </nav>
            <div className="mt-7 border-l-2 border-highlight pl-4">
              <p className="text-xs font-bold uppercase text-muted-foreground">Published by</p>
              <p className="mt-2 text-sm font-semibold">Faculty of Veterinary Medicine</p>
              <p className="text-sm text-muted-foreground">University of Jos, Nigeria</p>
            </div>
            <div className="mt-7">
              <OJSAnnouncementsWidget />
            </div>
          </aside>

          <div className="py-8 lg:col-span-9 lg:pl-10">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase text-primary">Latest scholarship</p>
                <h2 className="font-serif text-3xl font-semibold">Current Issue</h2>
              </div>
              <Button asChild variant="link" className="shrink-0 px-0">
                <Link to="/current-issue">View all <ArrowRight /></Link>
              </Button>
            </div>
            <OJSCurrentIssueSection compact />
          </div>
        </div>
      </section>
    </>
  );
}