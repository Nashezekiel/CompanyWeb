import type { RequestHandler } from "express";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";

const activeSessions = new Set<string>();

function parseCookies(header: string | undefined): Record<string, string> {
  if (!header) return {};
  const pairs = header.split(";");
  const out: Record<string, string> = {};
  for (const pair of pairs) {
    const [k, v] = pair.split("=");
    if (!k || v === undefined) continue;
    out[k.trim()] = decodeURIComponent(v.trim());
  }
  return out;
}

export const adminLogin: RequestHandler = async (req, res) => {
  const { username, password } = req.body ?? {};

  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUser || !expectedHash) {
    return res.status(500).json({ error: "Admin credentials are not configured on the server" });
  }

  if (username !== expectedUser || typeof password !== "string") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const match = await bcrypt.compare(password, expectedHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch {
    return res.status(500).json({ error: "Authentication service error" });
  }

  const sessionId = crypto.randomUUID();
  activeSessions.add(sessionId);

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("admin_session", sessionId, {
    httpOnly: true,
    sameSite: "strict",
    secure: isProd,
    maxAge: 1000 * 60 * 60 * 8, // 8 hours
  });

  return res.json({ success: true });
};

export const adminLogout: RequestHandler = (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies["admin_session"];
  if (sessionId) {
    activeSessions.delete(sessionId);
  }

  res.clearCookie("admin_session");
  return res.json({ success: true });
};

export const adminMe: RequestHandler = (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies["admin_session"];
  if (!sessionId || !activeSessions.has(sessionId)) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  return res.json({ username: process.env.ADMIN_USERNAME ?? "admin" });
};

export const requireAdmin: RequestHandler = (req, res, next) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies["admin_session"];

  if (!sessionId || !activeSessions.has(sessionId)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
};
