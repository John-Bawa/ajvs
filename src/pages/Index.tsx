import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle, ExternalLink, FileText, Scale, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { SEOHead } from "./SEOHead";
import { getOJSLink } from "@/config/ojs";
import { NewsCarousel } from "@/components/home/NewsCarousel";
import { AcademicCalendar } from "@/components/home/AcademicCalendar";
import { ScholarlyOverview } from "@/components/home/ScholarlyOverview";
import { IssueAlertSignup } from "@/components/ojs/IssueAlertSignup";

const scopeAreas = [
  "Veterinary medicine and clinical practice",
  "Animal health, welfare, and production",
  "Biomedical and environmental sciences",
  "Epidemiology, public health, and One Health",
];

const publishingSteps = [
  { number: "01", title: "Prepare", text: "Review the journal scope, ethics policy, and author guidelines." },
  { number: "02", title: "Submit", text: "Send your manuscript through the official AJVS journal portal." },
  { number: "03", title: "Peer review", text: "Editorial screening is followed by independent scholarly review." },
  { number: "04", title: "Publish", text: "Accepted work is prepared for open-access publication." },
];

const authorLinks = [
  { icon: FileText, title: "Author Guidelines", text: "Manuscript preparation and submission requirements", to: "/for-authors" },
  { icon: Scale, title: "Policies & Ethics", text: "Editorial standards and publication ethics", to: "/policies" },
  { icon: Users, title: "Editorial Board", text: "Meet the scholars guiding AJVS", to: "/editorial-board" },
  { icon: BookOpen, title: "Journal Archives", text: "Browse published issues and articles", to: "/archives" },
];

const Index = () => (
  <div className="flex min-h-screen flex-col">
    <SEOHead
      title="Home"
      description="African Journal of Veterinary Sciences (AJVS) - A peer-reviewed, open access journal publishing original research in veterinary medicine, animal health, and biomedical sciences. Published by the Faculty of Veterinary Medicine, University of Jos, Nigeria. e-ISSN: 3043-4246"
      canonicalUrl="https://africanjournalvetsci.org"
      keywords={["veterinary journal", "animal health research", "open access", "peer-reviewed", "University of Jos", "Nigeria", "biomedical sciences", "veterinary medicine"]}
      breadcrumbs={[{ name: "Home", url: "https://africanjournalvetsci.org" }]}
    />
    <TopBar />
    <Header />
    <main>
      <ScholarlyOverview />

      <section className="border-b border-border section-band py-12 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Journal remit</p>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl border-b border-border pb-3">Research with relevance to Africa and beyond</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              AJVS publishes original research, reviews, case reports, and short communications across veterinary and allied sciences.
            </p>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/about">Read the full aims and scope <ArrowRight /></Link>
            </Button>
          </div>
          <div className="divide-y divide-border border-y border-border lg:col-span-7">
            {scopeAreas.map((area) => (
              <div key={area} className="flex items-center gap-3 py-4 text-sm font-semibold sm:text-base">
                <CheckCircle className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Publishing with AJVS</p>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl border-b border-border pb-3">A clear editorial pathway</h2>
            <p className="mt-3 text-muted-foreground">Understand each stage before sending your work to the journal.</p>
          </div>
          <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
            {publishingSteps.map((step, i) => (
              <li key={step.number} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary font-sans text-sm font-semibold text-primary dark:border-foreground dark:text-foreground">{i + 1}</span>
                  {i < publishingSteps.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-border md:block" />}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-sm">
              <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">Begin submission <ExternalLink /></a>
            </Button>
            <Button asChild variant="outline" className="rounded-sm"><Link to="/for-authors">Read author guidelines</Link></Button>
          </div>
        </div>
      </section>

      <NewsCarousel />

      <section className="border-y border-border bg-background py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Author centre</p>
              <h2 className="border-b border-border pb-3 font-serif text-3xl font-semibold">Publishing resources</h2>
            </div>
            <Link to="/for-authors" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">View all resources <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {authorLinks.map((item) => (
              <Link key={item.title} to={item.to} className="group border-b border-border p-5 first:pl-0 hover:bg-secondary sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:last:pr-0">
                <item.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-4 text-base font-semibold group-hover:text-accent">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AcademicCalendar />

      <section className="border-t border-border bg-background py-12 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <IssueAlertSignup />
        </div>
      </section>

      <section className="bg-banner py-12 text-banner-foreground md:py-16">
        <div className="container mx-auto flex flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold text-banner-foreground">Share your research with AJVS</h2>
            <p className="mt-3 text-banner-foreground/80">
              Prepare your manuscript using the{" "}
              <Link to="/call-for-papers" className="underline underline-offset-2 hover:text-banner-foreground">current call for papers</Link>
              {" "}and submit through the official journal portal.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-sm">
            <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer" title="Opens the submission portal"><Send /> Submit manuscript</a>
          </Button>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Index;