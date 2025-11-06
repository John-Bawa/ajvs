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
      icon: Send,
      links: [
        { label: "Submit Manuscript", href: "/submit", icon: Send },
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
              <Link to="/" className="px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10 rounded-md transition-smooth inline-flex items-center">
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-6 bg-background border border-border/50 shadow-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Link to="/about" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">About AJVS</div>
                          <p className="text-sm text-muted-foreground">Our mission and vision</p>
                        </Link>
                        <Link to="/editorial-board" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Editorial Board</div>
                          <p className="text-sm text-muted-foreground">Distinguished editors</p>
                        </Link>
                      </div>
                      <div className="space-y-1">
                        <Link to="/policies" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">Policies & Ethics</div>
                          <p className="text-sm text-muted-foreground">Publication standards</p>
                        </Link>
                        <Link to="/faq" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary">FAQ</div>
                          <p className="text-sm text-muted-foreground">Common questions</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
                  Publications
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-6 bg-background border border-border/50 shadow-lg">
                    <div className="space-y-1">
                      <Link to="/current-issue" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Current Issue</div>
                        <p className="text-sm text-muted-foreground">Browse the latest articles</p>
                      </Link>
                      <Link to="/archives" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Archives</div>
                        <p className="text-sm text-muted-foreground">Explore past issues</p>
                      </Link>
                      <Link to="/news" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Announcements</div>
                        <p className="text-sm text-muted-foreground">Latest news and updates</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
                  Submissions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-6 bg-background border border-border/50 shadow-lg">
                    <div className="space-y-1">
                      <Link to="/submit" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Submit Manuscript</div>
                        <p className="text-sm text-muted-foreground">Start your submission</p>
                      </Link>
                      <Link to="/manuscripts" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Author Dashboard</div>
                        <p className="text-sm text-muted-foreground">Track your submissions</p>
                      </Link>
                      <Link to="/reviews" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Reviewer Dashboard</div>
                        <p className="text-sm text-muted-foreground">Review assignments</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/10">
                  Contact & Help
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-6 bg-background border border-border/50 shadow-lg">
                    <div className="space-y-1">
                      <Link to="/contact" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">Contact Us</div>
                        <p className="text-sm text-muted-foreground">Get in touch with us</p>
                      </Link>
                      <Link to="/faq" className="group block p-3 rounded-lg hover:bg-primary/15 backdrop-blur-md border border-transparent hover:border-primary/20 transition-smooth">
                        <div className="font-medium text-foreground mb-1 group-hover:text-primary">FAQ</div>
                        <p className="text-sm text-muted-foreground">Common questions</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!user && (
              <>
                <a href={getOJSLink('LOGIN')} className="hidden md:inline-flex">
                  <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                    Login
                  </Button>
                </a>
                <a href={getOJSLink('REGISTER')} className="hidden md:inline-flex">
                  <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Register
                  </Button>
                </a>
              </>
            )}

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
                                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
                  {!user && (
                    <motion.div
                      className="p-6 border-t border-border/50 bg-gradient-accent space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <a
                        href={getOJSLink('LOGIN')}
                        className="block"
                      >
                        <Button 
                          variant="outline" 
                          className="w-full border-primary/30 text-primary hover:bg-primary/10"
                          size="lg"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Login
                        </Button>
                      </a>
                      <a
                        href={getOJSLink('REGISTER')}
                        className="block"
                      >
                        <Button 
                          variant="default" 
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          size="lg"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Register
                        </Button>
                      </a>
                    </motion.div>
                  )}
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
