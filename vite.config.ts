import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import {
  DEFAULT_CONFIG,
  DEFAULT_EVENTS,
  formatWeddingDate,
  formatWeddingTime,
} from "./src/config/wedding";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);
}

function setMeta(html: string, attribute: "name" | "property", key: string, value: string | null): string {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expression = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}="${escapedKey}")[^>]*>`, "i");
  if (value === null) return html.replace(expression, "");
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setCanonical(html: string, href: string): string {
  const tag = `<link rel="canonical" href="${href}" />`;
  const expression = /<link\b(?=[^>]*\brel="canonical")[^>]*>/i;
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function eventInvitationPages(): Plugin {
  return {
    name: "event-invitation-pages",
    apply: "build",
    closeBundle() {
      const rootHtml = readFileSync(path.resolve(__dirname, "dist/index.html"), "utf8");
      for (const pageKey of ["mehndi", "barat", "walima", "valima"] as const) {
        const key = pageKey === "valima" ? "walima" : pageKey;
        const event = DEFAULT_EVENTS.find((item) => item.key === key)!;
        const times = event.times
          .map((time) => `${time.label} ${formatWeddingTime(time.isoDate)}${time.note ? ` (${time.note})` : ""}`)
          .join("; ");
        const title = `${event.name} | ${DEFAULT_CONFIG.groom} weds ${DEFAULT_CONFIG.bride}`;
        const description = `You are invited to the ${event.name} on ${formatWeddingDate(event.times[0].isoDate)}. ${times}. Venue: ${event.venue}.`;
        const canonical = `https://3bs.io/invite/${pageKey}/`;
        let html = rootHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
        html = setCanonical(html, canonical);
        html = setMeta(html, "name", "description", description);
        html = setMeta(html, "property", "og:title", title);
        html = setMeta(html, "property", "og:description", description);
        html = setMeta(html, "property", "og:url", canonical);
        html = setMeta(html, "property", "og:site_name", "Uzair & Rahma Wedding Invitation");
        html = setMeta(html, "name", "twitter:card", "summary_large_image");
        html = setMeta(html, "name", "twitter:title", title);
        html = setMeta(html, "name", "twitter:description", description);
        const outputDirectory = path.resolve(__dirname, `dist/invite/${pageKey}`);
        mkdirSync(outputDirectory, { recursive: true });
        writeFileSync(path.join(outputDirectory, "index.html"), html);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), eventInvitationPages()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
