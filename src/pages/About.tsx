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
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About AJVS</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              African Journal of Veterinary Sciences — Advancing veterinary research and practice across Africa and
              beyond
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Mission Card */}
            <div className="glass rounded-2xl p-8 md:p-12 hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The African Journal of Veterinary Sciences (AJVS) is a premier open-access, peer-reviewed journal
                    published by the Faculty of Veterinary Medicine, University of Jos, Nigeria. Our mission is to
                    advance veterinary sciences by disseminating high-quality research that addresses the unique
                    challenges and opportunities in animal health, production, and welfare across the African continent
                    and globally.
                  </p>
                </div>
              </div>
            </div>

            {/* Scope Card */}
            <div className="glass rounded-2xl p-8 md:p-12 hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 dark:bg-accent/30 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Scope of the Journal</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    African Journal of Veterinary Sciences aims to promote the contributions of the veterinary
                    profession and biomedical sciences in the African continent to the global hub of scientific
                    knowledge. This objective will be achieved via publishing of original research work and articles in
                    all aspects of veterinary, biomedical and animal sciences whose contents are novel or tailored
                    towards contributing to scientific knowledge with high impacts and of global importance.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The Journal welcomes original research articles, reviews, case reports, short communications and
                    perspectives in the fields of veterinary, biomedical and animal sciences which include but not
                    limited to:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Anatomy, Animal Breeding and Genetics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Biochemistry and Physiology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Diagnostic Medicine and Surgery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Entomology and Parasitology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Ecology and Environmental Health</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Immunology and Vaccine Development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Livestock Health and Production</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Microbiology and Pathology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Pharmacology and Toxicology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Public Health and Preventive Medicine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Wildlife Conservation and Health</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Editorial Policy Card */}
            <div className="glass rounded-2xl p-8 md:p-12 hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Editorial Policy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    African Journal of Veterinary Sciences has a distinguished Editorial Board made up of leading
                    professionals in the fields of veterinary and biomedical sciences from around the world. All the
                    manuscripts submitted to AJVS are subjected to a double-blind peer review process. With the presence
                    of a robust base of international reviewers, the process of decision making on the
                    acceptance/rejection of all submitted manuscripts will be done rapidly and to the highest standards.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Authors must prepare their manuscripts in accordance to the Instructions for Authors of the journal.
                    Manuscripts which do not follow the format and style of the Journal, will be returned to the authors
                    for revision or rejected. The Journal reserves the right to make any further formal changes and
                    language corrections necessary in a manuscript accepted for publication.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">We are committed to:</p>
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
                <div className="w-12 h-12 rounded-xl bg-accent/20 dark:bg-accent/30 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Indexing and Visibility</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    AJVS is committed to maximizing the visibility and impact of published research. We are actively
                    working toward indexing in major scientific databases, including:
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
              <p className="text-lg text-muted-foreground mb-2">Faculty of Veterinary Medicine</p>
              <p className="text-xl font-semibold text-primary">University of Jos, Nigeria</p>
              <p className="text-sm text-muted-foreground mt-4">
                Established in 1975, the Faculty of Veterinary Medicine, University of Jos, is one of Nigeria's leading
                institutions for veterinary education and research.
              </p>
            </div>

            {/* Contact Information */}
            <div className="glass rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl font-serif font-bold mb-6 text-center">Contact Information</h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-muted-foreground mb-4">All correspondences to the Editorial office,</p>
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-semibold">Faculty of Veterinary Medicine</p>
                  <p>University of Jos</p>
                  <p>PMB 2084, Jos</p>
                  <p>Plateau State</p>
                  <div className="flex items-center gap-2 mt-4 text-primary">
                    <Globe className="w-4 h-4" />
                    <a href="mailto:ajvsc@unijos.edu.ng" className="hover:underline">
                      ajvsc@unijos.edu.ng
                    </a>
                  </div>
                  <p className="text-sm">Phone: +2348035907570</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
