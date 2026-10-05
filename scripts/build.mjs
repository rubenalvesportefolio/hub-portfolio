#!/usr/bin/env node
// Copies every publishable file into _site/, skipping whatever matches
// .deployignore. CI validates _site/ and deploys that exact folder, so
// "what passed the checks" and "what went live" are always the same bytes.
//
// Usage: node scripts/build.mjs   (or: npm run build)

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const OUT = path.join(ROOT, '_site');

function globToRegex(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*' && glob[i + 1] === '*') { re += '.*'; i++; }
    else if (c === '*') re += '[^/]*';
    else if (c === '?') re += '[^/]';
    else re += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return re;
}

// gitignore-lite: `name` (no slash) matches a basename at any depth,
// a leading `/` anchors to the root, a trailing `/` means "directory".
function compile(line) {
  const dirOnly = line.endsWith('/');
  let body = dirOnly ? line.slice(0, -1) : line;
  const anchored = body.startsWith('/') || body.includes('/');
  body = body.replace(/^\//, '');
  const regex = new RegExp(`^${anchored ? '' : '(?:.*/)?'}${globToRegex(body)}$`);
  return { regex, dirOnly };
}

const rules = readFileSync(path.join(ROOT, '.deployignore'), 'utf8')
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map(compile);

const ignored = (rel, isDir) => rules.some((r) => (!r.dirOnly || isDir) && r.regex.test(rel));

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);

let copied = 0;
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.relative(ROOT, abs).split(path.sep).join('/');
    if (ignored(rel, entry.isDirectory())) continue;
    if (entry.isDirectory()) { walk(abs); continue; }
    const dest = path.join(OUT, rel);
    mkdirSync(path.dirname(dest), { recursive: true });
    cpSync(abs, dest);
    copied++;
  }
})(ROOT);

if (!existsSync(path.join(OUT, 'index.html'))) {
  console.error('build: _site/index.html is missing - check .deployignore');
  process.exit(1);
}
console.log(`build: copied ${copied} files into _site/`);

