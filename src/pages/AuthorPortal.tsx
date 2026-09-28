import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/layout/PageHero";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { SEOHead } from "./SEOHead";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getOJSLink } from "@/config/ojs";
import {
  Send,
  UserPlus,
  FileText,
  PenLine,
  Users,
  BadgeCheck,
  Download,
  RotateCcw,
  CircleDollarSign,
  Mail,
  ExternalLink,
  ListChecks,
  Route as RouteIcon,
} from "lucide-react";

type ChecklistState = Record<string, boolean>;

const STORAGE_KEY = "ajvs-author-portal-checklist";

const CHECKLIST: { section: string; items: { id: string; label: string; hint?: string; href?: string }[] }[] = [
  {
    section: "Manuscript format",
    items: [
      { id: "fmt-word", label: "Microsoft Word file (.doc/.docx), Times New Roman 12, double-spaced" },
      { id: "fmt-title", label: "Title page ≤ 23 words with authors, affiliations and corresponding author's institutional email" },
      { id: "fmt-abstract", label: "Abstract up to 300 words with 5 keywords not in the title" },
      { id: "fmt-figures", label: "Figures at 300 dpi, placed after the tables" },
      { id: "fmt-refs", label: "References in APA 5th edition style" },
    ],
  },
  {
    section: "Required documents",
    items: [
      { id: "doc-declaration", label: "Signed AJVS Declaration Form downloaded and completed", href: "https://drive.google.com/file/d/1j4MBLvZb3LNSOnx3eW6kjbJQq7NMFZR4/view?usp=drivesdk" },
      { id: "doc-cover", label: "Cover letter confirming the manuscript is approved by all authors" },
      { id: "doc-call", label: "Call for Manuscript reviewed", href: "https://docs.google.com/document/d/1azO7DjaLQ7cR1dQtjYBPj38qF8WOSkrF/edit?usp=drivesdk" },
    ],
  },
  {
    section: "Ethics & payment",
    items: [
      { id: "eth-approval", label: "Ethical approval body and reference number included in Methods (where applicable)" },
      { id: "eth-coi", label: "Conflict of interest statement included" },
      { id: "pay-fee", label: "Processing fee of ₦5,000 (or $30) paid — Access Bank, 1931486112" },
    ],
  },
];

const ALL_IDS = CHECKLIST.flatMap((s) => s.items.map((i) => i.id));

const STEPS = [
  {
    icon: FileText,
    title: "Prepare your manuscript",
    text: "Follow the AJVS format: Microsoft Word, Times New Roman 12, double spacing, A4 with normal margins, and APA 5th edition references. Original research, reviews (≤ 30,000 words), short communications (≤ 2,000 words) and case reports are all welcome.",
    link: { label: "Read the full guidelines", to: "/for-authors" },
  },
  {
    icon: CircleDollarSign,
    title: "Pay the processing fee",
    text: "A non-refundable processing fee of ₦5,000 (or $30) is paid with each manuscript, before it is sent to reviewers. Payments go to African Journal of Vet. Sciences, Access Bank Plc, account 1931486112.",
  },
  {
    icon: UserPlus,
    title: "Create your OJS account",
    text: "AJVS handles every submission and editorial step in its online system. Register once as an Author — your account also lets you track the progress of your manuscript.",
    link: { label: "Register on the submission system", href: getOJSLink("REGISTER") },
  },
  {
    icon: Send,
    title: "Submit through OJS",
    text: "Log in and start a new submission: upload the manuscript, the signed declaration form and your cover letter, then complete the submission wizard. You will receive a confirmation with your manuscript ID.",
    link: { label: "Start your submission", href: getOJSLink("SUBMIT_MANUSCRIPT") },
  },
  {
    icon: Users,
    title: "Peer review",
    text: "The editorial office first checks content, relevance and format. Compliant manuscripts go to three independent reviewers under a double-blind process, with recommendations expected within three weeks.",
  },
  {
    icon: BadgeCheck,
    title: "Decision, proof & publication",
    text: "Accepted papers (based on at least two favourable reviews) receive a PDF galley proof by email — return corrections within 72 hours. A page charge of ₦7,000 (or $35) per printed page applies, and articles are published online as soon as they are ready.",
  },
];

