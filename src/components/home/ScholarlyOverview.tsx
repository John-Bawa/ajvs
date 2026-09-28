import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ajvsLogo from "@/assets/ajvs-logo-enhanced.png";
import heroBuilding from "@/assets/hero-building.jpg";
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

      <section className="relative isolate overflow-hidden border-b border-border bg-primary text-primary-foreground">
        <img
          src={heroBuilding}
          alt="Faculty of Veterinary Medicine offices and laboratories, University of Jos"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
          fetchPriority="high"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/80 to-primary/10" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-primary/80 to-transparent" />

        <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <img src={ajvsLogo} alt="African Journal of Veterinary Sciences logo" className="h-16 w-16 rounded-full bg-background/95 object-contain p-1 sm:h-20 sm:w-20" />
              <div className="border-l-2 border-accent pl-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
                <span className="block text-primary-foreground">University of Jos</span>
                <span>Faculty of Veterinary Medicine</span>
              </div>
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
              African Journal of Veterinary Sciences
            </h1>
            <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
              Peer-reviewed, open access research advancing veterinary, biomedical, environmental, and animal sciences in Africa and beyond.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90">
                <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">
                  Submit your research <ExternalLink />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-sm">
                <Link to="/current-issue">Read the current issue <ArrowRight /></Link>
              </Button>
            </div>
          </div>

          <form action={`${OJS_BASE_URL}/index.php/ajvs/search/search`} method="get" target="_blank" className="mt-10 max-w-3xl" role="search">
            <label htmlFor="journal-search" className="sr-only">Search AJVS articles, authors, and keywords</label>
            <div className="flex overflow-hidden rounded-sm bg-background text-foreground shadow-lg focus-within:ring-2 focus-within:ring-accent">
              <Search className="ml-4 mt-3.5 h-5 w-5 shrink-0 text-muted-foreground" />
              <input id="journal-search" name="query" type="search" placeholder="Search articles, authors, or keywords" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground" />
              <Button type="submit" className="h-auto rounded-none px-6 sm:px-8">Search</Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-primary-foreground/80">
              <Link to="/current-issue" className="hover:text-accent">Latest articles</Link>
              <Link to="/archives" className="hover:text-accent">Browse issues</Link>
              <Link to="/about" className="hover:text-accent">About the journal</Link>
            </div>
          </form>
        </div>
      </section>

      <section aria-label="Journal facts" className="border-b border-border bg-secondary/40">
        <dl className="container mx-auto grid grid-cols-2 gap-px px-4 sm:px-6 md:grid-cols-4">
          {[
            ["e-ISSN", "3043-4246"],
            ["Access", "Open Access"],
            ["Frequency", "Twice yearly"],
            ["Publisher", "University of Jos, Nigeria"],
          ].map(([term, value]) => (
            <div key={term} className="border-l-2 border-accent/70 py-4 pl-4 first:border-l-2">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{term}</dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
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