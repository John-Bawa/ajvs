import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FileText, Download, Share2, BookOpen, CheckCircle,
  ExternalLink, Mail, Globe, Microscope, FlaskConical,
  Stethoscope, Leaf, Copy, ArrowRight, Send
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

const benefits = [
  {
    icon: Globe,
    title: "Open Access Publication",
    description: "All accepted articles are freely accessible to readers worldwide without subscription barriers, maximising the reach and impact of your research.",
  },
  {
    icon: CheckCircle,
    title: "Rigorous Double-Blind Peer Review",
    description: "Every submission undergoes a thorough double-blind review process conducted by field experts to ensure scientific rigour and credibility.",
  },
  {
    icon: FileText,
    title: "DOI Assignment",
    description: "Each published article receives a unique Digital Object Identifier (DOI), ensuring permanent, citable links for long-term discoverability.",
  },
  {
    icon: Microscope,
    title: "Indexed for Global Visibility",
    description: "Articles are indexed on Google Scholar and ORCID, ensuring discoverability by researchers, institutions, and databases worldwide.",
  },
];

const guidelines = [
  "Manuscripts must be original and not under consideration elsewhere.",
  "Submissions must be prepared in MS Word format.",
  "Formatting and referencing must follow AJVS Author Guidelines.",
  "Ethical clearance must be provided where applicable.",
  "All manuscripts undergo double-blind peer review.",
  "Plagiarism screening is conducted for all submissions.",
];