const AuthorPortal = () => {
  const [checked, setChecked] = useState<ChecklistState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ChecklistState) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // storage unavailable — checklist simply won't persist
    }
  }, [checked]);

  const doneCount = useMemo(() => ALL_IDS.filter((id) => checked[id]).length, [checked]);
  const progress = Math.round((doneCount / ALL_IDS.length) * 100);

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <SEOHead
        title="Author Portal"
        description="Step-by-step submission pathway for authors of the African Journal of Veterinary Sciences (AJVS) — preparation checklist, processing fees, and direct access to the OJS submission system."
        canonicalUrl="https://africanjournalvetsci.org/author-portal"
        keywords={["author portal", "submit manuscript", "AJVS submission", "veterinary journal submission", "OJS submission", "publication checklist"]}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" },
          { name: "Author Portal", url: "https://africanjournalvetsci.org/author-portal" },
        ]}
      />
      <TopBar />
      <Header />

      <PageHero
        eyebrow="For authors"
        title="Author Portal"
        description="Everything you need to publish with AJVS in one place — the submission pathway, a pre-submission checklist, and direct access to the journal's online submission system."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">
              <Send className="h-4 w-4" />
              Submit your manuscript
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-sm border-banner-foreground/40 bg-banner-foreground/10 text-banner-foreground hover:bg-banner-foreground/20 hover:text-banner-foreground"
          >
            <a href={getOJSLink("AUTHOR_DASHBOARD")} target="_blank" rel="noopener noreferrer">
              Author dashboard
            </a>
          </Button>
        </div>
      </PageHero>

      <main className="flex-1 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Submission pathway */}
          <section aria-labelledby="pathway-heading" className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                <RouteIcon className="w-5 h-5 text-primary" />
              </div>
              <h2 id="pathway-heading" className="text-2xl font-serif font-bold">The submission pathway</h2>
            </div>
            <ol className="relative space-y-5 border-l-2 border-border ml-5 sm:ml-6">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="relative pl-6 sm:pl-8">
                    <span
                      aria-hidden
                      className="absolute -left-[15px] sm:-left-[17px] top-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-accent bg-background font-serif text-sm font-bold text-primary"
                    >
                      {i + 1}
                    </span>
                    <div className="glass rounded-2xl p-5 sm:p-6">
                      <div className="flex items-start gap-3">
                        <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/70">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-serif text-lg font-semibold">{step.title}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                          {step.link && (
                            <div className="mt-3">
                              {step.link.to ? (
                                <Link
                                  to={step.link.to}
                                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent"
                                >
                                  {step.link.label}
                                </Link>
                              ) : (
                                <a
                                  href={step.link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent"
                                >
                                  {step.link.label}
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Interactive checklist */}
          <section aria-labelledby="checklist-heading" className="mb-12">
            <div className="glass rounded-2xl p-5 sm:p-8">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 dark:bg-accent/30 flex items-center justify-center flex-shrink-0">
                    <ListChecks className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 id="checklist-heading" className="text-2xl font-serif font-bold">Pre-submission checklist</h2>
                    <p className="text-sm text-muted-foreground">Tick each item as you get your manuscript ready — your progress is saved on this device.</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground"
                  onClick={() => setChecked({})}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              <div className="mb-7">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">
                    {doneCount} of {ALL_IDS.length} items ready
                  </span>
                  <span className={progress === 100 ? "font-semibold text-accent" : "text-muted-foreground"}>
                    {progress === 100 ? "Ready to submit" : `${progress}%`}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {CHECKLIST.map((group) => (
                  <fieldset key={group.section} className="rounded-xl border border-border bg-secondary/40 p-4">
                    <legend className="px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{group.section}</legend>
                    <ul className="space-y-3">
                      {group.items.map((item) => {
                        const isChecked = !!checked[item.id];
                        return (
                          <li key={item.id}>
                            <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggle(item.id)}
                                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-primary"
                              />
                              <span className={isChecked ? "text-muted-foreground line-through" : "text-foreground"}>
                                {item.href ? (
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="font-semibold text-primary underline-offset-2 hover:underline"
                                  >
                                    {item.label}
                                  </a>
                                ) : (
                                  item.label
                                )}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                ))}
              </div>

              {progress === 100 && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent/10 p-4">
                  <p className="text-sm font-medium">Your manuscript looks ready. Start the submission on the AJVS online system.</p>
                  <Button asChild size="sm" className="rounded-sm">
                    <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">
                      <Send className="h-4 w-4" />
                      Start submission
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Fees summary */}
          <section aria-labelledby="fees-heading" className="mb-12">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass rounded-2xl p-5 sm:p-8">
                <h2 id="fees-heading" className="text-xl font-serif font-bold mb-4">Fees at a glance</h2>
                <ul className="space-y-3">
                  <li className="flex items-start justify-between gap-4 rounded-lg bg-secondary/50 p-4">
                    <span className="text-sm font-medium">Processing fee (with submission)</span>
                    <span className="text-sm font-bold text-primary whitespace-nowrap">₦5,000 / $30</span>
                  </li>
                  <li className="flex items-start justify-between gap-4 rounded-lg bg-secondary/50 p-4">
                    <span className="text-sm font-medium">Page charge (accepted articles)</span>
                    <span className="text-sm font-bold text-primary whitespace-nowrap">₦7,000 / $35 per page</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Payments to African Journal of Vet. Sciences, Access Bank Plc, account 1931486112. See the{" "}
                  <Link to="/call-for-papers" className="font-semibold text-primary hover:underline">Call for Papers</Link> for full details.
                </p>
              </div>

              <div className="glass rounded-2xl p-5 sm:p-8">
                <h2 className="text-xl font-serif font-bold mb-4">Download resources</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2 rounded-sm" asChild>
                    <a href="https://drive.google.com/file/d/1j4MBLvZb3LNSOnx3eW6kjbJQq7NMFZR4/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      AJVS Declaration Form
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 rounded-sm" asChild>
                    <a href="https://docs.google.com/document/d/1azO7DjaLQ7cR1dQtjYBPj38qF8WOSkrF/edit?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      Call for Manuscript
                    </a>
                  </Button>
                </div>
                <div className="mt-5 rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="text-sm">
                      <p className="font-semibold">Editorial Office</p>
                      <p className="text-muted-foreground">editor@africanjournalvetsci.org · +234 803 590 7570</p>
                      <Link to="/contact" className="mt-1 inline-block font-semibold text-primary hover:underline">Contact the editorial office</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="glass rounded-2xl border-t-2 border-accent p-6 text-center sm:p-10">
            <h2 className="text-2xl font-serif font-bold">Ready to publish with AJVS?</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Submissions are managed entirely through the journal's online system — register once and track your manuscript at every step.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-sm">
                <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer">
                  <Send className="h-4 w-4" />
                  Submit on the AJVS portal
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-sm">
                <Link to="/for-authors">Full author guidelines</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorPortal;