// ---- One page per project (project-<id>.html) ----
// The source has a single project.html that fills itself in from
// ?id=... - fine for visitors, but link previews (LinkedIn, WhatsApp...)
// don't run JavaScript, so every shared project link showed the same
// generic card. The build writes a real copy of project.html for each
// visible project with its own <title>, description and share image
// (images/og/<id>.jpg if it exists, otherwise the site-wide one), and
// switches the site's links over to them (PRETTY_PROJECT_URLS in
// script.js). project.html?id=... keeps working and forwards there.
{
  const scriptPath = path.join(OUT, 'script.js');
  const scriptSrc = readFileSync(scriptPath, 'utf8');
  const literal = extractObjectLiteral(scriptSrc, 'const PROJECTS =');
  const template = readFileSync(path.join(OUT, 'project.html'), 'utf8');
  const attr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const made = [];

  if (literal) {
    const projects = vm.runInNewContext(`(${literal})`, {}, { timeout: 1000 });
    for (const [category, list] of Object.entries(projects)) {
      if (category === 'commissions') continue; // they have their own pages
      for (const p of list) {
        if (!p.id || p.hidden) continue;
        const plain = String(p.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const desc = plain.length > 155 ? `${plain.slice(0, 152).replace(/\s+\S*$/, '')}...` : plain || 'A project by Ruben Alves.';
        const ogImage = existsSync(path.join(OUT, 'images', 'og', `${p.id}.jpg`)) ? `images/og/${p.id}.jpg` : 'images/og-image.jpg';
        let html = template;
        const swap = (pattern, value) => {
          if (!pattern.test(html)) throw new Error(`build: project.html no longer matches ${pattern} - update scripts/build.mjs`);
          html = html.replace(pattern, value);
        };
        swap(/<title>[^<]*<\/title>/, `<title>${attr(p.title)} - Ruben Alves</title>`);
        swap(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${attr(desc)}">`);
        swap(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${attr(p.title)} - Ruben Alves">`);
        swap(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${attr(desc)}">`);
        swap(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${ogImage}">`);
        swap(/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${attr(p.title)}">`);
        swap(/<body>/, `<body data-project-id="${attr(p.id)}">`);
        writeFileSync(path.join(OUT, `project-${p.id}.html`), html);
        made.push(p.id);
      }
    }
  }

  // Point the site's own links at the new pages.
  writeFileSync(scriptPath, scriptSrc.replace('const PRETTY_PROJECT_URLS = false;', 'const PRETTY_PROJECT_URLS = true;'));
  for (const page of readdirSync(OUT).filter((f) => f.endsWith('.html'))) {
    const file = path.join(OUT, page);
    const html = readFileSync(file, 'utf8');
    const out = html.replace(/href="project\.html\?id=([A-Za-z0-9_-]+)"/g, (m, id) => (made.includes(id) ? `href="project-${id}.html"` : m));
    if (out !== html) writeFileSync(file, out);
  }
  console.log(`build: ${made.length} project pages (project-<id>.html)`);
}

// ---- Search & sharing extras (only in _site/, generated from the source) ----
// "homepage" in package.json is the live address, e.g.
// https://rubenalvesportefolio.github.io/hub-portfolio/ - link previews
// (Open Graph), canonical links and the sitemap all need full URLs, and
// the 404 page needs to know the folder the site lives in.
const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const homepage = (pkg.homepage || '').trim().replace(/\/?$/, '/');

if (!/^https?:\/\//.test(homepage)) {
  console.warn('build: no "homepage" in package.json - skipping sitemap.xml, canonical links and absolute share-preview URLs.');
} else {
  const base = new URL(homepage);
  const pages = readdirSync(OUT).filter((f) => f.endsWith('.html'));

  for (const page of pages) {
    const file = path.join(OUT, page);
    let html = readFileSync(file, 'utf8');
    // Share previews need an absolute image URL.
    html = html.replace(/(<meta property="og:image" content=")(?!https?:)([^"]+)"/, (m, pre, rel) => `${pre}${new URL(rel, base)}"`);
    if (page === '404.html') {
      // Served for any missing address, at any depth - so relative links
      // must resolve against the site's folder, not the broken URL.
      html = html.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n  <base href="${base.pathname}">`);
    } else if (page !== 'project.html') {
      // project.html is one file for many projects (?id=...), so it gets
      // no canonical/og:url - a single one would tell search engines every
      // project is the same page.
      const url = new URL(page === 'index.html' ? '' : page, base).href;
      html = html.replace('</head>', `  <link rel="canonical" href="${url}">\n  <meta property="og:url" content="${url}">\n</head>`);
    }
    writeFileSync(file, html);
  }

  // sitemap.xml - every page, including the per-project pages above
  // (project.html itself is left out: it only forwards to them).
  const urls = pages
    .filter((p) => !['404.html', 'project.html'].includes(p))
    .map((p) => new URL(p === 'index.html' ? '' : p, base).href);
  const xmlEscape = (v) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  writeFileSync(
    path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${xmlEscape(u)}</loc></url>`)
      .join('\n')}\n</urlset>\n`
  );

  // robots.txt only counts at the root of a domain. A site in a
  // sub-folder (like /hub-portfolio/) can't use one - submit
  // sitemap.xml in Google Search Console instead (see README).
  if (base.pathname === '/') {
    writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', base)}\n`);
  }
  console.log(`build: sitemap.xml (${urls.length} URLs), canonical + share-preview URLs for ${homepage}`);
}

function extractObjectLiteral(src, marker) {
  const start = src.indexOf('{', src.indexOf(marker));
  if (src.indexOf(marker) === -1 || start === -1) return null;
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i === -1) return null; continue; }
    if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2) + 1; if (i === 0) return null; continue; }
    if (c === '"' || c === "'" || c === '`') {
      for (i++; i < src.length && src[i] !== c; i++) if (src[i] === '\\') i++;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return src.slice(start, i + 1);
  }
  return null;
}
