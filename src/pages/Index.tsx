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

      <section className="border-b border-border bg-secondary/25 py-12 sm:py-16">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-2 text-xs font-bold uppercase text-primary">Journal remit</p>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Research with relevance to Africa and beyond</h2>
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
                <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase text-primary">Publishing with AJVS</p>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">A clear editorial pathway</h2>
            <p className="mt-3 text-muted-foreground">Understand each stage before sending your work to the journal.</p>
          </div>
          <div className="grid border-y border-border md:grid-cols-4 md:divide-x md:divide-border">
            {publishingSteps.map((step) => (
              <div key={step.number} className="border-b border-border py-6 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0">
                <span className="font-serif text-2xl text-primary">{step.number}</span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-sm">
              <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">Begin submission <ExternalLink /></a>
            </Button>
            <Button asChild variant="outline" className="rounded-sm"><Link to="/for-authors">Read author guidelines</Link></Button>
          </div>
        </div>
      </section>

      <NewsCarousel />

      <section className="border-y border-border bg-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-primary">Author centre</p>
              <h2 className="font-serif text-3xl font-semibold">Publishing resources</h2>
            </div>
            <Link to="/for-authors" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">View all resources <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {authorLinks.map((item) => (
              <Link key={item.title} to={item.to} className="group border-b border-border p-5 first:pl-0 hover:bg-secondary/30 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:last:pr-0">
                <item.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-base font-semibold group-hover:text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AcademicCalendar />

      <section className="border-t border-border bg-primary py-10 text-primary-foreground">
        <div className="container mx-auto flex flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase text-accent">Call for papers</p>
            <h2 className="font-serif text-3xl font-semibold text-primary-foreground">Share your research with AJVS</h2>
            <p className="mt-3 text-sm text-primary-foreground/75">Review the current call, prepare your manuscript, and submit through the official journal portal.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="secondary" className="rounded-sm"><Link to="/call-for-papers"><FileText /> View call for papers</Link></Button>
            <Button asChild className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer"><Send /> Submit manuscript</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Index;