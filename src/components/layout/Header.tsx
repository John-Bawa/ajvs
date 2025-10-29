import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Current Issue", href: "/current-issue" },
    { label: "Archives", href: "/archives" },
    { label: "About", href: "/about" },
    { label: "For Authors", href: "/for-authors" },
    { label: "Editorial Board", href: "/editorial-board" },
    { label: "Policies", href: "/policies" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-banner/95 backdrop-blur-sm border-b border-banner-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-smooth group-hover:scale-105">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-banner-foreground font-serif text-lg font-bold leading-tight">
                AJVS
              </span>
              <span className="text-banner-foreground/70 text-xs hidden sm:block">
                African Journal of Veterinary Sciences
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-sm text-banner-foreground/80 hover:text-banner-foreground transition-smooth rounded-md hover:bg-banner-foreground/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <Link to="/auth" className="hidden sm:block">
              <Button variant="outline" size="sm" className="border-banner-foreground/20 text-banner-foreground hover:bg-banner-foreground/10">
                Sign In
              </Button>
            </Link>
            <Link to="/submit">
              <Button size="sm" className="bg-primary hover:bg-primary-hover">
                Submit Manuscript
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm" className="text-banner-foreground">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-smooth"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-smooth"
                  >
                    Sign In
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
