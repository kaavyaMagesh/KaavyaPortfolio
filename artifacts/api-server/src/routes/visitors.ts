import { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const router = Router();

// Store visitors data in a JSON file next to the dist folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, "../../visitors.json");

interface VisitorRecord {
  hash: string;
  firstSeen: string;
  lastSeen: string;
  visits: number;
}

interface VisitorStore {
  total_unique: number;
  visitors: Record<string, VisitorRecord>;
}

function loadStore(): VisitorStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw) as VisitorStore;
    }
  } catch {
    // If file is corrupt or missing, start fresh
  }
  return { total_unique: 0, visitors: {} };
}

function saveStore(store: VisitorStore): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}

function getVisitorHash(req: Parameters<typeof router.post>[1] extends (...args: infer A) => any ? A[0] : never): string {
  // Build a fingerprint from IP + User-Agent — hashed for privacy
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  const ua = req.headers["user-agent"] || "unknown";
  return crypto.createHash("sha256").update(`${ip}::${ua}`).digest("hex");
}

/**
 * POST /api/visitors/ping
 * Called by the frontend on page load. Records the visit.
 */
router.post("/visitors/ping", (req, res) => {
  try {
    const hash = getVisitorHash(req);
    const store = loadStore();
    const now = new Date().toISOString();

    if (!store.visitors[hash]) {
      // New unique visitor
      store.total_unique += 1;
      store.visitors[hash] = {
        hash,
        firstSeen: now,
        lastSeen: now,
        visits: 1,
      };
    } else {
      // Returning visitor — update last seen + visits count
      store.visitors[hash].lastSeen = now;
      store.visitors[hash].visits += 1;
    }

    saveStore(store);

    res.json({
      success: true,
      unique_visitors: store.total_unique,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to record visit" });
  }
});

/**
 * GET /api/visitors/stats
 * Returns aggregate visitor stats (unique count + recent activity).
 */
router.get("/visitors/stats", (req, res) => {
  try {
    const store = loadStore();

    // Get the last 10 distinct visitors sorted by lastSeen
    const recent = Object.values(store.visitors)
      .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())
      .slice(0, 10)
      .map(({ hash: _h, ...rest }) => rest); // strip the hash for privacy

    res.json({
      unique_visitors: store.total_unique,
      total_visits: Object.values(store.visitors).reduce((sum, v) => sum + v.visits, 0),
      recent,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to read stats" });
  }
});

export default router;
