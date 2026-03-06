import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SEOHead } from "./SEOHead";
import { Code, Database, Layout, Monitor, Server, Settings, User } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import johnBawaImg from "@/assets/john-bawa.jpg";

const systemInfo = [
  { item: "Platform", description: "African Journal of Veterinary Science Website & Journal Management System" },
  { item: "System Type", description: "Academic Journal Management Platform" },
  { item: "Version", description: "1.0" },
  { item: "Development Year", description: "2026" },
  { item: "Core Functions", description: "Manuscript submission, editorial workflow, peer review coordination, research publication" },
];

const roles = [
  { icon: Layout, text: "Website architecture design" },
  { icon: Monitor, text: "Journal platform interface design" },
  { icon: Database, text: "Database structure and system workflow design" },
  { icon: Server, text: "Development of manuscript submission framework" },
  { icon: Settings, text: "Digital platform optimization" },
  { icon: Code, text: "Data management integration" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const SystemCredits = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <SEOHead
        title="System Credits — AJVS"
        description="Platform development credits for the African Journal of Veterinary Sciences digital infrastructure. Lead developer: John Dauda Bawa."
        canonicalUrl="https://africanjournalvetsci.org/system-credits"
        keywords={["system credits", "platform developer", "AJVS developer", "John Dauda Bawa"]}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" },
          { name: "System Credits", url: "https://africanjournalvetsci.org/system-credits" },
        ]}
      />
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              System Credits
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Platform development & technical attribution
            </p>
          </motion.div>

          {/* Section 1 — Platform Overview */}
          <motion.section
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-xl font-serif font-semibold text-foreground mb-4 border-b border-border pb-2">
              Platform Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The African Journal of Veterinary Science digital platform was designed to support academic publishing,
              manuscript submission, peer review coordination, editorial workflows, and research dissemination.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              The system integrates modern web technologies to ensure efficiency in journal operations, improve
              accessibility for researchers, and support transparent academic publishing processes.
            </p>
          </motion.section>

          {/* Section 2 — System Information */}
          <motion.section
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-xl font-serif font-semibold text-foreground mb-4 border-b border-border pb-2">
              System Information
            </h2>
            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-3 px-4 font-semibold text-foreground w-1/3">Item</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemInfo.map((row, i) => (
                      <tr key={i} className="border-b last:border-b-0 border-border">
                        <td className="py-3 px-4 font-medium text-foreground">{row.item}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.section>

          {/* Section 3 — Lead Platform Developer */}
          <motion.section
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-xl font-serif font-semibold text-foreground mb-6 border-b border-border pb-2">
              Lead Platform Developer
            </h2>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Profile Card */}
                  <div className="md:w-72 bg-primary text-primary-foreground p-8 flex flex-col items-center text-center shrink-0">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-primary-foreground/20 mb-5">
                      <img
                        src={johnBawaImg}
                        alt="John Dauda Bawa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-serif font-bold">John Dauda Bawa</h3>
                    <p className="text-primary-foreground/70 text-sm mt-1">
                      Web Developer · Web Designer · Data Analyst
                    </p>
                    <span className="mt-4 inline-block text-xs uppercase tracking-wider bg-primary-foreground/10 px-3 py-1 rounded-full">
                      Lead Platform Developer
                    </span>
                    <span className="text-primary-foreground/60 text-xs mt-2">
                      African Journal of Veterinary Science
                    </span>
                  </div>

                  {/* Bio */}
                  <div className="p-6 md:p-8 flex-1">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      John Dauda Bawa is a web developer, designer, and data analyst with experience in building digital
                      platforms for research institutions, academic systems, and data-driven projects.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      His work focuses on developing web-based management systems that support research coordination,
                      digital workflows, and institutional platforms. He has experience in data analysis, systems
                      architecture, and digital platform design aimed at improving efficiency and accessibility in
                      research and organizational environments.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Within the African Journal of Veterinary Science platform, he led the design and development of the
                      digital infrastructure supporting journal operations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Section 4 — Development Role */}
          <motion.section
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-xl font-serif font-semibold text-foreground mb-4 border-b border-border pb-2">
              Development Role
            </h2>
            <p className="text-muted-foreground mb-5">Role in the platform development included:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {roles.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                  <Icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 5 — Development Philosophy */}
          <motion.section
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-xl font-serif font-semibold text-foreground mb-4 border-b border-border pb-2">
              Development Philosophy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The platform was designed with emphasis on usability, transparency in academic publishing, and scalable
              digital infrastructure. The goal was to create a system that simplifies editorial workflows while
              maintaining professional standards expected of modern research journals.
            </p>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SystemCredits;
