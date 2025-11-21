import type { RequestHandler } from "express";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_FILE = path.resolve(process.cwd(), "server", "data", "faqs.json");

async function readFaqFile(): Promise<any[]> {
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

async function writeFaqFile(items: any[]): Promise<void> {
  const tmpPath = `${DATA_FILE}.tmp`;
  const json = JSON.stringify(items, null, 2);
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(tmpPath, json, "utf8");
  await fs.rename(tmpPath, DATA_FILE);
}

export const getFaqs: RequestHandler = async (_req, res) => {
  try {
    const items = await readFaqFile();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to load FAQs" });
  }
};

export const getAdminFaqs: RequestHandler = async (_req, res) => {
  try {
    const items = await readFaqFile();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to load admin FAQs" });
  }
};

export const saveAdminFaqs: RequestHandler = async (req, res) => {
  const { faqs } = req.body ?? {};

  if (!Array.isArray(faqs)) {
    return res.status(400).json({ error: "'faqs' must be an array" });
  }

  try {
    await writeFaqFile(faqs);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save FAQs" });
  }
};
