import assert from "node:assert/strict";
import { readFile, writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const outputDirectory = resolve(projectRoot, "dist");
const serverEntryPath = resolve(
  projectRoot,
  "node_modules/.cache/beauty-prerender/entry-server.js",
);
const { prerenderRoutes, renderRoute } = await import(pathToFileURL(serverEntryPath).href);
const emptyRoot = '<div id="root"></div>';
const expectedPages = {
  "/": {
    fileName: "index.html",
    heading: "Перманентный макияж от Анастасии",
    content: "Подчеркните свою естественную красоту",
  },
  "/services": {
    fileName: "services.html",
    heading: "Услуги",
    content: "Цены указаны в тенге.",
  },
  "/portfolio": {
    fileName: "portfolio.html",
    heading: "Портфолио работ",
    content: "Фотографии услуг мастера.",
  },
  "/about": {
    fileName: "about.html",
    heading: "О мастере",
    content: "Меня зовут Анастасия, и уже 8 лет",
  },
  "/contacts": {
    fileName: "contacts.html",
    heading: "Контакты",
    content: "Буду рада ответить на ваши вопросы",
  },
};

assert.deepEqual(
  [...prerenderRoutes].sort(),
  Object.keys(expectedPages).sort(),
  "Prerender routes must match the five public routes.",
);

const routeSeoTags = [
  ["title", /<title\b[^>]*>[\s\S]*?<\/title>/g],
  ["description", /<meta\b[^>]*\bname="description"[^>]*>/g],
  ["canonical", /<link\b[^>]*\brel="canonical"[^>]*>/g],
  ["og:title", /<meta\b[^>]*\bproperty="og:title"[^>]*>/g],
  ["og:description", /<meta\b[^>]*\bproperty="og:description"[^>]*>/g],
  ["og:type", /<meta\b[^>]*\bproperty="og:type"[^>]*>/g],
  ["og:url", /<meta\b[^>]*\bproperty="og:url"[^>]*>/g],
  ["og:image", /<meta\b[^>]*\bproperty="og:image"[^>]*>/g],
  ["og:image:alt", /<meta\b[^>]*\bproperty="og:image:alt"[^>]*>/g],
  ["og:locale", /<meta\b[^>]*\bproperty="og:locale"[^>]*>/g],
  ["twitter:card", /<meta\b[^>]*\bname="twitter:card"[^>]*>/g],
  ["twitter:title", /<meta\b[^>]*\bname="twitter:title"[^>]*>/g],
  ["twitter:description", /<meta\b[^>]*\bname="twitter:description"[^>]*>/g],
  ["twitter:image", /<meta\b[^>]*\bname="twitter:image"[^>]*>/g],
];

const readRootContent = (html, route) => {
  const rootStart = html.indexOf('<div id="root">');
  assert.notEqual(rootStart, -1, `${route}: root element is missing.`);

  const rootContentStart = rootStart + '<div id="root">'.length;
  const divTags = /<\/?div\b[^>]*>/g;
  divTags.lastIndex = rootStart;
  let depth = 0;

  for (const match of html.matchAll(divTags)) {
    if (match[0].startsWith("</")) {
      depth -= 1;
    } else if (!match[0].endsWith("/>")) {
      depth += 1;
    }

    if (depth === 0) return html.slice(rootContentStart, match.index);
  }

  assert.fail(`${route}: root element is not closed.`);
};

const decodeHtml = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const stripMarkup = (value) =>
  decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

const tagAttribute = (tag, attribute) => {
  const value = tag.match(new RegExp(`\\b${attribute}="([^"]*)"`))?.[1];
  return value === undefined ? undefined : decodeHtml(value);
};

const assertSingleTag = (html, route, name, pattern) => {
  const matches = [...html.matchAll(pattern)];
  assert.equal(matches.length, 1, `${route}: expected one ${name} tag, got ${matches.length}.`);
  return matches[0][0];
};

const assertLocalResourcesExist = async (html, route) => {
  for (const match of html.matchAll(/\b(src|href)="([^"]+)"/g)) {
    const [, attribute, resource] = match;
    if (!resource.startsWith("/") || resource.startsWith("//")) continue;

    const pathname = decodeURIComponent(new URL(resource, "https://local.invalid").pathname);
    if (attribute === "href" && !/\.(?:css|js|svg|png|jpe?g|webp|avif|woff2?)$/i.test(pathname)) {
      continue;
    }

    const resourcePath = pathname.replace(/^\/+/, "");
    if (resourcePath) {
      await access(resolve(outputDirectory, resourcePath));
    }
  }

  console.log(`${route}: local resources exist.`);
};

