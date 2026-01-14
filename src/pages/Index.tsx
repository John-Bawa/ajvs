import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { SEOHead } from "./SEOHead";

import { 
  FileText, Users, BookOpen, Award, ArrowRight, CheckCircle, 
  Target, Microscope, Heart, GraduationCap, Send, Search, 
  Building2, ExternalLink 
} from "lucide-react";
import ajvscLogo from "@/assets/ajvs-logo-enhanced.png";
import heroBuilding from "@/assets/hero-building.jpg";
import academicLibraryImg from "@/assets/academic-library.jpg";
import researchMicroscopeImg from "@/assets/research-microscope.jpg";
import dataAnalysisImg from "@/assets/data-analysis.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { OJSCurrentIssueSection } from "@/components/ojs/OJSCurrentIssueSection";
import { OJSAnnouncementsWidget } from "@/components/ojs/OJSAnnouncementsWidget";
import { getOJSLink } from "@/config/ojs";
import { ResourceCardsSection } from "@/components/home/ResourceCardsSection";
import { NewsCarousel } from "@/components/home/NewsCarousel";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { PreviousIssuesSection } from "@/components/home/PreviousIssuesSection";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  // Mouse follow effect state
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const indexingBodies = [
    { name: "Google Scholar", url: "https://scholar.google.com" },
    { name: "ORCID", url: "https://orcid.org" },
  ];

  const scopeAreas = [
    { icon: Microscope, title: "Veterinary Medicine", description: "Clinical veterinary practice, diagnostics, and therapeutics" },
    { icon: Heart, title: "Animal Health", description: "Disease prevention, epidemiology, and public health" },
    { icon: Target, title: "Biomedical Sciences", description: "Anatomy, physiology, pharmacology, and pathology" },
    { icon: GraduationCap, title: "Animal Production", description: "Nutrition, reproduction, and livestock management" },
  ];

  const quickLinks = [
    { icon: Send, title: "For Authors", description: "Submission guidelines and templates", link: "/for-authors" },
    { icon: Search, title: "For Reviewers", description: "Review process and criteria", link: "/reviewer-dashboard" },
    { icon: BookOpen, title: "For Readers", description: "Browse articles and archives", link: "/archives" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Home"
        description="African Journal of Veterinary Sciences (AJVS) - A peer-reviewed, open access journal publishing original research in veterinary medicine, animal health, and biomedical sciences. Published by the Faculty of Veterinary Medicine, University of Jos, Nigeria. e-ISSN: 3043-4246"
        canonicalUrl="https://africanjournalvetsci.org"
        keywords={["veterinary journal", "animal health research", "open access", "peer-reviewed", "University of Jos", "Nigeria", "biomedical sciences", "veterinary medicine"]}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" }
        ]}
      />
      <TopBar />
      <Header />
      
      {/* Hero Section - Modern Side-by-Side Layout */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-[hsl(200,30%,10%)] dark:via-[hsl(210,25%,12%)] dark:to-[hsl(200,30%,8%)] py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Floating gradient orbs for modern feel */}
        <motion.div 
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-gradient-to-bl from-primary/5 to-accent/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 40, 0],
            y: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {/* Logo */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={ajvscLogo} 
                  alt="African Journal of Veterinary Sciences Logo" 
                  className="h-16 sm:h-20 md:h-24 w-auto mx-auto lg:mx-0 drop-shadow-md"
                />
              </motion.div>

              {/* ISSN Badge */}
              <motion.div 
                className="mb-5 inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-primary/10 dark:bg-white/10 backdrop-blur-sm border border-primary/20 dark:border-white/20 rounded-full px-4 py-1.5">
                  <span className="text-primary dark:text-white text-xs sm:text-sm font-medium tracking-wide">
                    e-ISSN: 3043-4246
                  </span>
                </div>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-foreground mb-5 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                African Journal of{' '}
                <span className="text-primary">Veterinary Sciences</span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                A peer-reviewed, open access journal publishing original research in veterinary medicine, 
                animal health, and biomedical sciences. Published by the Faculty of Veterinary Medicine, 
                University of Jos, Nigeria.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link to="/submit" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg min-h-[48px] rounded-full px-8">
                    Submit Manuscript
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/current-issue" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary/30 text-primary hover:bg-primary/10 min-h-[48px] rounded-full px-8">
                    Browse Current Issue
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div 
                className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Open Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Peer-Reviewed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Fast Publication</span>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Modern Image Card with Parallax & Mouse Follow */}
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div 
                ref={cardRef}
                className="relative cursor-pointer"
                style={{ 
                  y: imageY, 
                  rotateX: isHovering ? mousePosition.y * -8 : 0,
                  rotateY: isHovering ? mousePosition.x * 8 : 0,
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
                animate={{
                  rotateZ: isHovering ? 0 : imageRotate.get(),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Main Image Container */}
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-card border border-border/50"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{
                    boxShadow: isHovering 
                      ? `${mousePosition.x * -20}px ${mousePosition.y * 20}px 40px rgba(0,0,0,0.15)` 
                      : "0 25px 50px -12px rgba(0,0,0,0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.img 
                    src={heroBuilding}
                    alt="Faculty of Veterinary Medicine Building"
                    className="w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover"
                    style={{ scale: imageScale }}
                  />
                  
                  {/* Shine effect on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
                    style={{
                      opacity: isHovering ? 0.5 : 0,
                      transform: `translateX(${mousePosition.x * 50}%) translateY(${mousePosition.y * 50}%)`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  
                  {/* Overlay Info Card */}
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-card/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-border/50"
                    style={{ 
                      transform: isHovering ? "translateZ(30px)" : "translateZ(0px)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">Faculty of Veterinary Medicine</h3>
                        <p className="text-xs text-muted-foreground">University of Jos, Nigeria</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative Floating Elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute -top-3 -right-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
                >
                  Est. 2024
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compact Info Bar */}
      <section className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 py-3 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-medium text-foreground">e-ISSN: 3043-4246</span>
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <span>Open Access</span>
            <span className="hidden sm:inline text-border">|</span>
            <span>Peer-Reviewed</span>
            <span className="hidden sm:inline text-border">|</span>
            <span>Established 2024</span>
          </div>
        </div>
      </section>

      {/* Resource Cards Section - Publishing Tips, Peer Review, etc. */}
      <ResourceCardsSection />

      {/* Aims & Scope Section with Research Imagery */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Academic Research Sidebar Image */}
            <motion.div 
              className="hidden lg:block lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24 space-y-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={academicLibraryImg} 
                    alt="Academic research library" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={researchMicroscopeImg} 
                    alt="Research laboratory microscope" 
                    className="w-full h-32 object-cover"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center italic">
                  Advancing veterinary research excellence
                </p>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="text-center lg:text-left mb-10 sm:mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4">Aims & Scope</h2>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-3xl px-4 lg:px-0">
                    The African Journal of Veterinary Sciences (AJVS) publishes original research, reviews, and case reports 
                    spanning all areas of veterinary and biomedical sciences with relevance to Africa and beyond.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {scopeAreas.map((area, index) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full border-border/50 hover:border-primary/30 transition-smooth hover:shadow-lg group">
                      <CardHeader className="pb-2">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-smooth">
                          <area.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{area.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm">{area.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center lg:text-left">
                <Link to="/about">
                  <Button variant="link" className="text-primary">
                    Learn more about our scope <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4">Why Publish with AJVS?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Join a community of researchers committed to excellence in veterinary sciences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: BookOpen,
                title: "Open Access",
                description: "All articles are freely accessible to readers worldwide, maximizing your research impact.",
              },
              {
                icon: Users,
                title: "Expert Review",
                description: "Rigorous peer review by leading veterinary scientists ensures quality and credibility.",
              },
              {
                icon: FileText,
                title: "Fast Publication",
                description: "Streamlined editorial process ensures rapid publication of accepted manuscripts.",
              },
              {
                icon: Award,
                title: "High Standards",
                description: "Committed to ethical publishing practices and research integrity.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="shadow-card transition-smooth hover:shadow-elegant border-border/50 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Latest Publications & Announcements */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Latest Publications - 2 columns */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2">Latest Publications</h2>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Recent articles from our current issue
                  </p>
                </div>
                <Link to="/current-issue">
                  <Button variant="outline" size="lg" className="min-h-[48px]">
                    View All Articles
                  </Button>
                </Link>
              </div>
              <OJSCurrentIssueSection />
            </div>

            {/* Announcements & Newsletter Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="sticky top-24 space-y-8">
                <OJSAnnouncementsWidget />
                <NewsletterSignup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Carousel Section */}
      <NewsCarousel />

      {/* Previous Issues Section */}
      <PreviousIssuesSection />

      {/* Indexing & Abstracting */}
      <section className="py-12 sm:py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3">Indexing & Abstracting</h2>
              <p className="text-muted-foreground">
                AJVS is indexed in major academic databases
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
            {indexingBodies.map((body, index) => (
              <motion.a
                key={body.name}
                href={body.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-3 bg-background rounded-lg border border-border/50 hover:border-primary/50 hover:shadow-md transition-smooth flex items-center gap-2 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <span className="text-sm sm:text-base font-medium text-foreground/80 group-hover:text-primary transition-smooth">
                  {body.name}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-smooth" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>


      {/* Quick Links Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3">Quick Access</h2>
            <p className="text-muted-foreground">Resources for authors, reviewers, and readers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={item.link}>
                  <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-lg transition-smooth group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center group-hover:scale-110 transition-smooth">
                          <item.icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-smooth">{item.title}</CardTitle>
                          <CardDescription className="text-sm mt-1">{item.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Learn more <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Submission Process with Research Imagery */}
      <section className="py-12 sm:py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="text-center lg:text-left mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4">Simple Submission Process</h2>
                <p className="text-base sm:text-lg text-muted-foreground px-4 lg:px-0">
                  Get your research published in four easy steps
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    step: "1",
                    title: "Register & Create Profile",
                    description: "Create your author account and link your ORCID for proper attribution.",
                  },
                  {
                    step: "2",
                    title: "Submit Manuscript",
                    description: "Upload your manuscript, figures, and supplementary materials through our streamlined portal.",
                  },
                  {
                    step: "3",
                    title: "Peer Review",
                    description: "Expert reviewers evaluate your work and provide constructive feedback.",
                  },
                  {
                    step: "4",
                    title: "Publication",
                    description: "Upon acceptance, your article is published and assigned a DOI for citation.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    className="flex gap-4 sm:gap-6 items-start group bg-card/50 p-4 sm:p-5 rounded-lg hover:bg-card transition-smooth"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-base sm:text-lg transition-smooth group-hover:scale-110">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-1 sm:pt-2">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    <CheckCircle className="hidden sm:block w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-smooth mt-3 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 sm:mt-12 text-center lg:text-left">
                <Link to="/for-authors" className="w-full sm:w-auto inline-block">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px]">
                    View Author Guidelines
                  </Button>
                </Link>
              </div>
            </div>

            {/* Scholarly Workspace Sidebar Image */}
            <motion.div 
              className="hidden lg:block lg:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24 space-y-4">
                <div className="rounded-lg overflow-hidden shadow-lg border border-border/30">
                  <img 
                    src={dataAnalysisImg} 
                    alt="Research data analysis workspace" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="bg-card/80 rounded-lg p-4 border border-border/30">
                  <p className="text-sm text-muted-foreground italic text-center">
                    "From submission to publication — supporting researchers at every step of their journey."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Publisher Info */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 sm:p-8 bg-background rounded-2xl border border-border/50 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">Faculty of Veterinary Medicine</h3>
                <p className="text-muted-foreground mb-3">
                  University of Jos, P.M.B. 2084, Jos, Plateau State, Nigeria
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <Link to="/contact" className="text-primary hover:underline flex items-center gap-1">
                    Contact Us <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link to="/about" className="text-primary hover:underline flex items-center gap-1">
                    About the Journal <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 to-banner/10 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-3 sm:mb-4">
            Ready to Share Your Research?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join our community of researchers and contribute to the advancement of veterinary sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link to="/auth" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 min-h-[48px]">
                Login / Register
              </Button>
            </Link>
            <Link to="/submit" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary text-foreground hover:bg-primary/10 min-h-[48px]">
                Submit Manuscript
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