const CallForPapers = () => {
  const { toast } = useToast();

  const shareText = `📢 CALL FOR PAPERS!\n\nThe African Journal of Veterinary Sciences (AJVS) is now accepting manuscript submissions.\n\n✅ Open Access | Peer Reviewed\n✅ e-ISSN: 3027-0731\n✅ Rapid peer review process\n\nSubmit your research today!\n🔗 ${PAGE_URL}`;

  const handleShare = async (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(PAGE_URL);

    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent("📢 Call for Papers - African Journal of Veterinary Sciences (AJVS) is now accepting submissions! Open Access | Peer Reviewed")}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      copy: "",
    };

    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(shareText);
        toast({ title: "Copied!", description: "Announcement text copied to clipboard." });
      } catch {
        toast({ title: "Error", description: "Failed to copy text.", variant: "destructive" });
      }
      return;
    }

    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  const handleDownloadFlyer = () => {
    const link = document.createElement("a");
    link.href = FLYER_URL;
    link.download = "AJVS-Call-For-Papers-2026.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        {/* ── Hero Banner ──────────────────────────────────────────── */}
        <section className="relative bg-primary overflow-hidden">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px),
                                linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Gold accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-highlight" />

          <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={ajvsLogo}
                  alt="AJVS Logo"
                  className="w-16 h-16 mx-auto mb-6 drop-shadow-lg"
                />

                <div className="inline-flex items-center gap-2 border border-highlight/40 bg-highlight/10 rounded-full px-4 py-1.5 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight"></span>
                  </span>
                  <span className="text-xs font-semibold text-highlight tracking-widest uppercase">Now Accepting Submissions</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-primary-foreground mb-4 leading-tight">
                  Call for Papers
                </h1>
                <p className="text-xl text-primary-foreground/75 font-serif mb-1">
                  African Journal of Veterinary Sciences
                </p>
                <p className="text-primary-foreground/50 text-sm tracking-wide mb-8">
                  Volume 1, Issue 1 (2026) &nbsp;&bull;&nbsp; e-ISSN: 3027-0731 &nbsp;&bull;&nbsp; Open Access &nbsp;&bull;&nbsp; Peer Reviewed
                </p>

                <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                  The African Journal of Veterinary Sciences invites researchers, academics, clinicians,
                  and industry professionals to submit high-quality manuscripts for publication in its
                  Inaugural Issue.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a href={getOJSLink('SUBMIT_MANUSCRIPT')} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-highlight hover:bg-highlight/90 text-highlight-foreground font-bold px-8 shadow-lg rounded-full min-h-[52px]">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Your Manuscript
                    </Button>
                  </a>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleDownloadFlyer}
                    className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 rounded-full min-h-[52px] px-8"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Flyer
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Share Bar ────────────────────────────────────────────── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-semibold text-foreground flex items-center gap-2 mr-2">
                <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
                Share this announcement:
              </span>
              {[
                { label: "WhatsApp", key: "whatsapp" },
                { label: "X / Twitter", key: "twitter" },
                { label: "Facebook", key: "facebook" },
                { label: "LinkedIn", key: "linkedin" },
              ].map(p => (
                <Button key={p.key} size="sm" variant="outline" onClick={() => handleShare(p.key)} className="text-xs">
                  {p.label}
                </Button>
              ))}
              <Button size="sm" variant="secondary" onClick={() => handleShare("copy")} className="text-xs gap-1.5">
                <Copy className="w-3 h-3" /> Copy Text
              </Button>
            </div>
          </div>
        </section>

        {/* ── Main Content ─────────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">

              {/* Two-column: Flyer + Submission Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

                {/* Flyer Image */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className="sticky top-24"
                >
                  <div className="rounded-xl overflow-hidden shadow-2xl border border-border/60 ring-1 ring-primary/10">
                    <img
                      src={FLYER_URL}
                      alt="AJVS Call for Papers 2026 Flyer"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadFlyer}
                      className="flex-1 rounded-full text-xs"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download Flyer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("whatsapp")}
                      className="flex-1 rounded-full text-xs"
                    >
                      <Share2 className="w-3.5 h-3.5 mr-1.5" />
                      Share on WhatsApp
                    </Button>
                  </div>
                </motion.div>

                {/* Details Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className="space-y-10"
                >
                  {/* Manuscript Types */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-6 w-1 bg-highlight rounded-full" />
                      <h2 className="text-xl font-serif font-bold text-foreground">Manuscript Types</h2>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">We welcome the following categories of submissions:</p>
                    <ul className="space-y-3">
                      {articleTypes.map(({ label, icon: Icon }) => (
                        <li key={label} className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground text-sm font-medium">{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Subject Areas */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-6 w-1 bg-accent rounded-full" />
                      <h2 className="text-xl font-serif font-bold text-foreground">Subject Areas</h2>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">Manuscripts covering the following areas are encouraged:</p>
                    <ul className="space-y-3">
                      {subjectAreas.map(({ label, icon: Icon }) => (
                        <li key={label} className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
                            <Icon className="w-4 h-4 text-accent-foreground" />
                          </div>
                          <span className="text-foreground text-sm font-medium">{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Submission Guidelines */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-6 w-1 bg-primary rounded-full" />
                      <h2 className="text-xl font-serif font-bold text-foreground">Guidelines for Contributors</h2>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">Authors should adhere to the following:</p>
                    <ul className="space-y-2.5">
                      {guidelines.map(g => (
                        <li key={g} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground text-sm leading-relaxed">{g}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 p-4 bg-muted/60 rounded-lg border border-border/50 text-sm text-muted-foreground leading-relaxed">
                      AJVS operates as an Open Access journal. <strong className="text-foreground">Article Processing Charges (APC)</strong> of ₦5,000 (USD $30) apply upon acceptance, plus a page charge of ₦7,000 (USD $35) per page.
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Why Publish — Full-width feature grid */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="mb-20"
              >
                <div className="text-center mb-10">
                  <Badge variant="outline" className="mb-3 border-primary/30 text-primary text-xs tracking-wide">
                    Publication Benefits
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">Why Publish with AJVS?</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {benefits.map(({ icon: Icon, title, description }, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex gap-5 p-6 rounded-xl border border-border/60 bg-secondary/30 hover:border-primary/20 hover:bg-secondary/50 transition-all"
                    >
                      <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1.5 text-sm">{title}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact & How to Submit */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* How to Submit */}
                <div className="p-8 rounded-xl bg-primary text-primary-foreground">
                  <h2 className="text-xl font-serif font-bold mb-3">How to Submit</h2>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
                    All manuscripts must be submitted through our online portal. 
                    Please read the Author Guidelines carefully before submitting.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a href={getOJSLink('SUBMIT_MANUSCRIPT')} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="w-full bg-highlight hover:bg-highlight/90 text-highlight-foreground font-semibold rounded-full">
                        <ExternalLink className="w-3.5 h-3.5 mr-2" />
                        Submit Online
                      </Button>
                    </a>
                    <a href="/for-authors">
                      <Button size="sm" variant="outline" className="w-full border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
                        <BookOpen className="w-3.5 h-3.5 mr-2" />
                        Author Guidelines
                        <ArrowRight className="w-3 h-3 ml-auto" />
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-8 rounded-xl border border-border bg-secondary/30">
                  <h2 className="text-xl font-serif font-bold text-foreground mb-3">Contact & Enquiries</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    For questions regarding submissions, author guidelines, or publication fees, 
                    please reach out to our editorial team.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Editorial Email</p>
                        <a href="mailto:editor@africanjournalvetsci.org" className="text-primary hover:underline font-medium text-sm">
                          editor@africanjournalvetsci.org
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Institutional Email</p>
                        <a href="mailto:ajvsc@unijos.edu.ng" className="text-primary hover:underline font-medium text-sm">
                          ajvsc@unijos.edu.ng
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Website</p>
                        <a href="https://www.africanjournalvetsci.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium text-sm">
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
