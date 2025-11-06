import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { FileText, Users, BookOpen, Award, ArrowRight, CheckCircle, FileText as ArticleIcon } from "lucide-react";
import heroBackground from "@/assets/hero-background.webp";
import { motion } from "framer-motion";
import { OJSCurrentIssueSection } from "@/components/ojs/OJSCurrentIssueSection";
import { getOJSLink } from "@/config/ojs";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a4d5c] via-[#2a5d6c] to-[#1a4d5c] py-20 md:py-32 overflow-hidden">
        {/* Background Image Underlay with Ken Burns Effect */}
        <motion.div 
          className="absolute inset-0 opacity-50"
          initial={{ scale: 1.15, x: -20, y: -20 }}
          animate={{ 
            scale: [1.15, 1.25, 1.15],
            x: [-20, 20, -20],
            y: [-20, 10, -20]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          <img 
            src={heroBackground} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Animated Gradient Overlay with Breathing Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#1a4d5c]/40 via-[#2a5d6c]/30 to-[#1a4d5c]/50"
          animate={{ 
            background: [
              "linear-gradient(to bottom right, rgba(26,77,92,0.4), rgba(42,93,108,0.3), rgba(26,77,92,0.5))",
              "linear-gradient(to bottom right, rgba(26,77,92,0.5), rgba(42,93,108,0.4), rgba(26,77,92,0.4))",
              "linear-gradient(to bottom right, rgba(26,77,92,0.4), rgba(42,93,108,0.3), rgba(26,77,92,0.5))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        
        {/* Animated pattern overlay with subtle drift */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "reverse"
          }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </motion.div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 bg-white/10 rounded-full ${i > 2 ? 'hidden sm:block' : ''}`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center sm:text-left">
            {/* ISSN Badge */}
            <motion.div 
              className="mb-6 sm:mb-8 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 sm:px-6 py-2">
                <span className="text-amber-400 text-xs sm:text-sm font-medium">
                  e-ISSN: 3043-4246
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              African Journal of Veterinary Sciences
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A peer-reviewed, international and open access journal publishing high-quality original research articles, reviews, 
              short communications and case reports in all aspects of veterinary, biomedical and animal sciences. 
              Published twice yearly by the Faculty of Veterinary Medicine, University of Jos, Nigeria.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link to="/submit" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold shadow-xl glow-hover min-h-[48px]">
                  Submit Your Paper
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/current-issue" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm min-h-[48px]">
                  Browse Current Issue
                </Button>
              </Link>
            </motion.div>
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

      {/* Latest Publications Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
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

          {/* OJS Current Issue Component - API-driven */}
          <OJSCurrentIssueSection />
        </div>
      </section>

      {/* Submission Process */}
      <section className="py-12 sm:py-16 md:py-24">
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
            <a href={getOJSLink('LOGIN')} className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 min-h-[48px]">
                Login
              </Button>
            </a>
            <a href={getOJSLink('REGISTER')} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-foreground hover:bg-primary/10 min-h-[48px]">
                Register
              </Button>
            </a>
            <Link to="/submit" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 min-h-[48px]">
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
