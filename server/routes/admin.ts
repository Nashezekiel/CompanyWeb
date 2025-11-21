import { RequestHandler } from "express";

// Simple in-memory storage for demo purposes
// In production, this would be connected to a database
let adminData = {
  products: [],
  testimonials: [],
  faqs: [],
  blogPosts: []
};

export const getAdminData: RequestHandler = (req, res) => {
  res.json(adminData);
};

export const updateAdminData: RequestHandler = (req, res) => {
  const { type, data } = req.body;
  
  if (!type || !data) {
    return res.status(400).json({ error: "Type and data are required" });
  }

  adminData[type as keyof typeof adminData] = data;
  res.json({ success: true, message: `${type} updated successfully` });
};

export const addAdminItem: RequestHandler = (req, res) => {
  const { type, item } = req.body;
  
  if (!type || !item) {
    return res.status(400).json({ error: "Type and item are required" });
  }

  const newItem = { ...item, id: `${type}-${Date.now()}` };
  adminData[type as keyof typeof adminData].push(newItem);
  res.json({ success: true, item: newItem });
};

export const updateAdminItem: RequestHandler = (req, res) => {
  const { type, id, item } = req.body;
  
  if (!type || !id || !item) {
    return res.status(400).json({ error: "Type, id, and item are required" });
  }

  const items = adminData[type as keyof typeof adminData] as any[];
  const index = items.findIndex((item: any) => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  items[index] = { ...items[index], ...item };
  res.json({ success: true, item: items[index] });
};

export const deleteAdminItem: RequestHandler = (req, res) => {
  const { type, id } = req.body;
  
  if (!type || !id) {
    return res.status(400).json({ error: "Type and id are required" });
  }

  const items = adminData[type as keyof typeof adminData] as any[];
  const index = items.findIndex((item: any) => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  items.splice(index, 1);
  res.json({ success: true, message: "Item deleted successfully" });
};
