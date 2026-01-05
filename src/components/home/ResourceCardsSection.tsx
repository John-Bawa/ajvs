import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import publishingTipsImg from "@/assets/publishing-tips.jpg";
import peerReviewImg from "@/assets/peer-review.jpg";
import veterinaryLabImg from "@/assets/veterinary-lab.jpg";
import archivesImg from "@/assets/archives.jpg";

const resources = [
  {
    title: "Publishing Tips",
    description: "Explore our guidelines, templates, and best practices to learn more about the academic publishing process.",
    image: publishingTipsImg,
    link: "/for-authors",
    linkText: "Explore the hub",
  },
  {
    title: "Peer Review Process",
    description: "Learn about our rigorous peer review system and how we ensure the quality and integrity of published research.",
    image: peerReviewImg,
    link: "/policies",
    linkText: "Read the process",
  },
  {
    title: "Research Articles",
    description: "Browse our collection of high-quality research in veterinary medicine, animal health, and biomedical sciences.",
    image: veterinaryLabImg,
    link: "/current-issue",
    linkText: "View articles",
  },
  {
    title: "Journal Archives",
    description: "Access our complete archive of published articles, safeguarding scholarship of the past to serve researchers of today.",
    image: archivesImg,
    link: "/archives",
    linkText: "Browse archives",
  },
];

export function ResourceCardsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <Link to={resource.link} className="block">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {resource.description}
                </p>
                <span className="text-sm font-medium text-primary hover:underline">
                  {resource.linkText}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
