export const MODERN_BLOG_PRESENTATION_VERSION = 2;

export const MODERN_BLOG_CLASSES = new Set([
  "law-quick-answer",
  "law-tip",
  "law-caution",
  "law-warning",
  "law-takeaway",
  "law-facts",
  "law-checklist",
  "law-steps",
  "law-fees",
  "law-compare",
]);

const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "a", "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "blockquote", "table", "thead", "tbody", "tr",
  "th", "td", "figure", "figcaption", "img",
]);
const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4"]);

export function normalizeBlogPresentationVersion(value) {
  return Number(value) === MODERN_BLOG_PRESENTATION_VERSION
    ? MODERN_BLOG_PRESENTATION_VERSION
    : 1;
}

export function getBlogPresentationClass(value) {
  return `fl-blog-content--v${normalizeBlogPresentationVersion(value)}`;
}

export function getAllowedModernBlogClass(tag, attrs = "") {
  if (!["p", "ul", "ol", "table"].includes(tag)) return "";
  const classMatch = String(attrs).match(/\sclass\s*=\s*["']([^"']+)["']/i);
  return classMatch?.[1]
    ?.split(/\s+/)
    .find((className) => MODERN_BLOG_CLASSES.has(className)) || "";
}

function sanitizeAttributes(tag, attrs = "", allowedClasses) {
  if (tag === "img") {
    const srcMatch = attrs.match(/\ssrc\s*=\s*["']([^"']+)["']/i);
    const altMatch = attrs.match(/\salt\s*=\s*["']([^"']*)["']/i);
    const src = srcMatch?.[1] || "";
    if (!src || /^(javascript|data:text\/html)/i.test(src)) return "";
    return ` src="${src.replace(/"/g, "%22")}" alt="${(altMatch?.[1] || "").replace(/"/g, "&quot;")}" loading="lazy"`;
  }

  if (HEADING_TAGS.has(tag)) {
    const idMatch = attrs.match(/\sid\s*=\s*["']([a-zA-Z0-9\-_]+)["']/);
    return idMatch ? ` id="${idMatch[1]}"` : "";
  }

  if (allowedClasses?.size && ["p", "ul", "ol", "table"].includes(tag)) {
    const safeClass = getAllowedModernBlogClass(tag, attrs);
    if (safeClass) return ` class="${safeClass}"`;
  }

  if (tag !== "a") return "";
  const hrefMatch = attrs.match(/\shref\s*=\s*["']([^"']+)["']/i);
  const href = hrefMatch?.[1] || "";
  if (!href || /^(javascript|data):/i.test(href)) return "";
  return ` href="${href.replace(/"/g, "%22")}" rel="noopener noreferrer"`;
}

export function sanitizeBlogHtml(html = "", presentationVersion) {
  const allowedClasses = normalizeBlogPresentationVersion(presentationVersion) === 2
    ? MODERN_BLOG_CLASSES
    : undefined;

  return String(html)
    .replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/<\s*\/?\s*([a-z0-9]+)([^>]*)>/gi, (match, rawTag, attrs) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return "";
      if (match.startsWith("</")) return `</${tag}>`;
      return `<${tag}${sanitizeAttributes(tag, attrs, allowedClasses)}>`;
    });
}
