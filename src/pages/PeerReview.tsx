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
  ClipboardCheck,
  EyeOff,
  FileSearch,
  Gavel,
  ListChecks,
  Mail,
  RotateCcw,
  Send,
  ShieldCheck,
  Timer,
  UserCheck,
  Users,
} from "lucide-react";

type ChecklistState = Record<string, boolean>;

const STORAGE_KEY = "ajvs-reviewer-checklist";

const REVIEWER_CHECKLIST: { section: string; items: { id: string; label: string }[] }[] = [
  {
    section: "Before you accept",
    items: [
      { id: "accept-scope", label: "The manuscript falls within your area of expertise" },
      { id: "accept-time", label: "You can return your report within three weeks" },
      { id: "accept-coi", label: "You have no conflict of interest with the authors or the work" },
      { id: "accept-confidential", label: "You will keep the manuscript confidential and not share it" },
    ],
  },
  {
    section: "Assessing the manuscript",
    items: [
      { id: "assess-originality", label: "Originality and contribution to veterinary, biomedical or environmental science" },
      { id: "assess-methods", label: "Sound methodology, appropriate study design and ethical approval where applicable" },
      { id: "assess-results", label: "Results presented clearly, with tables and figures that support the findings" },
      { id: "assess-interpretation", label: "Conclusions justified by the data, without overstatement" },
      { id: "assess-refs", label: "References current, relevant and in APA 5th edition style" },
      { id: "assess-language", label: "Clarity of writing, structure and adherence to AJVS format" },
    ],
  },
  {
    section: "Writing your report",
    items: [
      { id: "report-summary", label: "Brief summary of the manuscript in your own words" },
      { id: "report-major", label: "Major comments numbered, with page or section references" },
      { id: "report-minor", label: "Minor comments (typography, wording, figure quality) listed separately" },
      { id: "report-confidential", label: "Confidential comments to the editor kept separate from comments to the authors" },
      { id: "report-recommendation", label: "Clear recommendation: accept, minor revision, major revision, or reject" },
    ],
  },
];

const ALL_IDS = REVIEWER_CHECKLIST.flatMap((s) => s.items.map((i) => i.id));

const PROCESS_STEPS = [
  {
    icon: Send,
    title: "Submission & editorial screening",
    text: "When a manuscript arrives through the AJVS online system, the editorial office first checks its content, relevance to the journal's scope, and compliance with the author guidelines. Manuscripts that do not meet these basic requirements are returned to the authors.",
  },
  {
    icon: EyeOff,
    title: "Double-blind reviewer selection",
    text: "Compliant manuscripts are assigned to three independent reviewers under a double-blind process — reviewers do not know who the authors are, and authors do not know who the reviewers are. Reviewers are chosen for their expertise in the subject area.",
  },
  {
    icon: Timer,
    title: "Review within three weeks",
    text: "Reviewers are asked to return a structured report with a clear recommendation within three weeks. Each report assesses originality, methodology, results, interpretation, references and presentation.",
  },
  {
    icon: Gavel,
    title: "Editorial decision",
    text: "The editorial team weighs the reviewers' recommendations. A manuscript is accepted on the strength of at least two favourable reviews. Decisions — accept, minor revision, major revision or reject — are communicated to the authors through the online system.",
  },
  {
    icon: ClipboardCheck,
    title: "Revision, proof & publication",
    text: "Authors revise where required, and accepted papers receive a PDF galley proof by email for correction within 72 hours. Articles are published online as soon as they are ready.",
  },
];

const EXPECTATIONS = [
  {
    icon: ShieldCheck,
    title: "Confidentiality",
    text: "Manuscripts under review are confidential documents. Do not share, discuss or use their content before publication.",
  },
  {
    icon: UserCheck,
    title: "Objectivity",
    text: "Judge the work on its merits. Personal criticism of the authors is never appropriate; support every criticism with evidence.",
  },
  {
    icon: Users,
    title: "Fairness",
    text: "Declare any conflict of interest and decline the review if you cannot be impartial or cannot meet the deadline.",
  },
];

