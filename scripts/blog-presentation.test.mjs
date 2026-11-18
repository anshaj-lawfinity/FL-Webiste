import assert from "node:assert/strict";
import test from "node:test";
import {
  MODERN_BLOG_CLASSES,
  getAllowedModernBlogClass,
  getBlogPresentationClass,
  normalizeBlogPresentationVersion,
  sanitizeBlogHtml,
} from "../src/lib/blogPresentation.mjs";

test("only explicit version 2 selects V2", () => {
  assert.equal(normalizeBlogPresentationVersion(2), 2);
  assert.equal(normalizeBlogPresentationVersion("2"), 2);
  for (const value of [undefined, null, 1, 3, "unknown"]) {
    assert.equal(normalizeBlogPresentationVersion(value), 1);
  }
});

test("renderer wrapper is selected from normalized version", () => {
  assert.equal(getBlogPresentationClass(undefined), "fl-blog-content--v1");
  assert.equal(getBlogPresentationClass(null), "fl-blog-content--v1");
  assert.equal(getBlogPresentationClass("2"), "fl-blog-content--v2");
});

test("modern class allowlist exactly matches supported blocks", () => {
  assert.deepEqual([...MODERN_BLOG_CLASSES].sort(), [
    "law-caution", "law-checklist", "law-compare", "law-facts", "law-fees",
    "law-quick-answer", "law-steps", "law-takeaway", "law-tip", "law-warning",
  ].sort());
  assert.equal(getAllowedModernBlogClass("p", ' class="law-tip unknown"'), "law-tip");
  assert.equal(getAllowedModernBlogClass("div", ' class="law-tip"'), "");
});

test("sanitizer drops modern classes when V2 is not explicitly selected", () => {
  assert.equal(
    sanitizeBlogHtml('<p class="law-tip"><strong>Label:</strong> Text</p>', 1),
    "<p><strong>Label:</strong> Text</p>"
  );
});

test("V2 preserves approved classes and strips unsafe markup", () => {
  const html = '<p class="law-tip unknown" onclick="bad()">Tip</p>'
    + '<table class="law-fees"><tr><th>Fee</th><td>100</td></tr></table>'
    + '<script>alert(1)</script><a href="javascript:bad()">Bad</a>';
  const output = sanitizeBlogHtml(html, 2);
  assert.match(output, /<p class="law-tip">Tip<\/p>/);
  assert.match(output, /<table class="law-fees">/);
  assert.doesNotMatch(output, /onclick|script|javascript|unknown/);
});
