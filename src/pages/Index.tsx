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
  Building2, ExternalLink, Shield, Clock, Globe
} from "lucide-react";
import ajvscLogo from "@/assets/ajvs-logo-enhanced.png";
import heroBuilding from "@/assets/hero-building.jpg";
import { OJSCurrentIssueSection } from "@/components/ojs/OJSCurrentIssueSection";
import { OJSAnnouncementsWidget } from "@/components/ojs/OJSAnnouncementsWidget";
import { getOJSLink } from "@/config/ojs";

const Index = () => {
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

  const editorialHighlights = [
    { icon: Shield, label: "Double-Blind Peer Review" },
    { icon: Clock, label: "4–8 Weeks Review Time" },
    { icon: Globe, label: "Open Access" },
    { icon: Award, label: "Ethical Publishing" },
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
      
      {/* Hero Section - Refined, scholarly appearance */}
      <section className="relative bg-primary py-12 md:py-16 overflow-hidden">
        {/* Background Image - subtle */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroBuilding}
            alt="Faculty of Veterinary Medicine Building"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/95"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-6">
              <img 
                src={ajvscLogo} 
                alt="African Journal of Veterinary Sciences Logo" 
                className="h-20 sm:h-24 md:h-28 w-auto mx-auto"
              />
            </div>

            {/* ISSN Badge */}
            <div className="mb-4 inline-block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                  e-ISSN: 3043-4246
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              African Journal of Veterinary Sciences
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto font-body">
              A peer-reviewed, open access journal publishing original research in veterinary medicine, 
              animal health, and biomedical sciences. Published by the Faculty of Veterinary Medicine, 
              University of Jos, Nigeria.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/submit" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold min-h-[44px]">
                  Submit Manuscript
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/current-issue" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border border-white/30 text-white hover:bg-white/10 min-h-[44px]">
                  Browse Current Issue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Credentials Bar */}
      <section className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 py-4 text-xs sm:text-sm text-muted-foreground">
            {editorialHighlights.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Publications & Announcements - Main Content */}
      <section className="py-10 sm:py-14 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Latest Publications - 2 columns */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold mb-1">Latest Articles</h2>
                  <p className="text-sm text-muted-foreground">
                    Recently published research from the current issue
                  </p>
                </div>
                <Link to="/current-issue">
                  <Button variant="outline" size="sm">
                    View All Articles
                  </Button>
                </Link>
              </div>
              <OJSCurrentIssueSection />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Announcements */}
              <OJSAnnouncementsWidget />
              
              {/* Editorial Board Quick Access */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Editorial Board
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground mb-3">
                    Meet our distinguished panel of international experts who ensure the quality and integrity of published research.
                  </p>
                  <Link to="/editorial-board">
                    <Button variant="link" className="p-0 h-auto text-primary">
                      View Editorial Board <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-border/50 bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Journal Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency:</span>
                    <span className="font-medium">Bi-annual</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-medium">English</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Access:</span>
                    <span className="font-medium text-primary">Open Access</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Established:</span>
                    <span className="font-medium">2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">e-ISSN:</span>
                    <span className="font-medium">3043-4246</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Aims & Scope Section */}
      <section className="py-10 sm:py-14 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2">Aims & Scope</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
              The African Journal of Veterinary Sciences (AJVS) publishes original research, reviews, and case reports 
              spanning all areas of veterinary and biomedical sciences with relevance to Africa and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scopeAreas.map((area) => (
              <Card key={area.title} className="h-full border-border/50 hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <area.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{area.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link to="/about">
              <Button variant="link" className="text-primary text-sm">
                Learn more about our scope <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Publish Section - Compact */}
      <section className="py-10 sm:py-14 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2">Why Publish with AJVS?</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Join a community of researchers committed to excellence in veterinary sciences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BookOpen,
                title: "Open Access",
                description: "All articles freely accessible worldwide, maximizing research impact.",
              },
              {
                icon: Users,
                title: "Expert Review",
                description: "Rigorous double-blind peer review by leading veterinary scientists.",
              },
              {
                icon: FileText,
                title: "Fast Publication",
                description: "Streamlined editorial process ensures rapid publication.",
              },
              {
                icon: Award,
                title: "High Standards",
                description: "Committed to ethical publishing practices and research integrity.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-border/50 h-full">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Indexing & Abstracting */}
      <section className="py-8 sm:py-10 bg-muted/50 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-serif font-bold mb-1">Indexing & Abstracting</h2>
            <p className="text-sm text-muted-foreground">
              AJVS is indexed in major academic databases
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {indexingBodies.map((body) => (
              <a
                key={body.name}
                href={body.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-colors flex items-center gap-2 group"
              >
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  {body.name}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-10 sm:py-14 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">Quick Access</h2>
            <p className="text-sm text-muted-foreground">Resources for authors, reviewers, and readers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((item) => (
              <Link key={item.title} to={item.link}>
                <Card className="h-full border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.title}</CardTitle>
                        <CardDescription className="text-sm">{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Learn more <ArrowRight className="ml-1 w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Process - Compact */}
      <section className="py-10 sm:py-14 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">Submission Process</h2>
              <p className="text-sm text-muted-foreground">
                Get your research published in four straightforward steps
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  step: "1",
                  title: "Register & Create Profile",
                  description: "Create your author account and link your ORCID for proper attribution.",
                },
                {
                  step: "2",
                  title: "Submit Manuscript",
                  description: "Upload your manuscript, figures, and supplementary materials through our portal.",
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
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 items-start bg-background p-4 rounded-lg border border-border/50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link to="/for-authors">
                <Button variant="outline" size="sm">
                  View Author Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Publisher Info */}
      <section className="py-10 sm:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-muted/30 rounded-xl border border-border/50">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-serif font-bold mb-1">Faculty of Veterinary Medicine</h3>
                <p className="text-sm text-muted-foreground mb-2">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
            Ready to Share Your Research?
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-xl mx-auto">
            Join our community of researchers and contribute to the advancement of veterinary sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/auth">
              <Button size="default" className="bg-white text-primary hover:bg-white/90">
                Login / Register
              </Button>
            </Link>
            <Link to="/submit">
              <Button size="default" variant="outline" className="border-white/30 text-white hover:bg-white/10">
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
