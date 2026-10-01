import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Microscope,
  ShieldCheck,
  Stethoscope,
  Users,
  Download,
  LibraryBig,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { getOJSLink } from "@/config/ojs";
import musinguziPhoto from "@/assets/musinguzi.jpg";
import { SEOHead } from "./SEOHead";
import brochureAsset from "@/assets/ajvs-journal-profile-and-call-for-papers.pdf.asset.json";

const journalFacts = [
  { label: "e-ISSN", value: "3043-4246" },
  { label: "Access", value: "Open access" },
  { label: "Review", value: "Double-blind peer review" },
  { label: "Frequency", value: "Twice yearly" },
];

const scopeGroups = [
  {
    icon: Stethoscope,
    title: "Veterinary medicine",
    fields: ["Diagnostic medicine and surgery", "Livestock health and production", "Public health and preventive medicine", "Wildlife conservation and health"],
  },
  {
    icon: Microscope,
    title: "Biomedical sciences",
    fields: ["Biochemistry and physiology", "Immunology and vaccine development", "Microbiology and pathology", "Pharmacology and toxicology"],
  },
  {
    icon: Globe2,
    title: "Animal and environmental sciences",
    fields: ["Anatomy, animal breeding and genetics", "Entomology and parasitology", "Ecology and environmental health", "One Health research"],
  },
];

const impactPrinciples = [
  {
    icon: Globe2,
    title: "Open research",
    text: "AJVS makes published work freely available, helping researchers, practitioners and institutions read and use new knowledge without a subscription barrier.",
  },
  {
    icon: ShieldCheck,
    title: "Rigorous evaluation",
    text: "Submitted manuscripts are evaluated through double-blind peer review to support fair assessment and strong scientific standards.",
  },
  {
    icon: Users,
    title: "African scholarship, global relevance",
    text: "The journal gives veterinary, biomedical and animal-science research from Africa a dedicated scholarly platform while welcoming work of wider international importance.",
  },
];

const editorialLeadership = [
  { role: "Editor-in-Chief", name: "Dr Musinguzi Simon Peter", affiliation: "Kyambogo University, Uganda" },
  { role: "Co-Editor in-Chief", name: "Prof. Adeyeye, Adewale A.", affiliation: "Usmanu Danfodio University Sokoto, Nigeria" },
  { role: "Deputy Editor-in-Chief", name: "Dr Ameji, Negedu Onogu", affiliation: "University of Jos, Nigeria" },
  { role: "Managing Editor", name: "Dr Idris Ayodeji Azeez", affiliation: "University of Jos, Nigeria" },
];

