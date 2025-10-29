import { Link } from "react-router-dom";
import { BookOpen, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-banner text-banner-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-banner-foreground font-serif text-lg font-bold">AJVS</span>
              </div>
            </div>
            <p className="text-banner-foreground/70 text-sm leading-relaxed">
              A premier open-access journal dedicated to advancing veterinary sciences across Africa and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-banner-foreground/70 hover:text-primary transition-smooth">
                  About AJVS
                </Link>
              </li>
              <li>
                <Link to="/for-authors" className="text-banner-foreground/70 hover:text-primary transition-smooth">
                  For Authors
                </Link>
              </li>
              <li>
                <Link to="/editorial-board" className="text-banner-foreground/70 hover:text-primary transition-smooth">
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link to="/archives" className="text-banner-foreground/70 hover:text-primary transition-smooth">
                  Archives
                </Link>
              </li>
            </ul>
          </div>

          {/* For Authors */}
          <div>
            <h3 className="font-semibold mb-4">For Authors</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/submit" className="text-banner-foreground/70 hover:text-primary transition-smooth">
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link to="/author-guidelines" className="text-banner-foreground/70 hover:text-primary transition-smooth">
                  Author Guidelines
                </Link>
              </li>
              <li>
                <Link to="/review-process" className="text-banner-foreground/70 hover:text-primary transition-smooth">
                  Review Process
                </Link>
              </li>
              <li>
                <Link to="/publication-ethics" className="text-banner-foreground/70 hover:text-primary transition-smooth">
                  Publication Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-banner-foreground/70">editor@ajvs.org</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-banner-foreground/70">
                  African Journal of Veterinary Sciences<br />
                  Editorial Office
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-banner-foreground/10 text-center text-sm text-banner-foreground/60">
          <p>&copy; {new Date().getFullYear()} African Journal of Veterinary Sciences. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
