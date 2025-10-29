import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error("Error signing out");
    }
  };

  const mobileNavSections = [
    {
      title: "About",
      links: [
        { label: "Overview of AJVS", href: "/about" },
        { label: "Editorial Board", href: "/editorial-board" },
        { label: "Author Guidelines", href: "/for-authors" },
        { label: "Publication Ethics", href: "/policies" },
      ],
    },
    {
      title: "Manuscripts",
      links: [
        { label: "Submit Manuscript", href: "/submit" },
        { label: "Track Submission", href: "/manuscripts" },
        { label: "Reviewer Login", href: "/reviews" },
      ],
    },
    {
      title: "Publications",
      links: [
        { label: "Current Issue", href: "/current-issue" },
        { label: "Archives", href: "/archives" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Contact Information", href: "/contact" },
        { label: "News & Announcements", href: "/news" },
      ],
    },
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
              <span className="text-foreground font-serif text-lg font-bold leading-tight">
                AJVS
              </span>
              <span className="text-foreground/70 text-xs hidden sm:block">
                African Journal of Veterinary Sciences
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
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
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
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
                       <Link to="/reviews" className="group block p-3 rounded-lg hover:bg-accent transition-smooth">
                         <div className="font-medium text-foreground mb-1 group-hover:text-primary">Reviewer Login</div>
                         <p className="text-sm text-muted-foreground">Access peer review dashboard</p>
                       </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
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
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
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
          <div className="flex items-center gap-2 ml-auto">
            {user ? (
              <>
                <Link to="/dashboard" className="hidden sm:inline-flex">
                  <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="hidden sm:inline-flex text-foreground/70 hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth" className="hidden sm:inline-flex">
                <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
            )}
            <Link to="/submit" className="hidden sm:inline-flex">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Submit Manuscript
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm" className="text-foreground">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <nav className="flex flex-col mt-8">
                  <Accordion type="multiple" className="w-full">
                    {mobileNavSections.map((section, index) => (
                      <AccordionItem key={section.title} value={`item-${index}`}>
                        <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider hover:text-primary">
                          {section.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2 pl-2">
                            {section.links.map((link) => (
                              <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-base hover:text-primary transition-smooth py-2"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="pt-4 mt-4 border-t border-border">
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="text-base font-medium hover:text-primary transition-smooth block py-2"
                        >
                          My Dashboard
                        </Link>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setIsOpen(false);
                            handleSignOut();
                          }}
                          className="w-full justify-start text-base font-medium hover:text-primary py-2 h-auto"
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Link
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="text-base font-medium hover:text-primary transition-smooth block py-2"
                      >
                        Sign In / Register
                      </Link>
                    )}
                  </div>
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
