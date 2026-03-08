import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const routeLabels: Record<string, string> = {
  "/about": "About",
  "/current-issue": "Current Issue",
  "/archives": "Archives",
  "/for-authors": "Author Guidelines",
  "/policies": "Policies & Ethics",
  "/editorial-board": "Editorial Board",
  "/contact": "Contact",
  "/news": "News & Blog",
  "/faq": "FAQ",
  "/call-for-papers": "Call for Papers",
  "/system-credits": "System Credits",
  "/submit": "Submit Manuscript",
  "/auth": "Sign In",
  "/blog": "Blog & News",
  "/admin/blog": "Blog Management",
  "/admin/blog/editor": "Blog Editor",
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const location = useLocation();

  const breadcrumbs: BreadcrumbItem[] = items || [
    { label: routeLabels[location.pathname] || "Page" },
  ];

  return (
    <nav aria-label="Breadcrumb" className="bg-secondary/40 border-b border-border/30">
      <div className="container mx-auto px-4 sm:px-6">
        <ol className="flex items-center gap-1.5 py-3 text-sm text-muted-foreground overflow-x-auto">
          <li className="flex items-center gap-1.5 flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-primary transition-smooth"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          {breadcrumbs.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5 flex-shrink-0">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              {item.href ? (
                <Link
                  to={item.href}
                  className="hover:text-primary transition-smooth"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium truncate max-w-[200px]">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
