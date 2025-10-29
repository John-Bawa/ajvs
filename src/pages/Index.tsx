import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Users, BookOpen, Award, ArrowRight, CheckCircle } from "lucide-react";
import heroBackground from "@/assets/hero-background.webp";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a4d5c] via-[#2a5d6c] to-[#1a4d5c] py-20 md:py-32 overflow-hidden">
        {/* Background Image Underlay */}
        <div className="absolute inset-0 opacity-50">
          <img 
            src={heroBackground} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4d5c]/40 via-[#2a5d6c]/30 to-[#1a4d5c]/50"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* ISSN Badge */}
            <div className="mb-8 inline-block">
              <div className="bg-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-6 py-2">
                <span className="text-amber-400 text-sm font-medium">
                  ISSN: 2756-1234 (Print) | 2756-5678 (Online)
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              African Journal of Veterinary Sciences
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-3xl">
              Advancing veterinary research through rigorous peer review and open-access publishing. 
              Publishing cutting-edge studies from African and international scholars across diverse veterinary disciplines.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/submit">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold shadow-xl">
                  Submit Your Paper
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/current-issue">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm">
                  Browse Current Issue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Publish with AJVS?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a community of researchers committed to excellence in veterinary sciences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Submission Process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Simple Submission Process</h2>
              <p className="text-lg text-muted-foreground">
                Get your research published in four easy steps
              </p>
            </div>

            <div className="space-y-6">
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
                  className="flex gap-6 items-start group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-lg transition-smooth group-hover:scale-110">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-smooth mt-3" />
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/for-authors">
                <Button size="lg" variant="outline">
                  View Author Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-accent py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Ready to Share Your Research?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of researchers and contribute to the advancement of veterinary sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Create Account
              </Button>
            </Link>
            <Link to="/submit">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
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
