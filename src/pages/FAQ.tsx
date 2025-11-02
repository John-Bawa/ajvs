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

const faqs = [
  {
    id: "1",
    icon: BookOpen,
    question: "What is AJVS?",
    answer:
      "The African Journal of Veterinary Sciences (AJVS) is a peer-reviewed, open-access journal published by the Faculty of Veterinary Medicine, University of Jos, Nigeria. It publishes high-quality research in veterinary, biomedical, and animal sciences.",
  },
  {
    id: "2",
    icon: Upload,
    question: "How can I submit a manuscript?",
    answer:
      "Authors can submit manuscripts through the journal's online submission portal at https://ajvs-unijos.org/submissions or via email at ajvsc@unijos.edu.ng. Please ensure the manuscript follows the Author Guidelines before submission.",
  },
  {
    id: "3",
    icon: FileText,
    question: "What types of manuscripts are accepted?",
    answer:
      "AJVS accepts Original Research Articles, Review Articles, Case Reports, Short Communications, and Letters to the Editor.",
  },
  {
    id: "4",
    icon: Calendar,
    question: "How often is AJVS published?",
    answer:
      'The journal publishes two issues per year — June and December. Accepted papers may appear online early as "Articles in Press."',
  },
  {
    id: "5",
    icon: Users,
    question: "What is the peer-review process?",
    answer:
      "All manuscripts undergo a double-blind peer-review process involving at least two reviewers. Decisions are made based on reviewer recommendations and editorial assessment.",
  },
  {
    id: "6",
    icon: DollarSign,
    question: "Are there any publication fees?",
    answer:
      "Yes. There is a ₦5,000 (or USD $30) processing fee and a ₦7,000 (or USD $35) page charge for accepted articles.",
  },
  {
    id: "7",
    icon: Shield,
    question: "Does AJVS check for plagiarism?",
    answer:
      "Yes. All submissions are screened using plagiarism detection software. Manuscripts with similarity above 15% may be returned for correction or rejected.",
  },
  {
    id: "8",
    icon: Scale,
    question: "What ethical standards does AJVS follow?",
    answer:
      "AJVS adheres to COPE ethical guidelines. Studies involving animals or humans must include ethical approval from a recognized committee.",
  },
  {
    id: "9",
    icon: Quote,
    question: "What referencing style should I use?",
    answer:
      "References should follow the APA 5th edition style. Example: Pam, A. A. (2023). Title of the article. Journal Name, 15(2), 45–60.",
  },
  {
    id: "10",
    icon: Mail,
    question: "How can I contact the editorial office?",
    answer:
      "Editorial Office, Faculty of Veterinary Medicine, University of Jos, Plateau State, Nigeria.\nEmail: ajvsc@unijos.edu.ng\nWebsite: https://ajvs-unijos.org/contact",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20">
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
                href="mailto:ajvsc@unijos.edu.ng"
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
    </div>
  );
};

export default FAQ;
