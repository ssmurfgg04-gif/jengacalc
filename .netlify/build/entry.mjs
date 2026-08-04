import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_uJaxwKHp.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/build-cost.astro.mjs');
const _page2 = () => import('./pages/api/price.astro.mjs');
const _page3 = () => import('./pages/calculator.astro.mjs');
const _page4 = () => import('./pages/counties/_slug_.astro.mjs');
const _page5 = () => import('./pages/counties.astro.mjs');
const _page6 = () => import('./pages/guides/_slug_.astro.mjs');
const _page7 = () => import('./pages/guides.astro.mjs');
const _page8 = () => import('./pages/prices.astro.mjs');
const _page9 = () => import('./pages/sitemap.xml.astro.mjs');
const _page10 = () => import('./pages/submit-build-cost.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/build-cost.ts", _page1],
    ["src/pages/api/price.ts", _page2],
    ["src/pages/calculator.astro", _page3],
    ["src/pages/counties/[slug].astro", _page4],
    ["src/pages/counties/index.astro", _page5],
    ["src/pages/guides/[slug].astro", _page6],
    ["src/pages/guides/index.astro", _page7],
    ["src/pages/prices.astro", _page8],
    ["src/pages/sitemap.xml.ts", _page9],
    ["src/pages/submit-build-cost.astro", _page10],
    ["src/pages/index.astro", _page11]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "25812ba0-c732-42a4-b7bf-39789bf847d6"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
