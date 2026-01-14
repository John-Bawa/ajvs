import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import researchLabImg from "@/assets/research-lab.jpg";
import veterinaryMedicineImg from "@/assets/veterinary-medicine.jpg";
import dataAnalysisImg from "@/assets/data-analysis.jpg";

const issueYears = [2025, 2024];

const recentArticles = [
  {
    id: 1,
    title: "Antimicrobial Resistance Patterns in Livestock",
    image: researchLabImg,
    link: "/archives",
  },
  {
    id: 2,
    title: "Zoonotic Disease Surveillance Methods",
    image: veterinaryMedicineImg,
    link: "/archives",
  },
];

export function PreviousIssuesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
            Previous Issues
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Link to="/archives">
              <Button variant="link" className="text-primary">
                View All
              </Button>
            </Link>
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Years List with Academic Icon */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Browse by Year</span>
            </div>
            {issueYears.map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={`/archives?year=${year}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
                >
                  <span className="text-primary">•</span>
                  <span className="font-medium">Issues From:</span>
                  <span className="text-primary group-hover:underline">{year}</span>
                </Link>
              </motion.div>
            ))}
            
            {/* Small Research Image */}
            <motion.div 
              className="mt-6 hidden md:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={dataAnalysisImg} 
                  alt="Research data visualization" 
                  className="w-full h-24 object-cover opacity-80"
                />
              </div>
            </motion.div>
          </div>

          {/* Featured Articles */}
          {recentArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <Link to={article.link} className="flex gap-4">
                {/* Image */}
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center">
                  {/* Title */}
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
