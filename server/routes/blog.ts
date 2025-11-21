import type { RequestHandler } from "express";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_FILE = path.resolve(process.cwd(), "server", "data", "blog.json");

async function readBlogFile(): Promise<any[]> {
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

async function writeBlogFile(posts: any[]): Promise<void> {
  const tmpPath = `${DATA_FILE}.tmp`;
  const json = JSON.stringify(posts, null, 2);
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(tmpPath, json, "utf8");
  await fs.rename(tmpPath, DATA_FILE);
}

export const getBlog: RequestHandler = async (_req, res) => {
  try {
    const posts = await readBlogFile();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to load blog posts" });
  }
};

export const getAdminBlog: RequestHandler = async (_req, res) => {
  try {
    const posts = await readBlogFile();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to load admin blog posts" });
  }
};

export const saveAdminBlog: RequestHandler = async (req, res) => {
  const { posts } = req.body ?? {};

  if (!Array.isArray(posts)) {
    return res.status(400).json({ error: "'posts' must be an array" });
  }

  try {
    await writeBlogFile(posts);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save blog posts" });
  }
};
