import type { RequestHandler } from "express";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_FILE = path.resolve(process.cwd(), "server", "data", "testimonials.json");

async function readTestimonialsFile(): Promise<any[]> {
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

async function writeTestimonialsFile(items: any[]): Promise<void> {
  const tmpPath = `${DATA_FILE}.tmp`;
  const json = JSON.stringify(items, null, 2);
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(tmpPath, json, "utf8");
  await fs.rename(tmpPath, DATA_FILE);
}

export const getTestimonials: RequestHandler = async (_req, res) => {
  try {
    const items = await readTestimonialsFile();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to load testimonials" });
  }
};

export const getAdminTestimonials: RequestHandler = async (_req, res) => {
  try {
    const items = await readTestimonialsFile();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to load admin testimonials" });
  }
};

export const saveAdminTestimonials: RequestHandler = async (req, res) => {
  const { testimonials } = req.body ?? {};

  if (!Array.isArray(testimonials)) {
    return res.status(400).json({ error: "'testimonials' must be an array" });
  }

  try {
    await writeTestimonialsFile(testimonials);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save testimonials" });
  }
};
