import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SEOHead } from "./SEOHead";
import { BookOpen, Target, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";
import cattleField from "@/assets/cattle-field.jpg";
import vetExamination from "@/assets/vet-examination.jpg";
import wildlifeAfrica from "@/assets/wildlife-africa.jpg";
import microscopeLab from "@/assets/microscope-lab.jpg";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="About AJVS"
        description="Learn about the African Journal of Veterinary Sciences (AJVS) - our mission, scope, editorial policy, and commitment to advancing veterinary research across Africa. Published by the Faculty of Veterinary Medicine, University of Jos, Nigeria."
        canonicalUrl="https://africanjournalvetsci.org/about"
        keywords={["about AJVS", "journal mission", "veterinary research Africa", "editorial policy", "open access journal", "University of Jos"]}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" },
          { name: "About", url: "https://africanjournalvetsci.org/about" }
        ]}
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={cattleField}
              alt="African cattle grazing in field"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-background"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-white drop-shadow-lg">
              About AJVS
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">
              Advancing veterinary research and practice across Africa and beyond
            </p>
          </motion.div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {/* Mission Section with Image */}
            <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="glass rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  The African Journal of Veterinary Sciences (AJVS) is a premier open-access, peer-reviewed journal
                  published by the Faculty of Veterinary Medicine, University of Jos, Nigeria. Our mission is to
                  advance veterinary sciences by disseminating high-quality research that addresses the unique
                  challenges and opportunities in animal health, production, and welfare across the African continent
                  and globally.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-[300px] lg:h-full min-h-[280px] shadow-lg">
                <img
                  src={vetExamination}
                  alt="Veterinarian examining livestock"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>

            {/* Scope Section with Image */}
            <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-2xl overflow-hidden h-[300px] lg:h-full min-h-[280px] shadow-lg order-2 lg:order-1">
                <img
                  src={wildlifeAfrica}
                  alt="African wildlife - zebras in savanna"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="glass rounded-2xl p-8 md:p-10 order-1 lg:order-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold">Scope of the Journal</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  African Journal of Veterinary Sciences aims to promote the contributions of the veterinary
                  profession and biomedical sciences in the African continent to the global hub of scientific
                  knowledge.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Journal welcomes original research articles, reviews, case reports, short communications and
                  perspectives in fields including:
                </p>
                <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Anatomy & Genetics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Biochemistry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Surgery & Medicine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Parasitology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Wildlife Health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Public Health</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Editorial Policy with Image */}
            <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="glass rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold">Editorial Policy</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  African Journal of Veterinary Sciences has a distinguished Editorial Board made up of leading
                  professionals in the fields of veterinary and biomedical sciences from around the world. All
                  manuscripts submitted to AJVS are subjected to a double-blind peer review process.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Highest ethical standards in research publication</span>
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
                    <span>Adhering to COPE guidelines</span>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-[300px] lg:h-full min-h-[280px] shadow-lg">
                <img
                  src={microscopeLab}
                  alt="Scientific research with microscope"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>

            {/* Indexing Goals Card */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-serif font-bold mb-4">Indexing and Visibility</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    AJVS is committed to maximizing the visibility and impact of published research. We are actively
                    working toward indexing in major scientific databases.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 bg-primary/5 border border-primary/10 rounded-xl">
                      <h3 className="font-semibold mb-3 text-primary">Current Indexing</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Google Scholar</li>
                        <li>• ResearchGate</li>
                        <li>• African Journals Online (AJOL)</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-accent/5 border border-accent/10 rounded-xl">
                      <h3 className="font-semibold mb-3 text-accent">Target Indexing</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Scopus</li>
                        <li>• Web of Science</li>
                        <li>• DOAJ</li>
                        <li>• PubMed/MEDLINE</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* University Affiliation & Contact */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
              <div className="glass rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">Published By</h2>
                <p className="text-lg text-muted-foreground mb-2">Faculty of Veterinary Medicine</p>
                <p className="text-xl font-semibold text-primary">University of Jos, Nigeria</p>
                <p className="text-sm text-muted-foreground mt-4">
                  Established in 1975, one of Nigeria's leading institutions for veterinary education and research.
                </p>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-serif font-bold mb-4 text-center">Contact Us</h2>
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">Editorial Office:</p>
                  <div className="space-y-1 text-muted-foreground">
                    <p className="font-semibold">Faculty of Veterinary Medicine</p>
                    <p>University of Jos</p>
                    <p>PMB 2084, Jos, Plateau State</p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-primary">
                      <Globe className="w-4 h-4" />
                      <a href="mailto:ajvsc@unijos.edu.ng" className="hover:underline">
                        ajvsc@unijos.edu.ng
                      </a>
                    </div>
                    <p className="text-sm">Phone: +2348035907570</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
