import { lazy, Suspense } from "react";
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

// Lazy load all non-homepage routes
const Auth = lazy(() => import("./pages/Auth"));
const CurrentIssue = lazy(() => import("./pages/CurrentIssue"));
const About = lazy(() => import("./pages/About"));
const EditorialBoard = lazy(() => import("./pages/EditorialBoard"));
const AuthorGuidelines = lazy(() => import("./pages/AuthorGuidelines"));
const Archives = lazy(() => import("./pages/Archives"));
const Contact = lazy(() => import("./pages/Contact"));
const Policies = lazy(() => import("./pages/Policies"));
const News = lazy(() => import("./pages/News"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CallForPapers = lazy(() => import("./pages/CallForPapers"));
const SystemCredits = lazy(() => import("./pages/SystemCredits"));

const EditorDashboard = lazy(() => import("./pages/EditorDashboard"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const AdminBlogEditor = lazy(() => import("./pages/AdminBlogEditor"));

const queryClient = new QueryClient();

const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageTransitionLoader />}>
    <AnimatedRoute>{children}</AnimatedRoute>
  </Suspense>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
      <Route path="/" element={<AnimatedRoute><Index /></AnimatedRoute>} />
      <Route path="/about" element={<LazyRoute><About /></LazyRoute>} />
      <Route path="/current-issue" element={<LazyRoute><CurrentIssue /></LazyRoute>} />
      <Route path="/archives" element={<LazyRoute><Archives /></LazyRoute>} />
      <Route path="/for-authors" element={<LazyRoute><AuthorGuidelines /></LazyRoute>} />
      <Route path="/policies" element={<LazyRoute><Policies /></LazyRoute>} />
      <Route path="/editorial-board" element={<LazyRoute><EditorialBoard /></LazyRoute>} />
      <Route path="/contact" element={<LazyRoute><Contact /></LazyRoute>} />
      <Route path="/news" element={<LazyRoute><News /></LazyRoute>} />
      <Route path="/faq" element={<LazyRoute><FAQ /></LazyRoute>} />
      <Route path="/call-for-papers" element={<LazyRoute><CallForPapers /></LazyRoute>} />
      <Route path="/system-credits" element={<LazyRoute><SystemCredits /></LazyRoute>} />
      <Route path="/blog" element={<LazyRoute><Blog /></LazyRoute>} />
      <Route path="/blog/:slug" element={<LazyRoute><BlogPost /></LazyRoute>} />
      <Route path="/auth" element={<LazyRoute><Auth /></LazyRoute>} />
      
      {/* Protected Routes */}
      <Route path="/submit" element={<ProtectedRoute><LazyRoute><SubmitManuscript /></LazyRoute></ProtectedRoute>} />
      <Route path="/manuscripts" element={<ProtectedRoute><LazyRoute><Manuscripts /></LazyRoute></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><LazyRoute><Dashboard /></LazyRoute></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><LazyRoute><ReviewerDashboard /></LazyRoute></ProtectedRoute>} />
      <Route path="/reviewer-dashboard" element={<ProtectedRoute><LazyRoute><ReviewerDashboard /></LazyRoute></ProtectedRoute>} />
      <Route path="/editorial" element={<ProtectedRoute><LazyRoute><EditorDashboard /></LazyRoute></ProtectedRoute>} />
      <Route path="/editor-dashboard" element={<ProtectedRoute><LazyRoute><EditorDashboard /></LazyRoute></ProtectedRoute>} />
      <Route path="/admin/blog" element={<ProtectedRoute><LazyRoute><AdminBlog /></LazyRoute></ProtectedRoute>} />
      <Route path="/admin/blog/editor" element={<ProtectedRoute><LazyRoute><AdminBlogEditor /></LazyRoute></ProtectedRoute>} />
      <Route path="/admin/blog/editor/:id" element={<ProtectedRoute><LazyRoute><AdminBlogEditor /></LazyRoute></ProtectedRoute>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
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
