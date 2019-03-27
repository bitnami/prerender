#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
  chromeFlags: [
    '--no-sandbox', // we trust Kubeapps, and it's the only content we'll open
    '--headless',
    '--remote-debugging-port=9222',
  ]
});

server.use(prerender.sendPrerenderHeader());
// server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

// Cache
if (process.env.IN_MEMORY_CACHE) {
  server.use(prerender.inMemoryHtmlCache());
}

if (
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.S3_BUCKET_NAME
) {
  server.use(require('prerender-aws-s3-cache'))
}

server.start();
