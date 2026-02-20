import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FileText, Share2, BookOpen, CheckCircle, ExternalLink,
  Mail, Globe, Microscope, FlaskConical, Stethoscope, Leaf,
  Copy, ArrowRight, Send, Users, Award, Link2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ajvsLogo from "@/assets/ajvs-logo-enhanced.png";
import { getOJSLink } from "@/config/ojs";
import { useToast } from "@/hooks/use-toast";

const SITE_URL = "https://ajvs-domain.lovable.app";
const PAGE_URL = `${SITE_URL}/call-for-papers`;
const OG_IMAGE = `${SITE_URL}/og-call-for-papers.jpg`;
const FLYER_URL = `/call-for-papers-flyer.jpg`;

const shareChannels = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    description: "Share directly to chats & groups",
    color: "bg-[hsl(142,70%,45%)]",
    textColor: "text-white",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    description: "Reach academic & professional networks",
    color: "bg-[hsl(210,90%,40%)]",
    textColor: "text-white",
  },
  {
    key: "twitter",
    label: "X / Twitter",
    description: "Post to the research community",
    color: "bg-[hsl(0,0%,10%)]",
    textColor: "text-white",
  },
  {
    key: "facebook",
    label: "Facebook",
    description: "Share with colleagues & groups",
    color: "bg-[hsl(220,80%,50%)]",
    textColor: "text-white",
  },
];

const articleTypes = [
  { label: "Original Research Articles", icon: Microscope },
  { label: "Review Articles", icon: BookOpen },
  { label: "Short Communications", icon: FileText },
  { label: "Case Reports", icon: Stethoscope },
  { label: "Technical Notes", icon: FlaskConical },
];

const subjectAreas = [
  { label: "Veterinary Medicine & Surgery", icon: Stethoscope },
  { label: "Veterinary Pathology & Microbiology", icon: Microscope },
  { label: "Veterinary Public Health & Epidemiology", icon: Globe },
  { label: "Veterinary Pharmacology & Toxicology", icon: FlaskConical },
  { label: "Veterinary Anatomy & Physiology", icon: BookOpen },
  { label: "Animal Production & Reproduction", icon: Leaf },
  { label: "Wildlife & Conservation Medicine", icon: Leaf },
  { label: "One Health & Zoonotic Diseases", icon: Globe },
];

const guidelines = [
  {
    title: "Originality",
    body: "Manuscripts must present original work not previously published or currently under review elsewhere.",
  },
  {
    title: "File Format",
    body: "Submissions must be prepared and uploaded in Microsoft Word (.doc / .docx) format.",
  },
  {
    title: "Style & Referencing",
    body: "Formatting, citation style, and referencing must strictly follow the AJVS Author Guidelines published on the journal website.",
  },
  {
    title: "Ethical Clearance",
    body: "Animal or human ethics committee approval must be obtained and documented where applicable.",
  },
  {
    title: "Peer Review",
    body: "All submissions undergo a rigorous double-blind peer review process by two or more qualified reviewers.",
  },
  {
    title: "Plagiarism",
    body: "All manuscripts are screened for plagiarism prior to review. A similarity index above acceptable thresholds will result in rejection.",
  },
  {
    title: "Authorship",
    body: "All listed authors must have made substantive intellectual contributions to the work. Ghost or gift authorship is not permitted.",
  },
  {
    title: "Conflict of Interest",
    body: "Authors must declare any financial or non-financial competing interests that could influence the research.",
  },
];

const benefits = [
  {
    icon: Globe,
    title: "Open Access",
    description: "All published articles are freely accessible to readers worldwide — no subscription required.",
  },
  {
    icon: Users,
    title: "Double-Blind Peer Review",
    description: "Rigorous review by field experts ensures the scientific quality and credibility of every published work.",
  },
  {
    icon: FileText,
    title: "DOI Assignment",
    description: "Every article receives a Digital Object Identifier for permanent, globally citable referencing.",
  },
  {
    icon: Award,
    title: "Indexed & Discoverable",
    description: "Articles are indexed on Google Scholar and ORCID for maximum academic visibility.",
  },
];

