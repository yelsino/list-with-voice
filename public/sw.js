if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const p=e=>i(e,c),o={module:{uri:c},exports:t,require:p};s[c]=Promise.all(n.map((e=>o[e]||p(e)))).then((e=>(a(...e),t)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2985bbfa59664ab2155ae6a56a879e6f"},{url:"/_next/static/YUoWMVpczi_uzpAhn7BDq/_buildManifest.js",revision:"b78f2f95f712fdbfd1149569fa52161f"},{url:"/_next/static/YUoWMVpczi_uzpAhn7BDq/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0-602c9a9f52bc12fa.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/14-dc766188898bc5c7.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/214-6468c48e3c8e513c.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/375-895fe0a876364f5a.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/393-aa4bfced33d14612.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/477-c6c1b1762ba77268.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/6-37339c927abc7672.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/637-e6c48134e9ffbe27.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/663-86d9a740424f1119.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/751-7dd6ba617e46ffdb.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/764-72b8023f425dd87b.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/769-0ef61d469eeec960.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/817-9ab02f461386ae2b.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/857-6463f948aad5f834.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/859-2f9945705dbb6364.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/88ba2471-998da97191a9ee51.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/926-c4e6ad003bb256a5.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/961-6cfcc11ef07205d0.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(auth)/login/page-07cba0216c76e3a2.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(auth)/register/page-d52ed70d24bf174f.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(clientes)/clientes/%5BclienteId%5D/page-1094af7f6e7122fa.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(clientes)/clientes/page-0082e766ee575706.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(clientes)/clientes/registrar/page-5e1a9467a9c9089f.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(global)/filtrar/page-d1af3ce7b200dde4.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(global)/seleccionar/cliente/page-eaef2d90a0208b5d.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/configuracion/page-9c2414949bba4c13.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/generar/layout-08b9a6a343065c8f.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/generar/page-b1ee62c5c5db32d3.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/generar/para/page-2b3c1ff70c8d4695.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/listas/%5BlistaId%5D/loading-f97a628ea0c1af01.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/listas/%5BlistaId%5D/page-5f53e7d92f493fe6.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/listas/layout-17b2eb92bac87109.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/listas/loading-20b5891577e5036b.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/listas/page-e18843133494366d.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/negocio/page-71e9f70f956fe8f0.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/productos/%5BproductoId%5D/page-996e19470681f50a.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/productos/crear/page-d7f81f8aa4a33d58.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/(lista-app)/productos/page-978fa13c8a59244e.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/layout-149a0baf70c9f97b.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/app/page-5c0dcc1b8b5806ec.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/bce60fc1-4d3a824050efe904.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/main-app-303806f6de90890b.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/main-ec1a478d3dbe9707.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/pages/_app-998b8fceeadee23e.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/pages/_error-e8b35f8a0cf92802.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-e74f870d8394086b.js",revision:"YUoWMVpczi_uzpAhn7BDq"},{url:"/_next/static/css/d44bf590e9f238cf.css",revision:"d44bf590e9f238cf"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/10a3352fc71482ec-s.woff2",revision:"8c7bbbf5cd4c714fcea338babbbae1ae"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/9b8d9bd9da1c904b-s.woff2",revision:"8c0a8cb80151c0cd6dafdb7fe4d9303a"},{url:"/_next/static/media/c6e04b5f0940e652-s.p.woff2",revision:"5fb7a60bfdb734e7a740615ac0774d7e"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/blob",revision:"ca1afa1f2de97f85c750dec444687bad"},{url:"/icon-192x192.png",revision:"1bc62487234547aa4d1a31e75125d67a"},{url:"/icon-256x256.png",revision:"d53b39a50cb11a410680cd0175b32aec"},{url:"/icon-384x384.png",revision:"d9d7be04cc32a96b34731e057cc1eced"},{url:"/icon-512x512.png",revision:"0afd060f9295d976029a4105c5fd4d62"},{url:"/manifest.webmanifest",revision:"b9b660aaa77c5512196a350923998efa"},{url:"/new.wav",revision:"743e12d7a15790578c3d76c3384c61ec"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/receipt.html",revision:"c011348b61e81b228de51c1cf4c190ab"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
