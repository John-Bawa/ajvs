import { Link } from "react-router-dom";
import { Archive, ArrowRight, ExternalLink, FileText, Scale, Search, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ajvsLogo from "@/assets/ajvs-logo-enhanced.png";
import heroBuilding from "@/assets/hero-building.jpg";
import { OJSCurrentIssueSection } from "@/components/ojs/OJSCurrentIssueSection";
import { OJSAnnouncementsWidget } from "@/components/ojs/OJSAnnouncementsWidget";
import { OJS_BASE_URL, getOJSLink } from "@/config/ojs";

const journalLinks = [
  { label: "Aims & Scope", to: "/about", icon: Target },
  { label: "Editorial Board", to: "/editorial-board", icon: Users },
  { label: "Author Guidelines", to: "/for-authors", icon: FileText },
  { label: "Publication Ethics", to: "/policies", icon: Scale },
  { label: "Journal Archives", to: "/archives", icon: Archive },
];

export function ScholarlyOverview() {
  return (
    <>

      <section className="relative isolate overflow-hidden border-b border-border bg-banner text-banner-foreground">
        <img
          src={heroBuilding}
          alt="Faculty of Veterinary Medicine offices and laboratories, University of Jos"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
          fetchPriority="high"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-banner/[0.78]" />

        <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <img src={ajvsLogo} alt="African Journal of Veterinary Sciences logo" className="h-16 w-16 rounded-full bg-background/95 object-contain p-1 sm:h-20 sm:w-20" />
              <div className="border-l border-banner-foreground/40 pl-4 text-xs font-semibold uppercase tracking-wider text-banner-foreground/80">
                <span className="block text-banner-foreground">University of Jos</span>
                <span>Faculty of Veterinary Medicine</span>
              </div>
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-banner-foreground sm:text-[56px]">
              African Journal of Veterinary Sciences
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-banner-foreground/90">
              Peer-reviewed, open access research advancing veterinary, biomedical, environmental, and animal sciences in Africa and beyond.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-sm">
                <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer" title="Opens the submission portal">
                  Submit your research <ExternalLink className="!size-3 opacity-70" aria-hidden /><span className="sr-only">(opens the submission portal)</span>
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-sm border-banner-foreground bg-transparent text-banner-foreground hover:border-banner-foreground hover:bg-banner-foreground/10 hover:text-banner-foreground">
                <Link to="/current-issue">Read the current issue <ArrowRight /></Link>
              </Button>
            </div>
          </div>

          <form action={`${OJS_BASE_URL}/index.php/ajvs/search/search`} method="get" target="_blank" className="mt-10 max-w-3xl" role="search">
            <label htmlFor="journal-search" className="sr-only">Search AJVS articles, authors, and keywords</label>
            <div className="flex h-14 overflow-hidden rounded bg-background text-foreground focus-within:ring-2 focus-within:ring-accent">
              <Search className="ml-4 h-5 w-5 shrink-0 self-center text-muted-foreground" aria-hidden />
              <input id="journal-search" name="query" type="search" placeholder="Search articles, authors, or keywords" className="min-w-0 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground" />
              <Button type="submit" className="h-auto rounded-none px-6 sm:px-8">Search</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-wider text-banner-foreground/85">
              <Link to="/current-issue" className="inline-flex min-h-[44px] items-center gap-1 hover:text-banner-foreground hover:underline">Latest articles <ArrowRight className="h-3 w-3" aria-hidden /></Link>
              <Link to="/archives" className="inline-flex min-h-[44px] items-center gap-1 hover:text-banner-foreground hover:underline">Browse issues <ArrowRight className="h-3 w-3" aria-hidden /></Link>
              <Link to="/about" className="inline-flex min-h-[44px] items-center gap-1 hover:text-banner-foreground hover:underline">About the journal <ArrowRight className="h-3 w-3" aria-hidden /></Link>
            </div>
          </form>
        </div>
      </section>

      <section aria-label="Journal at a glance" className="border-b border-border bg-background">
        <dl className="container mx-auto grid grid-cols-2 px-4 sm:px-6 md:grid-cols-5">
          {[
            ["e-ISSN", "3043-4246"],
            ["Access", "Open Access"],
            ["Frequency", "Twice yearly"],
            ["Peer review", "Double-blind"],
            ["Publisher", "University of Jos, Nigeria"],
          ].map(([term, value]) => (
            <div key={term} className="border-b border-border px-4 py-5 md:border-b-0 md:border-l md:first:border-l-0 md:first:pl-0">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{term}</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto grid px-4 sm:px-6 lg:grid-cols-12">
          <aside className="border-b border-border py-8 lg:col-span-3 lg:border-b-0 lg:border-r lg:pr-8">
            <Button asChild className="mb-6 w-full rounded-sm">
              <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">Submit to AJVS <ExternalLink /></a>
            </Button>
            <nav aria-label="Journal information" className="divide-y divide-border border-y border-border">
              {journalLinks.map((item) => (
                <Link key={item.label} to={item.to} className="flex min-h-[44px] items-center gap-3 py-2 text-sm font-medium text-foreground hover:text-accent">
                  <item.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />{item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-7 flex items-center gap-3 rounded border border-border p-4">
              <img src={ajvsLogo} alt="" aria-hidden loading="lazy" className="h-10 w-10 shrink-0 object-contain" />
              <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Published by</p>
              <p className="mt-2 text-sm font-semibold">Faculty of Veterinary Medicine</p>
              <p className="text-sm text-muted-foreground">University of Jos, Nigeria</p>
              </div>
            </div>
            <div className="mt-7">
              <OJSAnnouncementsWidget />
            </div>
          </aside>

          <div className="py-8 lg:col-span-9 lg:pl-10">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Latest scholarship</p>
                <h2 className="font-serif text-3xl font-semibold">Current Issue</h2>
              </div>
              <Button asChild variant="link" className="shrink-0 px-0">
                <Link to="/current-issue">View all articles <ArrowRight /></Link>
              </Button>
            </div>
            <OJSCurrentIssueSection compact />
          </div>
        </div>
      </section>
    </>
  );
}