const PeerReview = () => {
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
        title="Peer Review Process"
        description="How the African Journal of Veterinary Sciences (AJVS) reviews manuscripts — double-blind review by three independent reviewers, editorial decisions, and a practical checklist for reviewers."
        canonicalUrl="https://africanjournalvetsci.org/peer-review"
        keywords={["peer review", "AJVS review process", "reviewer checklist", "double-blind review", "veterinary journal reviewers"]}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" },
          { name: "Peer Review", url: "https://africanjournalvetsci.org/peer-review" },
        ]}
      />
      <TopBar />
      <Header />

      <PageHero
        eyebrow="For reviewers & authors"
        title="The Peer Review Process"
        description="Every AJVS manuscript is assessed through a double-blind review by three independent experts. Here is how the process works — and a practical checklist for reviewers."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={getOJSLink("REGISTER")} target="_blank" rel="noopener noreferrer">
              <UserCheck className="h-4 w-4" />
              Register as a reviewer
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-sm border-banner-foreground/40 bg-banner-foreground/10 text-banner-foreground hover:bg-banner-foreground/20 hover:text-banner-foreground"
          >
            <Link to="/author-portal">Author Portal</Link>
          </Button>
        </div>
      </PageHero>

      <main className="flex-1 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Process steps */}
          <section aria-labelledby="process-heading" className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                <FileSearch className="w-5 h-5 text-primary" />
              </div>
              <h2 id="process-heading" className="text-2xl font-serif font-bold">How a manuscript is reviewed</h2>
            </div>
            <ol className="relative space-y-5 border-l-2 border-border ml-5 sm:ml-6">
              {PROCESS_STEPS.map((step, i) => {
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
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Reviewer expectations */}
          <section aria-labelledby="expectations-heading" className="mb-12">
            <h2 id="expectations-heading" className="mb-6 text-2xl font-serif font-bold">What we ask of reviewers</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {EXPECTATIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="glass rounded-2xl p-5 sm:p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 dark:bg-primary/30">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Reviewer checklist */}
          <section aria-labelledby="checklist-heading" className="mb-12">
            <div className="glass rounded-2xl p-5 sm:p-8">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 dark:bg-accent/30 flex items-center justify-center flex-shrink-0">
                    <ListChecks className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 id="checklist-heading" className="text-2xl font-serif font-bold">Reviewer checklist</h2>
                    <p className="text-sm text-muted-foreground">Work through each item as you complete a review — your progress is saved on this device.</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => setChecked({})}>
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              <div className="mb-7">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">
                    {doneCount} of {ALL_IDS.length} items covered
                  </span>
                  <span className={progress === 100 ? "font-semibold text-accent" : "text-muted-foreground"}>
                    {progress === 100 ? "Report ready" : `${progress}%`}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {REVIEWER_CHECKLIST.map((group) => (
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
                                {item.label}
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
                  <p className="text-sm font-medium">Your review covers everything we ask for. Submit your report through the AJVS online system.</p>
                  <Button asChild size="sm" className="rounded-sm">
                    <a href={getOJSLink("LOGIN")} target="_blank" rel="noopener noreferrer">
                      <Send className="h-4 w-4" />
                      Log in to submit your report
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Final CTA */}
          <section className="glass rounded-2xl border-t-2 border-accent p-6 text-center sm:p-10">
            <h2 className="text-2xl font-serif font-bold">Interested in reviewing for AJVS?</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Register on the journal's online system and indicate your areas of expertise, or write to the editorial office to express your interest.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-sm">
                <a href={getOJSLink("REGISTER")} target="_blank" rel="noopener noreferrer">
                  <UserCheck className="h-4 w-4" />
                  Register as a reviewer
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-sm">
                <Link to="/contact">
                  <Mail className="h-4 w-4" />
                  Contact the editorial office
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PeerReview;
