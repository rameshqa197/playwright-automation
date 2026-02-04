#!/usr/bin/env node
/*
  Minimal static file server for local report viewing.
  Why: Allure reports are a JS SPA that fetches JSON (data/widgets). Opening via file://
  often fails (CORS / failed fetch), which users interpret as 404/blank report.

  Usage:
    node scripts/serve-static.cjs <dir> [port]

  Examples:
    node scripts/serve-static.cjs allure-report 8080
    node scripts/serve-static.cjs site 8080
*/

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const rootArg = process.argv[2];
const port = Number(process.argv[3] || process.env.PORT || 8080);

if (!rootArg) {
  console.error('Usage: node scripts/serve-static.cjs <dir> [port]');
  process.exit(1);
}

const rootDir = path.resolve(process.cwd(), rootArg);

if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
  console.error(`Directory does not exist: ${rootDir}`);
  process.exit(1);
}

const mimeByExt = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function safeJoin(base, target) {
  const targetPath = path.normalize(target).replace(/^([/\\])+/, '');
  const fullPath = path.join(base, targetPath);
  const resolved = path.resolve(fullPath);
  if (!resolved.startsWith(path.resolve(base) + path.sep) && resolved !== path.resolve(base)) {
    return null;
  }
  return resolved;
}

const server = http.createServer((req, res) => {
  try {
    const parsed = url.parse(req.url || '/');
    const pathname = decodeURIComponent(parsed.pathname || '/');

    // Basic hardening / helpful headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // Redirect directory without trailing slash to include it (prevents relative path breakage)
    if (!pathname.endsWith('/') && !path.extname(pathname)) {
      res.statusCode = 301;
      res.setHeader('Location', pathname + '/' + (parsed.search || ''));
      res.end();
      return;
    }

    let filePath = safeJoin(rootDir, pathname);
    if (!filePath) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    // If directory, serve index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', mimeByExt[ext] || 'application/octet-stream');

    fs.createReadStream(filePath)
      .on('error', () => {
        res.statusCode = 500;
        res.end('Internal Server Error');
      })
      .pipe(res);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Internal Server Error');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Serving: ${rootDir}`);
  console.log(`URL: http://127.0.0.1:${port}/`);
});
