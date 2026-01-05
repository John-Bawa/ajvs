import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Mail } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setEmail("");
    toast.success("You've been subscribed to our newsletter!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-primary/10 via-accent/10 to-banner/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
          <Bell className="w-6 h-6 text-accent" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Get Latest Promotions, Updates & Alerts
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6">
          Stay updated with the latest research, calls for papers, and journal news.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            {isSubmitting ? "Subscribing..." : "Signup Now!"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
