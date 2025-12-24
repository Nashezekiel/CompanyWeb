import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Analytics from "@/components/Analytics";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminFAQ from "./pages/admin/AdminFAQ";
import AdminBlog from "./pages/admin/AdminBlog";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="page-animate"
          >
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/support" element={<Support />} />
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              } />
              <Route path="/admin/testimonials" element={
                <ProtectedRoute>
                  <AdminTestimonials />
                </ProtectedRoute>
              } />
              <Route path="/admin/faq" element={
                <ProtectedRoute>
                  <AdminFAQ />
                </ProtectedRoute>
              } />
              <Route path="/admin/blog" element={
                <ProtectedRoute>
                  <AdminBlog />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <motion.a
        href="https://wa.me/09060976424?text=Hello%20Starlink%2C%20I%27d%20like%20to%20get%20connected."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 lg:left-5 lg:right-auto z-50 inline-flex h-12 w-12 lg:w-auto items-center justify-center rounded-full bg-[#25D366] hover:bg-[#25D366] text-white shadow-lg transition-all hover:brightness-110 hover:scale-110 px-0 lg:px-5"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ delay: 1, duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        <img src="/whatsapp.png" alt="WhatsApp" className="h-8 w-8" />
        <span className="ml-2 hidden lg:inline">WhatsApp</span>
      </motion.a>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Analytics />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Avoid duplicate createRoot calls during HMR: reuse existing root if present
const rootEl = document.getElementById("root")!;
const globalAny = window as any;
if (!globalAny.__APP_ROOT__) {
  globalAny.__APP_ROOT__ = createRoot(rootEl);
  try {
    rootEl.setAttribute("data-app-root", "true");
  } catch (e) {
    /* ignore */
  }
}

// On HMR dispose, unmount the root to avoid React warning about createRoot on same container
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    try {
      if (globalAny.__APP_ROOT__) {
        globalAny.__APP_ROOT__.unmount();
        globalAny.__APP_ROOT__ = undefined;
      }
    } catch (e) {
      // ignore
    }
  });
}

globalAny.__APP_ROOT__.render(<App />);
