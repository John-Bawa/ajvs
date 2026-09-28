import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import heroBuilding from "@/assets/hero-building.jpg";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}

/** Shared photographic page banner: faculty building under a navy overlay. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <img
        src={heroBuilding}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
      <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-xs font-medium text-primary-foreground/70">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span aria-current="page" className="text-primary-foreground">{title}</span>
        </nav>
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 border-l-2 border-accent pl-3 text-xs font-bold uppercase tracking-wider text-accent">{eyebrow}</p>
          )}
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">{description}</p>}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}
