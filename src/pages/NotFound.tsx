import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import ajvsLogo from "@/assets/ajvs-logo.png";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-gradient-hero px-4">
        <div className="text-center max-w-md">
        <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
          <div className="w-16 h-16 rounded-lg bg-white border border-primary/20 flex items-center justify-center transition-smooth group-hover:scale-105 shadow-md">
            <img src={ajvsLogo} alt="AJVS Logo" className="w-14 h-14 object-contain" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-foreground font-serif text-2xl font-bold">AJVS</span>
            <span className="text-muted-foreground text-xs">African Journal of Veterinary Sciences</span>
          </div>
        </Link>

        <div className="glass rounded-2xl p-8 md:p-12 mb-6">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              Return to Home
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          If you believe this is an error, please{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
