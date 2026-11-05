import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}

/** Shared compact page header for inner pages: breadcrumb, section label, H1 and descriptor on a plain band. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="section-band border-b border-border">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-10">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent hover:underline">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span aria-current="page" className="text-foreground">{title}</span>
        </nav>
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
          )}
          <h1 className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-base text-muted-foreground">{description}</p>}
          {children && <div className="mt-5">{children}</div>}
        </div>
      </div>
    </section>
  );
}
