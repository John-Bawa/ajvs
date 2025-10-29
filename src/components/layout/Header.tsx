import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Submit", href: "/submit" },
    { label: "Current Issue", href: "/current-issue" },
    { label: "Archives", href: "/archives" },
    { label: "Contact", href: "/contact" },
    { label: "News", href: "/news" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/20 backdrop-blur-md border-b border-border/20 shadow-glass">
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
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-banner-foreground/80 hover:text-banner-foreground bg-transparent hover:bg-banner-foreground/10">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-6 bg-background">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Link to="/about" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Overview of AJVS</div>
                          <p className="text-sm text-muted-foreground">Learn about our mission and vision</p>
                        </Link>
                        <Link to="/editorial-board" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Editorial Board</div>
                          <p className="text-sm text-muted-foreground">Meet our distinguished editors</p>
                        </Link>
                      </div>
                      <div className="space-y-1">
                        <Link to="/for-authors" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Author Guidelines</div>
                          <p className="text-sm text-muted-foreground">Submission requirements and tips</p>
                        </Link>
                        <Link to="/policies" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Publication Ethics</div>
                          <p className="text-sm text-muted-foreground">Our ethical standards</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-banner-foreground/80 hover:text-banner-foreground bg-transparent hover:bg-banner-foreground/10">
                  Manuscripts
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-6 bg-background">
                    <div className="space-y-1">
                      <Link to="/submit" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground group-hover:text-primary">Submit Manuscript</span>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">New</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Start your submission process</p>
                      </Link>
                      <Link to="/manuscripts" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Track Submission</div>
                        <p className="text-sm text-muted-foreground">Check your manuscript status</p>
                      </Link>
                      <Link to="/reviewer-dashboard" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Reviewer Login</div>
                        <p className="text-sm text-muted-foreground">Access peer review dashboard</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-banner-foreground/80 hover:text-banner-foreground bg-transparent hover:bg-banner-foreground/10">
                  Publications
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-6 bg-background">
                    <div className="space-y-1">
                      <Link to="/current-issue" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Current Issue</div>
                        <p className="text-sm text-muted-foreground">Latest published articles</p>
                      </Link>
                      <Link to="/archives" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Archives</div>
                        <p className="text-sm text-muted-foreground">Browse past publications</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-banner-foreground/80 hover:text-banner-foreground bg-transparent hover:bg-banner-foreground/10">
                  Contact
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-6 bg-background">
                    <div className="space-y-1">
                      <Link to="/contact" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Contact Information</div>
                        <p className="text-sm text-muted-foreground">Get in touch with our team</p>
                      </Link>
                      <Link to="/news" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">News & Announcements</div>
                        <p className="text-sm text-muted-foreground">Stay updated with latest news</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <Link to="/auth" className="hidden sm:block">
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                Sign In
              </Button>
            </Link>
            <Link to="/submit">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
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
