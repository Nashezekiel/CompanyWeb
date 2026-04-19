import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Analytics from "@/components/Analytics";
import ChatBot from "@/components/site/ChatBot";
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
import FaqPage from "./pages/FaqPage";
import LocationsIndex from "./pages/LocationsIndex";
import LocationDetail from "./pages/LocationDetail";
import StarlinkGuideNigeria from "./pages/StarlinkGuideNigeria";
import Gallery from "./pages/Gallery";
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
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/locations" element={<LocationsIndex />} />
              <Route path="/locations/:slug" element={<LocationDetail />} />
              <Route path="/guide/starlink-nigeria" element={<StarlinkGuideNigeria />} />
              <Route path="/gallery" element={<Gallery />} />
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

      {/*
        Layout logic:
        • Desktop (lg+): WhatsApp/call button on the LEFT  |  ChatBot FAB on the RIGHT
        • Mobile: both on the RIGHT — WhatsApp/call at bottom-20, ChatBot FAB at bottom-5
      */}

      {/* WhatsApp & Call floating button */}
      <FloatingContact />

      {/* AI Chatbot — always on the right */}
      <ChatBot />
    </>
  );
};

// ─── Floating WhatsApp / Call Button ─────────────────────────────────────────
const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        // Mobile: right-5, bottom-20 (above the chatbot FAB at bottom-5)
        // Desktop lg+: left-5, bottom-5 (on the opposite side from chatbot)
        "fixed bottom-20 right-5 lg:bottom-5 lg:left-5 lg:right-auto z-50 flex flex-col items-end lg:items-start gap-3"
      }
    >
      {/* Expanded: WhatsApp + Call buttons */}
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp */}
            <motion.div
              className="group relative flex items-center gap-2"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Tooltip — right of button on desktop (left side), left of button on mobile (right side) */}
              <motion.span className="absolute right-full mr-2 lg:right-auto lg:mr-0 lg:left-full lg:ml-2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                WhatsApp
              </motion.span>
              <motion.a
                href="https://wa.me/2349060976424?text=Hello%20Datagram%2C%20I%27d%20like%20to%20get%20connected."
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:brightness-110 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Chat on WhatsApp"
              >
                <img src="/whatsapp.png" alt="WhatsApp" className="h-6 w-6" />
              </motion.a>
            </motion.div>

            {/* Call */}
            <motion.div
              className="group relative flex items-center gap-2"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            >
              <motion.span className="absolute right-full mr-2 lg:right-auto lg:mr-0 lg:left-full lg:ml-2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                Call Us
              </motion.span>
              <motion.a
                href="tel:+2349060976424"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:brightness-110 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Call us"
              >
                <Phone className="h-6 w-6" />
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toggle FAB */}
      <motion.div
        className="group relative flex items-center gap-2"
        initial={{ scale: 0 }}
        animate={{ scale: open ? 1 : [1, 1.08, 1] }}
        transition={
          open
            ? { duration: 0.3 }
            : { delay: 1, duration: 1.6, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Tooltip label */}
        {open ? (
          <span className="absolute right-full mr-2 lg:right-auto lg:mr-0 lg:left-full lg:ml-2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Hide
          </span>
        ) : (
          <span className="absolute right-full mr-2 lg:right-auto lg:mr-0 lg:left-full lg:ml-2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shadow-lg opacity-100 transition-opacity duration-200 pointer-events-none">
            24/7 Support
          </span>
        )}

        <motion.button
          onClick={() => setOpen(!open)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:brightness-110"
          whileHover={{ scale: open ? 1.05 : 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={open ? "Close contact options" : "Open contact options"}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
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
