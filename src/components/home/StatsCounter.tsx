import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Users, Globe, FileText } from "lucide-react";

interface StatItem {
  icon: typeof BookOpen;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: BookOpen, value: 2, suffix: "", label: "Volumes Published" },
  { icon: FileText, value: 50, suffix: "+", label: "Articles Reviewed" },
  { icon: Users, value: 30, suffix: "+", label: "Editorial Board Members" },
  { icon: Globe, value: 10, suffix: "+", label: "Countries Represented" },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tabular-nums">
      {count}{suffix}
    </span>
  );
}

export const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 bg-secondary/30 border-y border-border/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="text-sm text-muted-foreground mt-1.5 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
