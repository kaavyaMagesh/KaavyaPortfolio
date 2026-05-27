// Vercel Serverless Function — plain JS to avoid Vite TypeScript compilation issues
// Handles POST (record visit) and GET (return stats)
// Uses Upstash Redis REST API for persistent free storage.
//
// SETUP:
// In Vercel project → Settings → Environment Variables, add:
//   UPSTASH_REDIS_REST_URL   = https://xxx.upstash.io
//   UPSTASH_REDIS_REST_TOKEN = AXxx...

import crypto from "node:crypto";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("Upstash env vars not set");
  }
  const res = await fetch(
    `${REDIS_URL}/${command.map(encodeURIComponent).join("/")}`,
    { headers: { Authorization: `Bearer ${REDIS_TOKEN}` } }
  );
  const json = await res.json();
  return json.result;
}

function getVisitorHash(req) {
  const ip =
    String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  const ua = String(req.headers["user-agent"] || "unknown");
  return crypto.createHash("sha256").update(`${ip}::${ua}`).digest("hex").slice(0, 16);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "POST") {
      const hash = getVisitorHash(req);
      const visitorKey = `visitor:${hash}`;
      const now = new Date().toISOString();

      const existing = await redis(["GET", visitorKey]);

      if (!existing) {
        await redis(["INCR", "total_unique_visitors"]);
        // Expire after 1 year so returning visitors aren't double-counted
        await redis(["SET", visitorKey, now, "EX", String(60 * 60 * 24 * 365)]);
      }

      await redis(["INCR", "total_visits"]);

      const uniqueCount = await redis(["GET", "total_unique_visitors"]);
      return res.json({ success: true, unique_visitors: Number(uniqueCount) });
    }

    if (req.method === "GET") {
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
    // Always 200 — analytics must never break the portfolio
    return res.status(200).json({ success: false, note: "Tracking unavailable" });
  }
}
