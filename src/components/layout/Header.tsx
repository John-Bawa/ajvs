import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, Home, Info, FileText, BookOpen, Mail, User, Send, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ajvsLogo from "@/assets/ajvs-logo-enhanced.png";
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
  const { pathname } = useLocation();

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
        { label: "News & Blog", href: "/blog", icon: Info },
      ],
    },
    {
      title: "Submissions",
      icon: Send,
      links: [
        { label: "Author Portal", href: "/author-portal", icon: Send },
        { label: "Submit Manuscript", href: "/submit", icon: Send },
        { label: "Author Guidelines", href: "/for-authors", icon: FileText },
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

  const triggerCls =
    "h-16 rounded-none bg-transparent px-3 text-sm font-semibold text-foreground/85 hover:bg-transparent hover:text-primary focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-primary border-b-2 border-transparent data-[state=open]:border-accent";
  const menuLink = "group block rounded-sm border-l-2 border-transparent px-3 py-2.5 transition-smooth hover:border-accent hover:bg-secondary/60";
  const MenuItem = ({ to, title, text }: { to: string; title: string; text: string }) => (
    <Link to={to} className={menuLink}>
      <div className="text-sm font-semibold text-foreground group-hover:text-primary">{title}</div>
      <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
    </Link>
  );
  const Panel = ({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) => (
    <div className={`${wide ? "w-[520px]" : "w-[340px]"} border-t-2 border-accent bg-background p-4 shadow-lg`}>
      <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className={wide ? "grid grid-cols-2 gap-1" : "space-y-1"}>{children}</div>
    </div>
  );

  return (
    <header className="relative z-40 w-full">
      {/* Utility strip */}
      <div className="bg-banner text-banner-foreground">
        <div className="container mx-auto flex h-9 items-center justify-between gap-4 px-4 text-xs sm:px-6">
          <div className="flex min-w-0 items-center gap-4 text-banner-foreground/75">
            <span className="truncate">Faculty of Veterinary Medicine, University of Jos</span>
            <span className="hidden md:inline">e-ISSN 3043-4246</span>
            <span className="hidden md:inline">Open Access</span>
          </div>
          <div className="flex shrink-0 items-center gap-4 font-medium">
            <Link to="/author-portal" className="hidden hover:text-accent sm:inline">For Authors</Link>
            <Link to="/policies" className="hidden hover:text-accent sm:inline">For Reviewers</Link>
            {!user && <a href={getOJSLink("LOGIN")} className="hover:text-accent">Login</a>}
            {!user && <a href={getOJSLink("REGISTER")} className="hover:text-accent">Register</a>}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex min-w-0 items-center gap-3 group">
            <img src={ajvsLogo} alt="AJVS Logo" className="h-11 w-11 shrink-0 object-contain lg:h-14 lg:w-14" />
            <div className="flex min-w-0 flex-col border-l border-border pl-3">
              <span className="font-serif text-xl font-semibold leading-none text-primary lg:text-2xl">AJVS</span>
              <span className="mt-1 truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                African Journal of Veterinary Sciences
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <Link to="/" className={`${triggerCls} inline-flex items-center ${pathname === "/" ? "border-accent text-primary" : ""}`}>Home</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Panel label="The journal" wide>
                    <MenuItem to="/about" title="About AJVS" text="Aims, scope, and mission" />
                    <MenuItem to="/editorial-board" title="Editorial Board" text="Editors and advisors" />
                    <MenuItem to="/policies" title="Policies & Ethics" text="Publication standards" />
                    <MenuItem to="/faq" title="FAQ" text="Common questions" />
                  </Panel>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>Publications</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Panel label="Read" wide>
                    <MenuItem to="/current-issue" title="Current Issue" text="The latest articles" />
                    <MenuItem to="/archives" title="Archives" text="Search all published work" />
                    <MenuItem to="/blog" title="News & Blog" text="Updates and insights" />
                    <MenuItem to="/blog?type=announcement" title="Announcements" text="Official journal notices" />
                  </Panel>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>Submissions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Panel label="Publish with us">
                    <MenuItem to="/author-portal" title="Author Portal" text="Steps, checklist & submission" />
                    <MenuItem to="/submit" title="Submit Manuscript" text="Start your submission" />
                    <MenuItem to="/for-authors" title="Author Guidelines" text="Preparation requirements" />
                    <MenuItem to="/call-for-papers" title="Call for Papers" text="Current call and fees" />
                  </Panel>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>Contact & Help</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Panel label="Get in touch">
                    <MenuItem to="/contact" title="Contact Us" text="Reach the editorial office" />
                    <MenuItem to="/faq" title="FAQ" text="Common questions" />
                  </Panel>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 md:inline-flex">
              <a href={getOJSLink("SUBMIT_MANUSCRIPT")} target="_blank" rel="noopener noreferrer"><Send /> Submit</a>
            </Button>

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
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img src={ajvsLogo} alt="AJVS" className="w-12 h-12 object-contain drop-shadow-lg" />
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
                      <Button 
                        variant="outline" 
                        className="w-full border-primary/30 text-primary hover:bg-primary/10"
                        size="lg"
                        onClick={() => {
                          setIsOpen(false);
                          window.location.href = getOJSLink('LOGIN');
                        }}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                      <Button 
                        variant="default" 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        size="lg"
                        onClick={() => {
                          setIsOpen(false);
                          window.location.href = getOJSLink('REGISTER');
                        }}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Register
                      </Button>
                    </motion.div>
                  )}
                </motion.nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