const JournalOverview = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <SEOHead
      title="Journal Overview | AJVS"
      description="Explore the mission, scope, editorial leadership and scholarly impact of the African Journal of Veterinary Sciences, published by the University of Jos."
      canonicalUrl="https://africanjournalvetsci.org/journal-overview"
      keywords={["AJVS journal overview", "veterinary sciences journal", "University of Jos journal", "African veterinary research", "AJVS scope"]}
      breadcrumbs={[
        { name: "Home", url: "https://africanjournalvetsci.org" },
        { name: "Journal Overview", url: "https://africanjournalvetsci.org/journal-overview" },
      ]}
    />
    <Header />

    <PageHero
      eyebrow="About the journal"
      title="African Journal of Veterinary Sciences"
      description="A peer-reviewed, open-access journal advancing veterinary, biomedical and animal sciences from Africa to the wider research community."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/current-issue">Read current issue <ArrowRight /></Link>
        </Button>
        <Button asChild variant="outline" className="rounded-sm border-banner-foreground/40 bg-banner/70 text-banner-foreground hover:bg-banner-foreground hover:text-banner">
          <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">Submit to AJVS <ExternalLink /></a>
        </Button>
        <Button asChild variant="outline" className="rounded-sm border-banner-foreground/40 bg-banner/70 text-banner-foreground hover:bg-banner-foreground hover:text-banner">
          <a href={brochureAsset.url} download="AJVS-journal-profile-and-call-for-papers.pdf">Download brochure <Download /></a>
        </Button>
      </div>
    </PageHero>

    <div className="border-b border-border bg-card">
      <div className="container mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
        {journalFacts.map((fact, index) => (
          <div key={fact.label} className={`py-5 ${index % 2 === 0 ? "pr-4" : "border-l border-border pl-4"} lg:border-l lg:px-6 first:lg:border-l-0 first:lg:pl-0`}>
            <p className="text-xs font-bold uppercase text-muted-foreground">{fact.label}</p>
            <p className="mt-1 text-sm font-semibold leading-snug text-foreground sm:text-base">{fact.value}</p>
          </div>
        ))}
      </div>
    </div>

    <main className="flex-1">
      <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <p className="border-b border-border pb-3 text-xs font-bold uppercase text-muted-foreground">Journal menu</p>
          <nav aria-label="Journal overview sections" className="divide-y divide-border text-sm font-semibold">
            <a href="#mission" className="flex items-center justify-between py-3 text-foreground hover:text-primary">Mission & aims <ArrowRight className="h-3.5 w-3.5" /></a>
            <a href="#scope" className="flex items-center justify-between py-3 text-foreground hover:text-primary">Aims & scope <ArrowRight className="h-3.5 w-3.5" /></a>
            <a href="#leadership" className="flex items-center justify-between py-3 text-foreground hover:text-primary">Editorial leadership <ArrowRight className="h-3.5 w-3.5" /></a>
            <a href="#impact" className="flex items-center justify-between py-3 text-foreground hover:text-primary">Scholarly impact <ArrowRight className="h-3.5 w-3.5" /></a>
            <a href="#indexing" className="flex items-center justify-between py-3 text-foreground hover:text-primary">Indexing status <ArrowRight className="h-3.5 w-3.5" /></a>
            <a href="#authors" className="flex items-center justify-between py-3 text-foreground hover:text-primary">For authors <ArrowRight className="h-3.5 w-3.5" /></a>
          </nav>
          <div className="mt-6 border-t-2 border-accent bg-secondary p-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">Published by</p>
            <p className="mt-2 text-sm font-semibold text-foreground">Faculty of Veterinary Medicine</p>
            <p className="mt-1 text-sm text-muted-foreground">University of Jos, Nigeria</p>
          </div>
        </aside>

        <div className="min-w-0 space-y-16">
          <section id="mission" className="scroll-mt-6">
            <p className="text-xs font-bold uppercase text-primary">Purpose</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Mission and aims</h2>
            <div className="mt-6 border-l-2 border-accent pl-5 sm:pl-7">
              <p className="font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
                AJVS advances veterinary sciences by disseminating research that addresses animal health, production and welfare across Africa and globally.
              </p>
            </div>
            <p className="mt-6 text-muted-foreground">
              The journal publishes original research and scholarly articles in veterinary, biomedical and animal sciences. It provides a platform for work that contributes new scientific knowledge and responds to challenges of regional and international importance.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Original research articles", "Review articles", "Case reports", "Short communications and perspectives"].map((item) => (
                <div key={item} className="flex items-center gap-3 border-b border-border py-3 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {item}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
              {editorialLeadership.map((member) => (
                <div key={member.role} className="bg-card p-5">
                  <p className="text-xs font-bold uppercase text-primary">{member.role}</p>
                  <p className="mt-2 font-serif text-lg font-semibold">{member.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{member.affiliation}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="scope" className="scroll-mt-6">
            <p className="text-xs font-bold uppercase text-primary">Disciplines</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Aims and scope</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">AJVS welcomes research across connected fields of animal health, biomedical discovery and environmental health.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {scopeGroups.map(({ icon: Icon, title, fields }) => (
                <article key={title} className="border-t-2 border-primary bg-card p-5 shadow-card">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-xl">{title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {fields.map((field) => <li key={field} className="border-t border-border pt-2 first:border-t-0 first:pt-0">{field}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="leadership" className="scroll-mt-6 border-y border-border py-10">
            <div className="grid items-center gap-8 md:grid-cols-[180px_minmax(0,1fr)]">
              <img src={musinguziPhoto} alt="Dr Musinguzi Simon Peter, Editor-in-Chief of AJVS" className="aspect-square w-40 object-cover md:w-full" />
              <div>
                <p className="text-xs font-bold uppercase text-primary">Editorial leadership</p>
                <h2 className="mt-2 text-3xl font-semibold">Dr Musinguzi Simon Peter</h2>
                <p className="mt-1 font-semibold text-muted-foreground">Editor-in-Chief</p>
                <p className="mt-4 text-muted-foreground">Department of Agriculture and Animal Production, Kyambogo University, Kampala, Uganda.</p>
                <p className="mt-4 text-sm text-muted-foreground">AJVS is guided by an international editorial team spanning veterinary, biomedical and animal-science disciplines.</p>
                <Button asChild variant="outline" className="mt-6 rounded-sm">
                  <Link to="/editorial-board">Meet the Editorial Board <ArrowRight /></Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="impact" className="scroll-mt-6">
            <p className="text-xs font-bold uppercase text-primary">Research contribution</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">How AJVS creates scholarly impact</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">AJVS defines impact through access, research quality and the practical relevance of published scholarship—not unverified rankings or promotional metrics.</p>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {impactPrinciples.map(({ icon: Icon, title, text }) => (
                <article key={title} className="grid gap-4 py-6 sm:grid-cols-[48px_180px_minmax(0,1fr)] sm:items-start">
                  <div className="flex h-10 w-10 items-center justify-center bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="indexing" className="scroll-mt-6">
            <p className="text-xs font-bold uppercase text-primary">Third-party recognition</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Impact factor and indexing</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">AJVS reports scholarly metrics and database coverage only when they can be linked to an official third-party journal profile.</p>
            <div className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-2">
              <article className="bg-card p-6"><BarChart3 className="h-6 w-6 text-primary" /><p className="mt-4 text-xs font-bold uppercase text-muted-foreground">Journal Impact Factor</p><h3 className="mt-1 text-xl">Not yet verified</h3><p className="mt-3 text-sm text-muted-foreground">No numeric Journal Impact Factor is displayed because AJVS has not supplied an official Journal Citation Reports profile.</p></article>
              <article className="bg-card p-6"><LibraryBig className="h-6 w-6 text-primary" /><p className="mt-4 text-xs font-bold uppercase text-muted-foreground">Indexing databases</p><h3 className="mt-1 text-xl">Official profiles not documented</h3><p className="mt-3 text-sm text-muted-foreground">Database names will be added here only after their official AJVS profile links are verified.</p></article>
            </div>
          </section>

          <section id="authors" className="scroll-mt-6 border-t border-border pt-10">
            <p className="text-xs font-bold uppercase text-primary">For authors</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Prepare your contribution</h2>
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div className="border-t-2 border-primary bg-card p-6 shadow-card"><h3 className="text-xl">Submission pathway</h3><ol className="mt-4 space-y-3 text-sm text-muted-foreground">{["Review the author guidelines and prepare the manuscript.", "Complete the declaration form and cover letter.", "Pay the ₦5,000 processing fee.", "Submit and track the manuscript through OJS."].map((step, index) => <li key={step} className="flex gap-3"><span className="font-bold text-primary">{index + 1}.</span><span>{step}</span></li>)}</ol><Button asChild className="mt-6 rounded-sm"><Link to="/author-portal">Open Author Portal <ArrowRight /></Link></Button></div>
              <div className="border-t-2 border-accent bg-card p-6 shadow-card"><h3 className="text-xl">Publication charges</h3><dl className="mt-4 divide-y divide-border text-sm"><div className="flex justify-between gap-4 py-3"><dt className="text-muted-foreground">Processing fee</dt><dd className="font-bold">₦5,000 / $30</dd></div><div className="flex justify-between gap-4 py-3"><dt className="text-muted-foreground">Accepted article page charge</dt><dd className="font-bold">₦7,000 / $35 per page</dd></div></dl><Button asChild variant="outline" className="mt-6 rounded-sm"><a href={brochureAsset.url} download="AJVS-journal-profile-and-call-for-papers.pdf"><Download />Download journal brochure</a></Button></div>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-secondary py-10 sm:py-14">
        <div className="container mx-auto flex max-w-6xl flex-col justify-between gap-7 px-4 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase text-primary">Publish with AJVS</p>
            <h2 className="mt-2 text-3xl">Ready to contribute?</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Review the author requirements, prepare your manuscript and submit through the official OJS portal.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="rounded-sm"><Link to="/for-authors">Author guidelines</Link></Button>
            <Button asChild className="rounded-sm"><a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">Submit manuscript <ExternalLink /></a></Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default JournalOverview;