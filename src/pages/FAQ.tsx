import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Upload,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Shield,
  Scale,
  Quote,
  Mail,
} from "lucide-react";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { SEOHead } from "./SEOHead";

const faqs = [
  {
    id: "1",
    icon: BookOpen,
    question: "What is AJVS?",
    answer:
      "The African Journal of Veterinary Sciences (AJVS) is a peer-reviewed, international, and open-access journal published by the Faculty of Veterinary Medicine, University of Jos, Nigeria.\n\nAJVS publishes original research articles, reviews, short communications, and case reports covering all aspects of veterinary, biomedical, and animal sciences.\n\n🔗 Visit: https://ajvs-unijos.org",
  },
  {
    id: "2",
    icon: BookOpen,
    question: "What is the scope of the journal?",
    answer:
      "AJVS welcomes manuscripts in areas including:\n\n• Veterinary anatomy, physiology, and biochemistry\n• Animal breeding and genetics\n• Pathology, microbiology, and parasitology\n• Pharmacology and toxicology\n• Public health, preventive medicine, and epidemiology\n• Wildlife health and conservation\n• Livestock production, health, and management",
  },
  {
    id: "3",
    icon: Upload,
    question: "How can I submit my manuscript?",
    answer:
      "Manuscripts should be submitted via the online submission portal on the journal website:\n👉 https://ajvs-unijos.org/submissions\n\nor by email to editor@africanjournalvetsci.org (or ajvsc@unijos.edu.ng)\n\nEnsure you include:\n• A cover letter addressed to the Editor-in-Chief\n• Declaration and copyright transfer form (available on the site)\n• Main manuscript file (Microsoft Word)\n• Figures and tables properly labeled and captioned",
  },
  {
    id: "4",
    icon: FileText,
    question: "What types of manuscripts are accepted?",
    answer:
      "AJVS accepts:\n\n• Original Research Articles\n• Review Articles\n• Case Reports\n• Short Communications\n• Letters to the Editor",
  },
  {
    id: "5",
    icon: Calendar,
    question: "How often is the journal published?",
    answer:
      'AJVS publishes two issues per year — June and December.\n\nAccepted papers are posted online as "Articles in Press" ahead of the next issue.',
  },
  {
    id: "6",
    icon: Users,
    question: "How does the peer-review process work?",
    answer:
      "All manuscripts undergo double-blind peer review by at least two qualified reviewers.\n\nThe process typically takes 3–6 weeks.\n\nFinal decisions are based on scientific quality, originality, and reviewer recommendations.",
  },
  {
    id: "7",
    icon: Scale,
    question: "What ethical standards are required?",
    answer:
      "AJVS follows COPE (Committee on Publication Ethics) guidelines.\n\nAuthors must:\n• Obtain ethical clearance for animal or human studies\n• Avoid plagiarism, duplicate publication, and data falsification\n• Clearly state any conflicts of interest\n• Provide proof of ethical approval number in the Methods section",
  },
  {
    id: "8",
    icon: DollarSign,
    question: "Are there publication or processing fees?",
    answer:
      "Yes.\n\n• Processing fee: ₦5,000 (or USD $30) — before peer review\n• Page charge: ₦7,000 (or USD $35) per page upon acceptance\n\n💳 Payment details:\nAccess Bank Plc\nAccount Name: African Journal of Veterinary Sciences\nAccount Number: 1931486112",
  },
  {
    id: "9",
    icon: Shield,
    question: "What is the open access policy?",
    answer:
      "All AJVS articles are published under the Creative Commons Attribution License (CC BY), allowing free use, distribution, and citation with proper acknowledgment.\n\n🔗 https://ajvs-unijos.org/open-access-policy",
  },
  {
    id: "10",
    icon: Users,
    question: "Who are the editors and reviewers?",
    answer:
      "The Editorial Board is led by Prof. Dzikwi Emmena Asabe (Editor-in-Chief), with editors and reviewers from Nigeria, Uganda, Somalia, Côte d'Ivoire, the United States, and the United Kingdom.\n\n📋 View the full editorial board: https://ajvs-unijos.org/editorial-board",
  },
];

const FAQ = () => {
  // Format FAQ items for structured data
  const faqItemsForSchema = faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer.replace(/\n/g, ' ').replace(/[•🔗👉📋💳]/g, '').trim()
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-muted/20">
      <SEOHead
        title="Frequently Asked Questions"
        description="Find answers to common questions about the African Journal of Veterinary Sciences (AJVS). Learn about manuscript submission, peer review process, publication fees, open access policy, and more."
        canonicalUrl="https://africanjournalvetsci.org/faq"
        keywords={["FAQ", "frequently asked questions", "manuscript submission", "peer review", "publication fees", "open access", "AJVS help"]}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" },
          { name: "FAQ", url: "https://africanjournalvetsci.org/faq" }
        ]}
        faqItems={faqItemsForSchema}
      />
      <TopBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Help Center</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Frequently Asked Questions
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about the African Journal of Veterinary Sciences
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => {
                const Icon = faq.icon;
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <AccordionItem
                      value={faq.id}
                      className="border rounded-lg bg-card shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                        <div className="flex items-start gap-4 text-left w-full">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                          </div>
                          <span className="font-semibold text-base md:text-lg leading-relaxed pr-4">
                            {faq.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-0">
                        <div className="pl-14 text-muted-foreground leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-8 rounded-xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border border-primary/10 text-center"
          >
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our editorial team is here to help you with any inquiries
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:editor@africanjournalvetsci.org"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Editorial Office
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Visit Contact Page
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FAQ;
