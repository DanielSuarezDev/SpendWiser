if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0c428ae2-839757eb6b198c12.js",revision:"839757eb6b198c12"},{url:"/_next/static/chunks/1bfc9850-f2e219a798ce1ff5.js",revision:"f2e219a798ce1ff5"},{url:"/_next/static/chunks/221-186bade51115b9ed.js",revision:"186bade51115b9ed"},{url:"/_next/static/chunks/252f366e-0d835fd765f1c550.js",revision:"0d835fd765f1c550"},{url:"/_next/static/chunks/441-ffe61f57a602af73.js",revision:"ffe61f57a602af73"},{url:"/_next/static/chunks/527-346ea886cc163a8b.js",revision:"346ea886cc163a8b"},{url:"/_next/static/chunks/675-776579f876d79137.js",revision:"776579f876d79137"},{url:"/_next/static/chunks/949-00a18eddf445c2d2.js",revision:"00a18eddf445c2d2"},{url:"/_next/static/chunks/95b64a6e-36a16ced23fc6065.js",revision:"36a16ced23fc6065"},{url:"/_next/static/chunks/b98bc7c3-0315164923661145.js",revision:"0315164923661145"},{url:"/_next/static/chunks/c31f1870-7b2c8c7f2df4fabd.js",revision:"7b2c8c7f2df4fabd"},{url:"/_next/static/chunks/d64684d8-b23f32a58f185106.js",revision:"b23f32a58f185106"},{url:"/_next/static/chunks/d7eeaac4-0c12270619746849.js",revision:"0c12270619746849"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-41c7a067006caf69.js",revision:"41c7a067006caf69"},{url:"/_next/static/chunks/pages/_app-733dbe29108735ab.js",revision:"733dbe29108735ab"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/history-0ec1f5a8b5610a58.js",revision:"0ec1f5a8b5610a58"},{url:"/_next/static/chunks/pages/history/%5Bid%5D-49662d6520205f02.js",revision:"49662d6520205f02"},{url:"/_next/static/chunks/pages/history/Components/HistoryDetailes-858ea9b90a262b20.js",revision:"858ea9b90a262b20"},{url:"/_next/static/chunks/pages/history/Components/HistoryItem-94229a9859ecdebb.js",revision:"94229a9859ecdebb"},{url:"/_next/static/chunks/pages/history/History-4e2495e55256f8f1.js",revision:"4e2495e55256f8f1"},{url:"/_next/static/chunks/pages/history/History.load-f5e7ee68e2fa2e56.js",revision:"f5e7ee68e2fa2e56"},{url:"/_next/static/chunks/pages/homePage-b314d7ccb59f2b4b.js",revision:"b314d7ccb59f2b4b"},{url:"/_next/static/chunks/pages/homePage/homePage-da6b4d063eabb038.js",revision:"da6b4d063eabb038"},{url:"/_next/static/chunks/pages/index-41aecbf356ee1b16.js",revision:"41aecbf356ee1b16"},{url:"/_next/static/chunks/pages/login-1a362e2994383805.js",revision:"1a362e2994383805"},{url:"/_next/static/chunks/pages/login/Components/SigIn-d825cdf3e4854e76.js",revision:"d825cdf3e4854e76"},{url:"/_next/static/chunks/pages/login/Components/SignUp-b310509f6aa87d0e.js",revision:"b310509f6aa87d0e"},{url:"/_next/static/chunks/pages/login/Login-a508dd177d4586f5.js",revision:"a508dd177d4586f5"},{url:"/_next/static/chunks/pages/login/Login.load-195a9e19f1c897bd.js",revision:"195a9e19f1c897bd"},{url:"/_next/static/chunks/pages/merk-702dfa3d1b49eff8.js",revision:"702dfa3d1b49eff8"},{url:"/_next/static/chunks/pages/merk/Components/MyDataPage-99b435703d776478.js",revision:"99b435703d776478"},{url:"/_next/static/chunks/pages/merk/Merk-4a2021a4da69ed6a.js",revision:"4a2021a4da69ed6a"},{url:"/_next/static/chunks/pages/merk/Merk.load-ffd6ab963b2f14dc.js",revision:"ffd6ab963b2f14dc"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ee7e63bc15b31913.js",revision:"ee7e63bc15b31913"},{url:"/_next/static/css/bd5a93c7e851811c.css",revision:"bd5a93c7e851811c"},{url:"/_next/static/media/allToOne.eb427ae9.png",revision:"35677834e9307d8031e4e4dd84128f85"},{url:"/_next/static/media/avatarDefault.47376275.svg",revision:"6bc073131a4b549d4fbdab46ceaf964e"},{url:"/_next/static/media/box-register.70888376.png",revision:"e7217ed7a94b6dcd1ddb72859a7b9c3d"},{url:"/_next/static/media/box.c3c14921.png",revision:"acce480809ace98aa4379d159f9783d1"},{url:"/_next/static/media/check.7a926657.png",revision:"3f6771521d6f1e5127b7ccf5635bc50d"},{url:"/_next/static/media/hero.af77f56b.png",revision:"ffbcdea938abe7a3e18105b351a7882d"},{url:"/_next/static/media/history.a0208ce3.png",revision:"caaeebb218c8e084de38f5c093993acf"},{url:"/_next/static/media/login-image.21cbe893.png",revision:"ae39f615b190ada64ccd537fa1658e6a"},{url:"/_next/static/media/logo-horizontal.c0a52492.svg",revision:"81d981e4651639da86f5b3c340685a08"},{url:"/_next/static/rpqSw0I7m038ifMT9bBsn/_buildManifest.js",revision:"1576951c9d98b02ff2c55d43b1514676"},{url:"/_next/static/rpqSw0I7m038ifMT9bBsn/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-512x512.png",revision:"886d95bad7804a9e9e339e775deebe0e"},{url:"/icon.png",revision:"798ae6fc990cf7f36fe2d89c2e90bd8c"},{url:"/manifest.json",revision:"b488322299fe1fabba388d64910d40e7"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
