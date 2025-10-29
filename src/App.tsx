import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit" element={<SubmitManuscript />} />
          <Route path="/manuscripts" element={<Manuscripts />} />
          <Route path="/current-issue" element={<CurrentIssue />} />
          <Route path="/about" element={<About />} />
          <Route path="/editorial-board" element={<EditorialBoard />} />
          <Route path="/for-authors" element={<AuthorGuidelines />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/news" element={<News />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