const CallForPapers = () => {
  const { toast } = useToast();

  const shareText = `CALL FOR PAPERS — African Journal of Veterinary Sciences (AJVS)\n\nAJVS is now accepting manuscript submissions for its Inaugural Issue (Volume 1, Issue 1, 2026).\n\nOpen Access | Peer-Reviewed | e-ISSN: 3027-0731\n\nWe welcome original research, reviews, case reports, and short communications in veterinary and biomedical sciences.\n\nSubmit your work: ${PAGE_URL}`;

  const handleShare = async (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(PAGE_URL);

    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Call for Papers — African Journal of Veterinary Sciences (AJVS) is now accepting submissions for its Inaugural Issue. Open Access | Peer Reviewed")}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(PAGE_URL);
      toast({ title: "Link copied!", description: "The page link has been copied to your clipboard." });
    } catch {
      toast({ title: "Error", description: "Failed to copy link.", variant: "destructive" });
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast({ title: "Announcement copied!", description: "Ready to paste into any chat or post." });
    } catch {
      toast({ title: "Error", description: "Failed to copy text.", variant: "destructive" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Call for Papers | African Journal of Veterinary Sciences (AJVS)</title>
        <meta name="description" content="AJVS is now accepting manuscript submissions for its Inaugural Issue. Submit original research, review articles, case reports and short communications in veterinary and biomedical sciences." />
        <meta property="og:title" content="Call for Papers — AJVS Now Accepting Submissions" />
        <meta property="og:description" content="The African Journal of Veterinary Sciences (AJVS) invites researchers to submit original research articles, reviews, case reports & short communications. Open Access | Peer Reviewed | e-ISSN: 3027-0731" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="African Journal of Veterinary Sciences" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Call for Papers — AJVS" />
        <meta name="twitter:description" content="Submit your research to the African Journal of Veterinary Sciences. Open Access, Peer Reviewed journal." />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative bg-primary overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-highlight" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px),
                                linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">

                {/* Text — 3 cols */}
                <motion.div
                  className="lg:col-span-3 text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55 }}
                >
                  <img src={ajvsLogo} alt="AJVS Logo" className="w-14 h-14 mb-6 mx-auto lg:mx-0 drop-shadow-lg" />

                  <div className="inline-flex items-center gap-2 border border-highlight/40 bg-highlight/10 rounded-full px-4 py-1.5 mb-5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight" />
                    </span>
                    <span className="text-xs font-semibold text-highlight tracking-widest uppercase">
                      Now Accepting Submissions
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary-foreground leading-tight mb-3">
                    Call for Papers
                  </h1>
                  <p className="text-lg text-primary-foreground/70 font-serif mb-1">
                    African Journal of Veterinary Sciences
                  </p>
                  <p className="text-primary-foreground/45 text-xs tracking-wide mb-7">
                    Volume 1, Issue 1 (2026) &bull; e-ISSN: 3027-0731 &bull; Open Access &bull; Peer Reviewed
                  </p>

                  <p className="text-primary-foreground/75 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                    The African Journal of Veterinary Sciences (AJVS) invites researchers, academics,
                    clinicians, and industry professionals to submit high-quality manuscripts in veterinary,
                    biomedical, and environmental sciences.
                  </p>

                  <a href={getOJSLink('SUBMIT_MANUSCRIPT')} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-highlight hover:bg-highlight/90 text-highlight-foreground font-bold px-8 rounded-full min-h-[50px] shadow-lg">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Your Manuscript
                    </Button>
                  </a>
                </motion.div>

                {/* Flyer — 2 cols: shown as a styled preview card */}
                <motion.div
                  className="lg:col-span-2 flex justify-center lg:justify-end"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <div className="relative w-full max-w-xs">
                    {/* Decorative frame */}
                    <div className="absolute -inset-2 rounded-2xl border border-highlight/25 opacity-60" />
                    <div className="absolute -inset-4 rounded-3xl border border-primary-foreground/10 opacity-40" />
                    <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                      <img
                        src={FLYER_URL}
                        alt="AJVS Call for Papers 2026 — Official Announcement"
                        className="w-full h-auto block"
                      />
                    </div>
                    {/* Caption tag */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-highlight text-highlight-foreground text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                      Inaugural Issue · 2026
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Share This Announcement ───────────────────────────────── */}
        <section className="py-12 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Share2 className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-serif font-bold text-foreground">Share This Announcement</h2>
                </div>
                <p className="text-muted-foreground text-sm">
                  Help spread the word — share with colleagues, research groups, and professional networks.
                </p>
              </div>

              {/* Platform Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {shareChannels.map(ch => (
                  <button
                    key={ch.key}
                    onClick={() => handleShare(ch.key)}
                    className={`${ch.color} ${ch.textColor} rounded-xl p-4 text-left hover:opacity-90 active:scale-95 transition-all shadow-sm`}
                  >
                    <p className="font-semibold text-sm mb-0.5">{ch.label}</p>
                    <p className="text-[11px] opacity-75 leading-snug">{ch.description}</p>
                  </button>
                ))}
              </div>

              {/* Copy options */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-2 rounded-full">
                  <Link2 className="w-3.5 h-3.5" />
                  Copy Page Link
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyText} className="gap-2 rounded-full">
                  <Copy className="w-3.5 h-3.5" />
                  Copy Announcement Text
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Body Content ─────────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto space-y-20">

              {/* About the Journal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-7 w-1 bg-highlight rounded-full" />
                  <h2 className="text-2xl font-serif font-bold text-foreground">About the Journal</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    The <strong className="text-foreground">African Journal of Veterinary Sciences (AJVS)</strong> is
                    an open-access, peer-reviewed journal committed to advancing research and knowledge in
                    veterinary, biomedical, and environmental sciences. Published by the Faculty of Veterinary
                    Medicine, University of Jos, Nigeria, AJVS provides a credible platform for the dissemination
                    of original research that contributes to animal health, public health, food security, and
                    sustainable development.
                  </p>
                  <p>
                    AJVS is now receiving submissions for its <strong className="text-foreground">Inaugural Issue
                    (Volume 1, Issue 1, 2026)</strong>. All accepted manuscripts will attract a processing fee of
                    ₦5,000 (USD $30) payable before peer review commences, and a page charge of ₦7,000
                    (USD $35) per page upon acceptance. Payments should be made to Access Bank Plc, Account
                    Name: African Journal of Veterinary Sciences, <strong className="text-foreground">Account
                    Number: 1931486112</strong>.
                  </p>
                </div>
              </motion.div>

              <Separator />

              {/* Manuscript Types & Subject Areas — side by side */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Manuscript Types */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-7 w-1 bg-primary rounded-full" />
                      <h2 className="text-2xl font-serif font-bold text-foreground">Manuscript Types</h2>
                    </div>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                      We welcome the following categories of submission for consideration:
                    </p>
                    <ul className="space-y-3">
                      {articleTypes.map(({ label, icon: Icon }) => (
                        <li key={label} className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/12 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground text-sm font-medium">{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Subject Areas */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-7 w-1 bg-accent rounded-full" />
                      <h2 className="text-2xl font-serif font-bold text-foreground">Subject Areas</h2>
                    </div>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                      Manuscripts addressing the following thematic areas are particularly encouraged:
                    </p>
                    <ul className="space-y-3">
                      {subjectAreas.map(({ label, icon: Icon }) => (
                        <li key={label} className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-accent-foreground" />
                          </div>
                          <span className="text-foreground text-sm font-medium">{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <Separator />

              {/* Guidelines for Contributors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-7 w-1 bg-highlight rounded-full" />
                  <h2 className="text-2xl font-serif font-bold text-foreground">Guidelines for Contributors</h2>
                </div>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-2xl">
                  Authors are required to adhere to the following standards before and during the
                  submission process. Non-compliance may result in desk rejection without peer review.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {guidelines.map(({ title, body }) => (
                    <div key={title} className="flex gap-4 p-5 rounded-xl border border-border/60 bg-secondary/25 hover:border-primary/20 transition-colors">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                        <p className="text-muted-foreground text-xs leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <Separator />

              {/* Why Publish */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-7 w-1 bg-primary rounded-full" />
                  <h2 className="text-2xl font-serif font-bold text-foreground">Why Publish with AJVS?</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {benefits.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="p-5 rounded-xl border border-border/50 bg-secondary/20 text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <Separator />

              {/* How to Submit + Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* How to Submit */}
                <div className="rounded-xl bg-primary p-8">
                  <h2 className="text-xl font-serif font-bold text-primary-foreground mb-2">How to Submit</h2>
                  <p className="text-primary-foreground/65 text-sm leading-relaxed mb-6">
                    All manuscripts must be submitted through our online editorial management system.
                    Please read the Author Guidelines carefully before preparing your submission.
                  </p>
                  <div className="space-y-3">
                    <a href={getOJSLink('SUBMIT_MANUSCRIPT')} target="_blank" rel="noopener noreferrer" className="block">
                      <Button size="sm" className="w-full bg-highlight hover:bg-highlight/90 text-highlight-foreground font-semibold rounded-full">
                        <ExternalLink className="w-3.5 h-3.5 mr-2" />
                        Submit via Online Portal
                      </Button>
                    </a>
                    <a href="/for-authors" className="block">
                      <Button size="sm" variant="outline" className="w-full border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
                        <BookOpen className="w-3.5 h-3.5 mr-2" />
                        Author Guidelines
                        <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Contact */}
                <div className="rounded-xl border border-border bg-secondary/20 p-8">
                  <h2 className="text-xl font-serif font-bold text-foreground mb-2">Contact the Editorial Office</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    For submission enquiries, author guidelines clarification, or fee payment confirmation,
                    contact our editorial team directly.
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "Editorial", value: "editor@africanjournalvetsci.org", href: "mailto:editor@africanjournalvetsci.org" },
                      { label: "Institutional", value: "ajvsc@unijos.edu.ng", href: "mailto:ajvsc@unijos.edu.ng" },
                    ].map(item => (
                      <div key={item.label} className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-muted-foreground text-xs mb-0.5">{item.label}</p>
                          <a href={item.href} className="text-primary hover:underline text-sm font-medium">
                            {item.value}
                          </a>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-start gap-3">
                      <Globe className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Website</p>
                        <a href="https://www.africanjournalvetsci.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
                          www.africanjournalvetsci.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CallForPapers;
