import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AnimatedRoute } from "@/components/animations/AnimatedRoute";
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
import NotFound from "./pages/NotFound";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import EditorDashboard from "./pages/EditorDashboard";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedRoute><Index /></AnimatedRoute>} />
        <Route path="/auth" element={<AnimatedRoute><Auth /></AnimatedRoute>} />
        <Route path="/dashboard" element={<AnimatedRoute><Dashboard /></AnimatedRoute>} />
        <Route path="/submit" element={<AnimatedRoute><SubmitManuscript /></AnimatedRoute>} />
        <Route path="/manuscripts" element={<AnimatedRoute><Manuscripts /></AnimatedRoute>} />
        <Route path="/current-issue" element={<AnimatedRoute><CurrentIssue /></AnimatedRoute>} />
        <Route path="/about" element={<AnimatedRoute><About /></AnimatedRoute>} />
        <Route path="/editorial-board" element={<AnimatedRoute><EditorialBoard /></AnimatedRoute>} />
        <Route path="/for-authors" element={<AnimatedRoute><AuthorGuidelines /></AnimatedRoute>} />
        <Route path="/archives" element={<AnimatedRoute><Archives /></AnimatedRoute>} />
        <Route path="/contact" element={<AnimatedRoute><Contact /></AnimatedRoute>} />
        <Route path="/policies" element={<AnimatedRoute><Policies /></AnimatedRoute>} />
        <Route path="/news" element={<AnimatedRoute><News /></AnimatedRoute>} />
        <Route path="/reviewer-dashboard" element={<AnimatedRoute><ReviewerDashboard /></AnimatedRoute>} />
        <Route path="/editor-dashboard" element={<AnimatedRoute><EditorDashboard /></AnimatedRoute>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<AnimatedRoute><NotFound /></AnimatedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
