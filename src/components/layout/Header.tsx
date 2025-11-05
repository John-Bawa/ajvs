import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, Home, Info, FileText, BookOpen, Mail, User, Send, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ajvsLogo from "@/assets/ajvs-logo.png";
import { getOJSLink } from "@/config/ojs";
import { motion, AnimatePresence } from "framer-motion";
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
import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const mobileNavSections = [
    {
      title: "About",
      icon: Info,
      links: [
        { label: "Overview of AJVS", href: "/about", icon: Home },
        { label: "Editorial Board", href: "/editorial-board", icon: User },
        { label: "Author Guidelines", href: "/for-authors", icon: FileText },
        { label: "Publication Ethics", href: "/policies", icon: BookOpen },
      ],
    },
    {
      title: "Publications",
      icon: BookOpen,
      links: [
        { label: "Current Issue", href: "/current-issue", icon: BookOpen },
        { label: "Archives", href: "/archives", icon: FileText },
        { label: "Announcements", href: "/news", icon: Info },
      ],
    },
    {
      title: "Submissions",
      icon: FileText,
      links: [
        { label: "Submit Manuscript", href: "/submit", icon: Send, badge: "New" },
        { label: "Author Dashboard", href: "/manuscripts", icon: FileText },
        { label: "Reviewer Dashboard", href: "/reviews", icon: User },
      ],
    },
    {
      title: "Contact & Help",
      icon: Mail,
      links: [
        { label: "Contact Us", href: "/contact", icon: Mail },
        { label: "FAQ", href: "/faq", icon: HelpCircle },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/20 backdrop-blur-md border-b border-border/20 shadow-glass">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-smooth group-hover:scale-105 shadow-md">
              <img src={ajvsLogo} alt="AJVS Logo" className="w-10 h-10 object-contain" />
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
                <Link to="/" className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10 rounded-md transition-smooth inline-flex items-center">
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-6 bg-background">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Link to="/about" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Overview of AJVS</div>
                          <p className="text-sm text-muted-foreground">Learn about our mission and vision</p>
                        </Link>
                        <Link to="/editorial-board" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Editorial Board</div>
                          <p className="text-sm text-muted-foreground">Meet our distinguished editors</p>
                        </Link>
                      </div>
                      <div className="space-y-1">
                        <Link to="/for-authors" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Author Guidelines</div>
                          <p className="text-sm text-muted-foreground">Submission requirements and tips</p>
                        </Link>
                        <Link to="/policies" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Publication Ethics</div>
                          <p className="text-sm text-muted-foreground">Our ethical standards</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/current-issue" className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10 rounded-md transition-smooth inline-flex items-center">
                  Current Issue
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/archives" className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10 rounded-md transition-smooth inline-flex items-center">
                  Archive
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/news" className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10 rounded-md transition-smooth inline-flex items-center">
                  Announcements
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
                  Submissions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-6 bg-background">
                    <div className="space-y-1">
                      <Link to="/submit" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground group-hover:text-primary">Submit Manuscript</span>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">New</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Start your submission process</p>
                      </Link>
                       <Link to="/manuscripts" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                         <div className="font-medium text-foreground mb-1 group-hover:text-primary">Author Dashboard</div>
                         <p className="text-sm text-muted-foreground">Track your manuscript status</p>
                       </Link>
                       <Link to="/reviews" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                         <div className="font-medium text-foreground mb-1 group-hover:text-primary">Reviewer Dashboard</div>
                         <p className="text-sm text-muted-foreground">Access peer review assignments</p>
                       </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact" className="px-4 py-2 text-sm text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10 rounded-md transition-smooth inline-flex items-center">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!user && (
              <Link to="/auth" className="hidden md:inline-flex">
                <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                  Login / Register
                </Button>
              </Link>
            )}
            <Link to="/submit" className="hidden md:inline-flex">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Submit
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-foreground hover:bg-primary/10 relative overflow-hidden group"
                >
                  <AnimatePresence mode="wait">
                    {!isOpen ? (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[85vw] sm:w-[400px] overflow-y-auto bg-background/95 backdrop-blur-xl border-l border-border/50 p-0"
              >
                <motion.nav 
                  className="flex flex-col h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header with Logo */}
                  <div className="p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-cyan flex items-center justify-center shadow-lg">
                        <img src={ajvsLogo} alt="AJVS" className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <h2 className="font-serif text-lg font-bold text-foreground">AJVS</h2>
                        <p className="text-xs text-muted-foreground">Navigation Menu</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Sections */}
                  <div className="flex-1 overflow-y-auto py-4">
                    <Accordion type="multiple" className="w-full px-4 space-y-2">
                      {mobileNavSections.map((section, sectionIndex) => (
                        <motion.div
                          key={section.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: sectionIndex * 0.1, duration: 0.3 }}
                        >
                          <AccordionItem 
                            value={`item-${sectionIndex}`}
                            className="border-none"
                          >
                            <AccordionTrigger className="group hover:no-underline rounded-lg px-4 py-3 hover:bg-primary/5 transition-all duration-200 data-[state=open]:bg-primary/10">
                              <div className="flex items-center gap-3 w-full">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
                                  <section.icon className="w-5 h-5" />
                                </div>
                                <span className="text-base font-semibold text-foreground group-hover:text-primary group-data-[state=open]:text-primary">
                                  {section.title}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-0">
                              <motion.div 
                                className="flex flex-col gap-1 ml-4 pl-6 border-l-2 border-primary/20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {section.links.map((link, linkIndex) => (
                                  <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: linkIndex * 0.05 }}
                                  >
                                    <Link
                                      to={link.href}
                                      onClick={() => setIsOpen(false)}
                                      className="group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
                                    >
                                      <div className="flex items-center gap-3">
                                        <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <span className="text-sm text-foreground/80 group-hover:text-primary group-hover:font-medium transition-all">
                                          {link.label}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {link.badge && (
                                          <Badge 
                                            variant="secondary" 
                                            className="bg-primary/10 text-primary text-xs px-2 py-0.5"
                                          >
                                            {link.badge}
                                          </Badge>
                                        )}
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  </div>

                  {/* Footer Actions */}
                  <motion.div 
                    className="p-6 border-t border-border/50 space-y-3 bg-gradient-accent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <Link
                      to="/submit"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <Button 
                        className="w-full bg-gradient-cyan text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        size="lg"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Manuscript
                      </Button>
                    </Link>
                    {!user && (
                      <Link
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="block"
                      >
                        <Button 
                          variant="outline" 
                          className="w-full border-primary/30 text-primary hover:bg-primary/10"
                          size="lg"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Sign In / Register
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                </motion.nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
