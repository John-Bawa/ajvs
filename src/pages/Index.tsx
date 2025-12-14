import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";


import { 
  FileText, Users, BookOpen, Award, ArrowRight, CheckCircle, 
  Target, Microscope, Heart, GraduationCap, Send, Search, 
  Building2, ExternalLink 
} from "lucide-react";
import ajvscLogo from "@/assets/ajvs-logo-enhanced.png";
import heroBuilding from "@/assets/hero-building.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { OJSCurrentIssueSection } from "@/components/ojs/OJSCurrentIssueSection";
import { OJSAnnouncementsWidget } from "@/components/ojs/OJSAnnouncementsWidget";
import { getOJSLink } from "@/config/ojs";

const Index = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);

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
      <TopBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-primary py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img 
            src={heroBuilding}
            alt="Faculty of Veterinary Medicine Building"
            className="w-full h-full object-cover opacity-20"
            style={{ y: imageY }}
          />
        </div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 80px)', backgroundSize: '80px 100%' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={ajvscLogo} 
                alt="African Journal of Veterinary Sciences Logo" 
                className="h-24 sm:h-32 md:h-36 w-auto mx-auto drop-shadow-lg"
              />
            </motion.div>

            {/* ISSN Badge */}
            <motion.div 
              className="mb-6 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded px-4 py-1.5">
                <span className="text-primary-foreground/90 text-xs sm:text-sm font-medium tracking-wide">
                  e-ISSN: 3043-4246
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              African Journal of <br className="hidden sm:block" />Veterinary Sciences
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-base sm:text-lg text-primary-foreground/85 mb-10 leading-relaxed max-w-2xl mx-auto font-body"
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
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link to="/submit" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg min-h-[48px]">
                  Submit Manuscript
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/current-issue" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 min-h-[48px]">
                  Browse Current Issue
                </Button>
              </Link>
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



      {/* Aims & Scope Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4">Aims & Scope</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                The African Journal of Veterinary Sciences (AJVS) publishes original research, reviews, and case reports 
                spanning all areas of veterinary and biomedical sciences with relevance to Africa and beyond.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

          <div className="mt-8 text-center">
            <Link to="/about">
              <Button variant="link" className="text-primary">
                Learn more about our scope <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
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

            {/* Announcements Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OJSAnnouncementsWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

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
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center group-hover:scale-110 transition-smooth">
                          <item.icon className="w-7 h-7 text-white" />
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


      {/* Submission Process */}
      <section className="py-12 sm:py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4">Simple Submission Process</h2>
              <p className="text-base sm:text-lg text-muted-foreground px-4">
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
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-base sm:text-lg transition-smooth group-hover:scale-110">
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

            <div className="mt-8 sm:mt-12 text-center">
              <Link to="/for-authors" className="w-full sm:w-auto inline-block">
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px]">
                  View Author Guidelines
                </Button>
              </Link>
            </div>
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
              <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 min-h-[48px]">
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
