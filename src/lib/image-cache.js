import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const CACHE_DIR = path.resolve("cache/images");
const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="100%" height="100%" fill="#1f2937"/><text x="50%" y="46%" fill="#f9fafb" font-size="52" text-anchor="middle" font-family="Arial">Kép nem érhető el</text><text x="50%" y="55%" fill="#d1d5db" font-size="28" text-anchor="middle" font-family="Arial">Placeholder</text></svg>`;

function hashUrl(url) {
  return createHash("sha256").update(url).digest("hex").slice(0, 20);
}

function inferExt(url, contentType) {
  if (contentType) {
    if (contentType.includes("png")) return ".png";
    if (contentType.includes("jpeg") || contentType.includes("jpg")) return ".jpg";
    if (contentType.includes("webp")) return ".webp";
    if (contentType.includes("gif")) return ".gif";
    if (contentType.includes("svg")) return ".svg";
  }

  try {
    const parsed = new URL(url);
    const ext = path.extname(parsed.pathname);
    if (ext) return ext;
  } catch {
    // noop
  }

  return ".img";
}

async function ensurePlaceholder() {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const placeholderPath = path.join(CACHE_DIR, "placeholder-missing.svg");
  try {
    await fs.access(placeholderPath);
  } catch {
    await fs.writeFile(placeholderPath, PLACEHOLDER_SVG, "utf8");
  }
  return placeholderPath;
}

export async function resolveImageToLocal(url) {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const key = hashUrl(url);

  const existing = await fs.readdir(CACHE_DIR);
  const cached = existing.find((name) => name.startsWith(`${key}.`));
  if (cached) {
    return { path: path.join(CACHE_DIR, cached), cached: true, placeholder: false };
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    const ext = inferExt(url, contentType);
    const fileName = `${key}${ext}`;
    const filePath = path.join(CACHE_DIR, fileName);

    const data = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(filePath, data);

    return { path: filePath, cached: false, placeholder: false };
  } catch {
    const placeholder = await ensurePlaceholder();
    return { path: placeholder, cached: false, placeholder: true };
  }
}