const uniqueTitles = new Set();
const uniqueDescriptions = new Set();

for (const route of prerenderRoutes) {
  const { fileName, heading, content } = expectedPages[route];
  const htmlPath = resolve(outputDirectory, fileName);
  const template = await readFile(htmlPath, "utf8");
  assert(template.includes(emptyRoot), `${route}: expected an empty root before prerender.`);

  const body = renderRoute(route);
  assert.match(body, /<main\b/, `${route}: the prerendered page has no main element.`);
  const renderedHeading = body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  assert(renderedHeading, `${route}: the prerendered page has no H1.`);
  assert.equal(stripMarkup(renderedHeading), heading, `${route}: unexpected H1.`);
  assert(body.includes(content), `${route}: expected page content is missing.`);

  const prerenderedHtml = template.replace(emptyRoot, `<div id="root">${body}</div>`);
  const rootContent = readRootContent(prerenderedHtml, route);
  assert.equal(rootContent, body, `${route}: prerendered content must be inside #root.`);
  assert(!prerenderedHtml.includes("data-initial-seo"), `${route}: initial SEO marker was not removed.`);

  const tags = Object.fromEntries(
    routeSeoTags.map(([name, pattern]) => [name, assertSingleTag(prerenderedHtml, route, name, pattern)]),
  );
  const title = stripMarkup(tags.title.replace(/^<title\b[^>]*>|<\/title>$/g, ""));
  const description = tagAttribute(tags.description, "content");
  const canonical = tagAttribute(tags.canonical, "href");
  const expectedUrl = `https://beauty-mu-ten.vercel.app${route}`;

  assert.equal(tagAttribute(tags["og:title"], "content"), title, `${route}: og:title differs from title.`);
  assert.equal(tagAttribute(tags["twitter:title"], "content"), title, `${route}: twitter:title differs from title.`);
  assert.equal(tagAttribute(tags["og:description"], "content"), description, `${route}: og description differs.`);
  assert.equal(tagAttribute(tags["twitter:description"], "content"), description, `${route}: Twitter description differs.`);
  assert.equal(canonical, expectedUrl, `${route}: canonical URL is incorrect.`);
  assert.equal(tagAttribute(tags["og:url"], "content"), canonical, `${route}: og:url differs from canonical.`);
  assert.equal(
    [...prerenderedHtml.matchAll(/<meta\b[^>]*\bname="google-site-verification"[^>]*>/g)].length,
    1,
    `${route}: Google verification meta tag must be preserved exactly once.`,
  );

  uniqueTitles.add(title);
  uniqueDescriptions.add(description);
  await assertLocalResourcesExist(prerenderedHtml, route);
  await writeFile(htmlPath, prerenderedHtml, "utf8");
  console.log(`${route}: prerendered H1 and unique SEO tags verified.`);
}

assert.equal(uniqueTitles.size, prerenderRoutes.length, "Page titles must be unique.");
assert.equal(uniqueDescriptions.size, prerenderRoutes.length, "Page descriptions must be unique.");

const notFoundHtml = await readFile(resolve(outputDirectory, "404.html"), "utf8");
assert.match(notFoundHtml, /Страница не найдена/, "The separate 404 page must remain available.");
assert(!/<link\b[^>]*\brel="canonical"/i.test(notFoundHtml), "The 404 page must not declare a canonical URL.");

console.log(`Prerendered ${prerenderRoutes.length} public routes; 404.html remains separate.`);
