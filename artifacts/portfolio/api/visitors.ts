// Vercel Serverless Function: api/visitors.ts
// Handles POST (ping) and GET (stats) for visitor tracking
// Uses Upstash Redis for free persistent storage.
//
// SETUP (one-time):
// 1. Go to https://upstash.com → create a free Redis database
// 2. In Vercel project settings → Environment Variables, add:
//    UPSTASH_REDIS_REST_URL  =  <your url from upstash>
//    UPSTASH_REDIS_REST_TOKEN = <your token from upstash>

import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";

// Lightweight Upstash Redis REST client (no SDK needed)
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command: string[]): Promise<unknown> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("Upstash env vars not configured");
  }
  const res = await fetch(`${REDIS_URL}/${command.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const json = (await res.json()) as { result: unknown };
  return json.result;
}

function getVisitorHash(req: VercelRequest): string {
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  const ua = (req.headers["user-agent"] as string) || "unknown";
  return crypto.createHash("sha256").update(`${ip}::${ua}`).digest("hex").slice(0, 16);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers so Vercel frontend can call this
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "POST") {
      // --- Ping: record this visitor ---
      const hash = getVisitorHash(req);
      const visitorKey = `visitor:${hash}`;
      const now = new Date().toISOString();

      // Check if this visitor has been seen before
      const existing = await redis(["GET", visitorKey]);

      if (!existing) {
        // New unique visitor — increment global counter
        await redis(["INCR", "total_unique_visitors"]);
        // Store visitor record (expires in 1 year so returning visitors aren't double-counted)
        await redis(["SET", visitorKey, now, "EX", String(60 * 60 * 24 * 365)]);
      }

      // Always increment total visit counter
      await redis(["INCR", "total_visits"]);

      const uniqueCount = await redis(["GET", "total_unique_visitors"]);
      return res.json({ success: true, unique_visitors: Number(uniqueCount) });
    }

    if (req.method === "GET") {
      // --- Stats: return aggregate counts ---
      const [uniqueCount, totalVisits] = await Promise.all([
        redis(["GET", "total_unique_visitors"]),
        redis(["GET", "total_visits"]),
      ]);

      return res.json({
        unique_visitors: Number(uniqueCount ?? 0),
        total_visits: Number(totalVisits ?? 0),
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Visitor tracking error:", err);
    // Always return 200 — analytics must never break the portfolio
    return res.status(200).json({ success: false, note: "Tracking unavailable" });
  }
}
