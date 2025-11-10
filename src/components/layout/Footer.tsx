import { Link } from "react-router-dom";
import { BookOpen, Mail, MapPin, Phone, FileText, Globe } from "lucide-react";
import ajvsLogo from "@/assets/ajvs-logo.png";

const Footer = () => {
  return (
    <footer className="bg-banner text-banner-foreground mt-auto border-t border-banner-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 rounded-lg bg-white border border-primary/20 flex items-center justify-center transition-smooth group-hover:scale-105">
                <img src={ajvsLogo} alt="AJVS Logo" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-banner-foreground font-serif text-xl font-bold">AJVS</span>
                <span className="text-banner-foreground/60 text-xs">Est. 2024</span>
              </div>
            </Link>
            <p className="text-banner-foreground/80 text-sm leading-relaxed mb-4">
              African Journal of Veterinary Sciences is published by the Faculty of Veterinary Medicine, University of
              Jos, Nigeria. A peer-reviewed, international and open access journal publishing high-quality original
              research articles, reviews, short communications and case reports in veterinary, biomedical and animal
              sciences. Published twice yearly.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-banner-foreground/70">Open Access Journal</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-banner-foreground/70">Double-Blind Peer Review</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-banner-foreground/70">Two Issues Per Year</span>
              </div>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h3 className="font-semibold mb-5 text-banner-foreground">Browse</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/current-issue"
                  className="text-banner-foreground/70 hover:text-primary transition-smooth hover:translate-x-1 inline-block"
                >
                  Current Issue
                </Link>
              </li>
              <li>
                <Link
                  to="/archives"
                  className="text-banner-foreground/70 hover:text-primary transition-smooth hover:translate-x-1 inline-block"
                >
                  Archives
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-banner-foreground/70 hover:text-primary transition-smooth hover:translate-x-1 inline-block"
                >
                  About the Journal
                </Link>
              </li>
              <li>
                <Link
                  to="/editorial-board"
                  className="text-banner-foreground/70 hover:text-primary transition-smooth hover:translate-x-1 inline-block"
                >
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-banner-foreground/70 hover:text-primary transition-smooth hover:translate-x-1 inline-block"
                >
                  News & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* For Authors */}
          <div>
            <h3 className="font-semibold mb-5 text-banner-foreground">For Authors</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/submit"
                  className="text-banner-foreground/70 hover:text-primary transition-smooth hover:translate-x-1 inline-block"
                >
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link
                  to="/for-authors"
                  className="text-banner-foreground/70 hover:text-primary transition-smooth hover:translate-x-1 inline-block"
                >
                  Author Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/policies"
                  className="text-banner-foreground/70 hover:text-primary transition-smooth hover:translate-x-1 inline-block"
                >
                  Policies & Ethics
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-banner-foreground/70 hover:text-primary transition-smooth hover:translate-x-1 inline-block"
                >
                  Contact Editorial Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-5 text-banner-foreground">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-banner-foreground/90 font-medium">Editorial Office</span>
                  <a
                    href="mailto:ajvsc@unijos.edu.ng"
                    className="text-banner-foreground/70 hover:text-primary transition-smooth"
                  >
                    ajvsc@unijos.edu.ng
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-banner-foreground/90 font-medium">Editorial Office</span>
                  <span className="text-banner-foreground/70">+234 8035907570 </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-banner-foreground/90 font-medium mb-1">Address</span>
                  <span className="text-banner-foreground/70 leading-relaxed">
                    Faculty of Veterinary Medicine
                    <br />
                    University of Jos
                    <br />
                    P.M.B 2084, Jos, Plateau State
                    <br />
                    Nigeria
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Location Map */}
        <div className="my-10">
          <h3 className="font-semibold mb-6 text-banner-foreground text-lg">Our Location</h3>
          <div className="w-full h-80 md:h-96 lg:h-[450px] rounded-xl overflow-hidden border border-banner-foreground/20 shadow-elegant transition-smooth hover:shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.8476753287567!2d8.883878!3d9.928702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105372c7c2e2c2c1%3A0x7e2c2e2c2e2c2e2c!2sUniversity%20of%20Jos%2C%20Jos!5e0!3m2!1sen!2sng!4v1647234567890!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Faculty of Veterinary Medicine, University of Jos Location"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-banner-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-banner-foreground/60">
              &copy; {new Date().getFullYear()} African Journal of Veterinary Sciences. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/policies" className="text-banner-foreground/60 hover:text-primary transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/policies" className="text-banner-foreground/60 hover:text-primary transition-smooth">
                Terms of Use
              </Link>
              <Link to="/contact" className="text-banner-foreground/60 hover:text-primary transition-smooth">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
