import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  FileText, Download, Share2, BookOpen, CheckCircle, 
  Calendar, ExternalLink, Mail, Globe 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ajvsLogo from "@/assets/ajvs-logo-enhanced.png";
import { getOJSLink } from "@/config/ojs";
import { useToast } from "@/hooks/use-toast";

const SITE_URL = "https://ajvs-domain.lovable.app";
const PAGE_URL = `${SITE_URL}/call-for-papers`;
const OG_IMAGE = `${SITE_URL}/og-call-for-papers.jpg`;
const FLYER_URL = `${SITE_URL}/call-for-papers-flyer.jpg`;

const articleTypes = [
  "Original Research Articles",
  "Review Articles",
  "Short Communications",
  "Case Reports",
  "Technical Notes",
];

const subjectAreas = [
  "Veterinary Medicine & Surgery",
  "Veterinary Pathology & Microbiology",
  "Veterinary Public Health & Epidemiology",
  "Veterinary Pharmacology & Toxicology",
  "Veterinary Anatomy & Physiology",
  "Animal Production & Reproduction",
  "Wildlife & Conservation Medicine",
  "One Health & Zoonotic Diseases",
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
        await navigator.clipboard.writeText(`${shareText}`);
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
        <meta name="description" content="AJVS is now accepting manuscript submissions. Submit your original research, review articles, case reports and short communications in veterinary and biomedical sciences." />
        
        {/* Open Graph */}
        <meta property="og:title" content="📢 Call for Papers — AJVS Now Accepting Submissions" />
        <meta property="og:description" content="The African Journal of Veterinary Sciences (AJVS) invites researchers to submit original research articles, reviews, case reports & short communications. Open Access | Peer Reviewed | e-ISSN: 3027-0731" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="African Journal of Veterinary Sciences" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="📢 Call for Papers — AJVS" />
        <meta name="twitter:description" content="Submit your research to the African Journal of Veterinary Sciences. Open Access, Peer Reviewed journal." />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-16 sm:py-24">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212,175,55,0.1) 35px, rgba(212,175,55,0.1) 70px)`,
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <img src={ajvsLogo} alt="AJVS Logo" className="w-20 h-20 mx-auto mb-6 drop-shadow-lg" />
              
              <Badge className="mb-4 bg-highlight text-highlight-foreground text-sm px-4 py-1.5 font-semibold">
                Now Accepting Submissions
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-primary-foreground mb-4 leading-tight">
                Call for Papers
              </h1>

              <p className="text-xl sm:text-2xl text-primary-foreground/80 font-serif mb-2">
                African Journal of Veterinary Sciences
              </p>
              <p className="text-primary-foreground/60 text-lg mb-8">
                e-ISSN: 3027-0731 &bull; Open Access &bull; Peer Reviewed
              </p>

              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                We invite researchers, academics, and practitioners to submit high-quality 
                manuscripts in veterinary, biomedical, and environmental sciences for publication 
                in upcoming issues of AJVS.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <a href={getOJSLink('SUBMIT_MANUSCRIPT')} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-highlight hover:bg-highlight/90 text-highlight-foreground font-bold text-lg px-8 shadow-lg">
                    <FileText className="w-5 h-5 mr-2" />
                    Submit Your Manuscript
                  </Button>
                </a>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
                  onClick={handleDownloadFlyer}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Flyer
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Share Section */}
        <section className="bg-accent/10 py-6 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share this announcement:
              </span>
              <Button size="sm" variant="outline" onClick={() => handleShare("whatsapp")}>
                WhatsApp
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleShare("twitter")}>
                X / Twitter
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleShare("facebook")}>
                Facebook
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleShare("linkedin")}>
                LinkedIn
              </Button>
              <Button size="sm" variant="secondary" onClick={() => handleShare("copy")}>
                Copy Text
              </Button>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

              {/* Article Types */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-card border-border/50">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-foreground">Manuscript Types</h2>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      We welcome the following types of submissions:
                    </p>
                    <ul className="space-y-3">
                      {articleTypes.map((type) => (
                        <li key={type} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-foreground font-medium">{type}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Subject Areas */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-card border-border/50">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-highlight/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-highlight" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-foreground">Subject Areas</h2>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Manuscripts covering the following areas are encouraged:
                    </p>
                    <ul className="space-y-3">
                      {subjectAreas.map((area) => (
                        <li key={area} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-highlight flex-shrink-0" />
                          <span className="text-foreground font-medium">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Why Publish */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mt-12"
            >
              <Card className="shadow-card border-border/50 bg-primary/[0.03]">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
                    Why Publish with AJVS?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { icon: "🔓", title: "Open Access", desc: "Your research is freely accessible to readers worldwide" },
                      { icon: "📋", title: "Rigorous Peer Review", desc: "Double-blind review by experts in the field" },
                      { icon: "⚡", title: "Fast Turnaround", desc: "Efficient review and publication process" },
                      { icon: "🆔", title: "DOI Assignment", desc: "Every article receives a unique Digital Object Identifier" },
                      { icon: "🌍", title: "Global Visibility", desc: "Indexed for discoverability on Google Scholar & ORCID" },
                      { icon: "📜", title: "e-ISSN Registered", desc: "Official e-ISSN: 3027-0731" },
                    ].map((item) => (
                      <div key={item.title} className="text-center">
                        <span className="text-3xl mb-2 block">{item.icon}</span>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Submission Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mt-12 text-center"
            >
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">How to Submit</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Manuscripts should be submitted through our Online Submission Portal. 
                Please review the Author Guidelines before submitting.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={getOJSLink('SUBMIT_MANUSCRIPT')} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="font-semibold">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Submit Online
                  </Button>
                </a>
                <a href="/for-authors">
                  <Button size="lg" variant="outline" className="font-semibold">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Author Guidelines
                  </Button>
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>For inquiries: <a href="mailto:ajvetsci@gmail.com" className="text-primary hover:underline font-medium">ajvetsci@gmail.com</a></span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CallForPapers;
