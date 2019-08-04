self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/0.js",
    "revision": "489df319242d008b70f4"
  },
  {
    "url": "/_next/static/chunks/styles.js",
    "revision": "ec8e52b1f4ef4ace4ff5"
  },
  {
    "url": "/_next/static/css/styles.chunk.css",
    "revision": "ec8e52b1f4ef4ace4ff5"
  },
  {
    "url": "/_next/static/development/dll/dll_aa8f31c0c93a8f34edc5.js",
    "revision": "315d6f1b0d40a35d1574c722a8c86381"
  },
  {
    "url": "/_next/static/development/pages/_app.js",
    "revision": "b023ef2291fb803763ef"
  },
  {
    "url": "/_next/static/development/pages/_error.js",
    "revision": "b24d689c43e23c6088c8"
  },
  {
    "url": "/_next/static/development/pages/contact.js",
    "revision": "dbebf1f5a45cec1d58bb"
  },
  {
    "url": "/_next/static/development/pages/gallery.js",
    "revision": "9f80f9f4dabc596aee64"
  },
  {
    "url": "/_next/static/development/pages/index.js",
    "revision": "e1967ec206d4cfbfaed4"
  },
  {
    "url": "/_next/static/development/pages/next/dist/pages/_error.js",
    "revision": "a5ce9a7537ae3df3ceb6"
  },
  {
    "url": "/_next/static/runtime/amp.js",
    "revision": "e8e306514b7143f3d99e"
  },
  {
    "url": "/_next/static/runtime/main.js",
    "revision": "eaa905665eebc7a5f69c"
  },
  {
    "url": "/_next/static/runtime/webpack.js",
    "revision": "d18c2356170d991e755c"
  },
  {
    "url": "/_next/static/webpack/622b66f1a5a7d6204fdd.hot-update.json",
    "revision": "161b041b206ad82d7666bf4b22eef8a4"
  }
];

/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.js$/, new workbox.strategies.NetworkFirst({ "cacheName":"js", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\.(png|jpg|jpeg|gif|svg)$/i, new workbox.strategies.NetworkFirst({ "cacheName":"images", plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com/, new workbox.strategies.CacheFirst({ "cacheName":"fonts", plugins: [new workbox.expiration.Plugin({ maxEntries: 3, maxAgeSeconds: 2592000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"fonts", plugins: [] }), 'GET');
