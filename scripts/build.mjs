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

  // sitemap.xml - every page plus one entry per visible project page.
  const urls = pages
    .filter((p) => !['404.html', 'project.html'].includes(p))
    .map((p) => new URL(p === 'index.html' ? '' : p, base).href);
  const literal = extractObjectLiteral(readFileSync(path.join(OUT, 'script.js'), 'utf8'), 'const PROJECTS =');
  if (literal) {
    const projects = vm.runInNewContext(`(${literal})`, {}, { timeout: 1000 });
    for (const [category, list] of Object.entries(projects)) {
      if (category === 'commissions') continue; // they have their own pages, listed above
      for (const p of list) if (p.id && !p.hidden) urls.push(new URL(`project.html?id=${encodeURIComponent(p.id)}`, base).href);
    }
  }
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
