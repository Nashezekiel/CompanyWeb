import type { RequestHandler } from "express";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_FILE = path.resolve(process.cwd(), "server", "data", "products.json");

async function readProductsFile(): Promise<any[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (err: any) {
    if (err?.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

async function writeProductsFile(products: any[]): Promise<void> {
  const tmpPath = `${DATA_FILE}.tmp`;
  const json = JSON.stringify(products, null, 2);
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(tmpPath, json, "utf8");
  await fs.rename(tmpPath, DATA_FILE);
}

export const getProducts: RequestHandler = async (_req, res) => {
  try {
    const products = await readProductsFile();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to load products" });
  }
};

export const getAdminProducts: RequestHandler = async (_req, res) => {
  try {
    const products = await readProductsFile();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to load admin products" });
  }
};

export const saveAdminProducts: RequestHandler = async (req, res) => {
  const { products } = req.body ?? {};

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: "'products' must be an array" });
  }

  try {
    await writeProductsFile(products);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save products" });
  }
};
