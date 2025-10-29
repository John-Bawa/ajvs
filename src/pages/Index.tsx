import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Users, BookOpen, Award, ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-banner-foreground mb-6 animate-fade-in">
              African Journal of Veterinary Sciences
            </h1>
            <p className="text-xl md:text-2xl text-banner-foreground/80 mb-8 leading-relaxed">
              Advancing veterinary research through rigorous peer review and open-access publishing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/submit">
                <Button size="lg" className="bg-primary hover:bg-primary-hover shadow-elegant">
                  Submit Your Research
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/current-issue">
                <Button size="lg" variant="outline" className="border-banner-foreground/20 text-banner-foreground hover:bg-banner-foreground/10">
                  View Current Issue
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
            <Card className="shadow-card transition-smooth hover:shadow-elegant border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Open Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All articles are freely accessible to readers worldwide, maximizing your research impact.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card transition-smooth hover:shadow-elegant border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Expert Review</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Rigorous peer review by leading veterinary scientists ensures quality and credibility.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card transition-smooth hover:shadow-elegant border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Fast Publication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Streamlined editorial process ensures rapid publication of accepted manuscripts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card transition-smooth hover:shadow-elegant border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">High Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Committed to ethical publishing practices and research integrity.
                </CardDescription>
              </CardContent>
            </Card>
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
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-lg transition-smooth group-hover:scale-110">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-smooth mt-3" />
                </div>
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
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
