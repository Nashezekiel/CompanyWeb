import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { 
  getAdminData, 
  updateAdminData, 
  addAdminItem, 
  updateAdminItem, 
  deleteAdminItem 
} from "./routes/admin";
import { adminLogin, adminLogout, adminMe, requireAdmin } from "./routes/auth";
import { getProducts, getAdminProducts, saveAdminProducts } from "./routes/products";
import { getBlog, getAdminBlog, saveAdminBlog } from "./routes/blog";
import { getFaqs, getAdminFaqs, saveAdminFaqs } from "./routes/faqs";
import { getTestimonials, getAdminTestimonials, saveAdminTestimonials } from "./routes/testimonials";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  
  // Public products API
  app.get("/api/products", getProducts);

  // Public blog / FAQ / testimonials APIs
  app.get("/api/blog", getBlog);
  app.get("/api/faqs", getFaqs);
  app.get("/api/testimonials", getTestimonials);

  // Admin products API (protected)
  app.get("/api/admin/products", requireAdmin, getAdminProducts);
  app.post("/api/admin/products", requireAdmin, saveAdminProducts);

  // Admin blog API (protected)
  app.get("/api/admin/blog", requireAdmin, getAdminBlog);
  app.post("/api/admin/blog", requireAdmin, saveAdminBlog);

  // Admin FAQ API (protected)
  app.get("/api/admin/faqs", requireAdmin, getAdminFaqs);
  app.post("/api/admin/faqs", requireAdmin, saveAdminFaqs);

  // Admin testimonials API (protected)
  app.get("/api/admin/testimonials", requireAdmin, getAdminTestimonials);
  app.post("/api/admin/testimonials", requireAdmin, saveAdminTestimonials);

  // Admin auth routes
  app.post("/api/admin/login", adminLogin);
  app.post("/api/admin/logout", adminLogout);
  app.get("/api/admin/me", adminMe);

  // Admin API routes (protected)
  app.get("/api/admin/data", requireAdmin, getAdminData);
  app.post("/api/admin/data", requireAdmin, updateAdminData);
  app.post("/api/admin/add", requireAdmin, addAdminItem);
  app.put("/api/admin/update", requireAdmin, updateAdminItem);
  app.delete("/api/admin/delete", requireAdmin, deleteAdminItem);

  return app;
}
