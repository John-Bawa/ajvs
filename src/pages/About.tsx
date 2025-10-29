import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Target, Globe, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              About AJVS
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              African Journal of Veterinary Sciences — Advancing veterinary research and practice across Africa and beyond
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Mission Card */}
            <div className="glass rounded-2xl p-8 md:p-12 hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-royal flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The African Journal of Veterinary Sciences (AJVS) is a premier open-access, peer-reviewed journal published by the Faculty of Veterinary Medicine, University of Jos, Nigeria. Our mission is to advance veterinary sciences by disseminating high-quality research that addresses the unique challenges and opportunities in animal health, production, and welfare across the African continent and globally.
                  </p>
                </div>
              </div>
            </div>

            {/* Scope Card */}
            <div className="glass rounded-2xl p-8 md:p-12 hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-cyan flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Scope of the Journal</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    AJVS publishes original research articles, review papers, case reports, and short communications covering all aspects of veterinary sciences, including but not limited to:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Veterinary Medicine and Surgery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Animal Production and Nutrition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Veterinary Public Health</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Veterinary Microbiology and Parasitology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Veterinary Pathology and Pharmacology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Veterinary Anatomy and Physiology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Wildlife and Conservation Medicine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>One Health and Zoonotic Diseases</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Editorial Policy Card */}
            <div className="glass rounded-2xl p-8 md:p-12 hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-royal flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Editorial Policy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    AJVS follows a rigorous double-blind peer review process to ensure the quality, originality, and scientific integrity of all published work. We are committed to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Maintaining the highest ethical standards in research publication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Promoting open access to scientific knowledge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Supporting early-career researchers and African scientists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Ensuring rapid publication of accepted manuscripts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Adhering to Committee on Publication Ethics (COPE) guidelines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Indexing Goals Card */}
            <div className="glass rounded-2xl p-8 md:p-12 hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-cyan flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Indexing and Visibility</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    AJVS is committed to maximizing the visibility and impact of published research. We are actively working toward indexing in major scientific databases, including:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h3 className="font-semibold mb-2">Current Indexing</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Google Scholar</li>
                        <li>• ResearchGate</li>
                        <li>• African Journals Online (AJOL)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h3 className="font-semibold mb-2">Target Indexing</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Scopus</li>
                        <li>• Web of Science</li>
                        <li>• Directory of Open Access Journals (DOAJ)</li>
                        <li>• PubMed/MEDLINE</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* University Affiliation */}
            <div className="glass rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-serif font-bold mb-4">Published By</h2>
              <p className="text-lg text-muted-foreground mb-2">
                Faculty of Veterinary Medicine
              </p>
              <p className="text-xl font-semibold text-banner">
                University of Jos, Nigeria
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Established in 1975, the Faculty of Veterinary Medicine, University of Jos, is one of Nigeria's leading institutions for veterinary education and research.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
