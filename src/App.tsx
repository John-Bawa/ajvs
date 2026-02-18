import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { AnimatedRoute } from "@/components/animations/AnimatedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ScrollRestoration } from "@/components/ui/scroll-restoration";
import { PageTransitionLoader } from "@/components/ui/page-transition-loader";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SubmitManuscript from "./pages/SubmitManuscript";
import Manuscripts from "./pages/Manuscripts";
import CurrentIssue from "./pages/CurrentIssue";
import About from "./pages/About";
import EditorialBoard from "./pages/EditorialBoard";
import AuthorGuidelines from "./pages/AuthorGuidelines";
import Archives from "./pages/Archives";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";
import News from "./pages/News";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import CallForPapers from "./pages/CallForPapers";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import EditorDashboard from "./pages/EditorDashboard";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
      <Route path="/" element={<AnimatedRoute><Index /></AnimatedRoute>} />
      <Route path="/about" element={<AnimatedRoute><About /></AnimatedRoute>} />
      <Route path="/current-issue" element={<AnimatedRoute><CurrentIssue /></AnimatedRoute>} />
      <Route path="/archives" element={<AnimatedRoute><Archives /></AnimatedRoute>} />
      <Route path="/for-authors" element={<AnimatedRoute><AuthorGuidelines /></AnimatedRoute>} />
      <Route path="/policies" element={<AnimatedRoute><Policies /></AnimatedRoute>} />
      <Route path="/editorial-board" element={<AnimatedRoute><EditorialBoard /></AnimatedRoute>} />
      <Route path="/contact" element={<AnimatedRoute><Contact /></AnimatedRoute>} />
      <Route path="/news" element={<AnimatedRoute><News /></AnimatedRoute>} />
      <Route path="/faq" element={<AnimatedRoute><FAQ /></AnimatedRoute>} />
      <Route path="/call-for-papers" element={<AnimatedRoute><CallForPapers /></AnimatedRoute>} />
      <Route path="/auth" element={<AnimatedRoute><Auth /></AnimatedRoute>} />
      
      {/* Protected Routes */}
      <Route path="/submit" element={<ProtectedRoute><AnimatedRoute><SubmitManuscript /></AnimatedRoute></ProtectedRoute>} />
      <Route path="/manuscripts" element={<ProtectedRoute><AnimatedRoute><Manuscripts /></AnimatedRoute></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><AnimatedRoute><Dashboard /></AnimatedRoute></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><AnimatedRoute><ReviewerDashboard /></AnimatedRoute></ProtectedRoute>} />
      <Route path="/reviewer-dashboard" element={<ProtectedRoute><AnimatedRoute><ReviewerDashboard /></AnimatedRoute></ProtectedRoute>} />
      <Route path="/editorial" element={<ProtectedRoute><AnimatedRoute><EditorDashboard /></AnimatedRoute></ProtectedRoute>} />
      <Route path="/editor-dashboard" element={<ProtectedRoute><AnimatedRoute><EditorDashboard /></AnimatedRoute></ProtectedRoute>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<AnimatedRoute><NotFound /></AnimatedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider defaultTheme="light" storageKey="ajvs-theme">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <ScrollRestoration />
              <PageTransitionLoader />
              <AnimatedRoutes />
              <ScrollToTop />
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
