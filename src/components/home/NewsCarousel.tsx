import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import news1Img from "@/assets/news-1.jpg";
import news2Img from "@/assets/news-2.jpg";
import news3Img from "@/assets/news-3.jpg";

const newsItems = [
  {
    id: 1,
    title: "New Guidelines for Manuscript Submission Released",
    excerpt: "We have updated our author guidelines to streamline the submission process and improve manuscript quality...",
    date: "January 3, 2026",
    image: news1Img,
    link: "/news",
  },
  {
    id: 2,
    title: "Call for Papers: Special Issue on Zoonotic Diseases",
    excerpt: "AJVS is accepting submissions for our upcoming special issue focusing on emerging zoonotic diseases in Africa...",
    date: "December 28, 2025",
    image: news2Img,
    link: "/news",
  },
  {
    id: 3,
    title: "AJVS Partners with African Veterinary Associations",
    excerpt: "We are pleased to announce new partnerships with veterinary associations across the continent to expand our reach...",
    date: "December 15, 2025",
    image: news3Img,
    link: "/news",
  },
];

export function NewsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 3;

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < Math.min(itemsToShow, newsItems.length); i++) {
      items.push(newsItems[(startIndex + i) % newsItems.length]);
    }
    return items;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2">
              What's Hot In News
            </h2>
            <p className="text-muted-foreground">
              Latest updates and announcements from AJVS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Link to="/news">
              <Button variant="link" className="text-primary">
                View All
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full h-10 w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {getVisibleItems().map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <Link to={item.link} className="block">
                {/* Image */}
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.excerpt}
                </p>

                {/* Read More */}
                <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
