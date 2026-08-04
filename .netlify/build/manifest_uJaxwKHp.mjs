import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_HEADER, g as decodeKey } from './chunks/astro/server_C3-z53zB.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Jackb/Downloads/New%20folder%20(2)/jengacalc/","adapterName":"@astrojs/netlify","routes":[{"file":"calculator/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/calculator","isIndex":false,"type":"page","pattern":"^\\/calculator\\/?$","segments":[[{"content":"calculator","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/calculator.astro","pathname":"/calculator","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"counties/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/counties","isIndex":true,"type":"page","pattern":"^\\/counties\\/?$","segments":[[{"content":"counties","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/counties/index.astro","pathname":"/counties","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"guides/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guides","isIndex":true,"type":"page","pattern":"^\\/guides\\/?$","segments":[[{"content":"guides","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guides/index.astro","pathname":"/guides","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"prices/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/prices","isIndex":false,"type":"page","pattern":"^\\/prices\\/?$","segments":[[{"content":"prices","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/prices.astro","pathname":"/prices","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"sitemap.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\.xml\\/?$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.xml.ts","pathname":"/sitemap.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"submit-build-cost/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/submit-build-cost","isIndex":false,"type":"page","pattern":"^\\/submit-build-cost\\/?$","segments":[[{"content":"submit-build-cost","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/submit-build-cost.astro","pathname":"/submit-build-cost","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/build-cost","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/build-cost\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"build-cost","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/build-cost.ts","pathname":"/api/build-cost","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/price","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/price\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"price","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/price.ts","pathname":"/api/price","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://jengacalc.co.ke","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Jackb/Downloads/New folder (2)/jengacalc/src/pages/calculator.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jackb/Downloads/New folder (2)/jengacalc/src/pages/counties/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/Jackb/Downloads/New folder (2)/jengacalc/src/pages/counties/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jackb/Downloads/New folder (2)/jengacalc/src/pages/guides/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/Jackb/Downloads/New folder (2)/jengacalc/src/pages/guides/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jackb/Downloads/New folder (2)/jengacalc/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jackb/Downloads/New folder (2)/jengacalc/src/pages/prices.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jackb/Downloads/New folder (2)/jengacalc/src/pages/submit-build-cost.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/build-cost@_@ts":"pages/api/build-cost.astro.mjs","\u0000@astro-page:src/pages/api/price@_@ts":"pages/api/price.astro.mjs","\u0000@astro-page:src/pages/calculator@_@astro":"pages/calculator.astro.mjs","\u0000@astro-page:src/pages/counties/[slug]@_@astro":"pages/counties/_slug_.astro.mjs","\u0000@astro-page:src/pages/counties/index@_@astro":"pages/counties.astro.mjs","\u0000@astro-page:src/pages/guides/[slug]@_@astro":"pages/guides/_slug_.astro.mjs","\u0000@astro-page:src/pages/guides/index@_@astro":"pages/guides.astro.mjs","\u0000@astro-page:src/pages/prices@_@astro":"pages/prices.astro.mjs","\u0000@astro-page:src/pages/sitemap.xml@_@ts":"pages/sitemap.xml.astro.mjs","\u0000@astro-page:src/pages/submit-build-cost@_@astro":"pages/submit-build-cost.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_uJaxwKHp.mjs","C:/Users/Jackb/Downloads/New folder (2)/jengacalc/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","@/components/PriceTracker.tsx":"_astro/PriceTracker.BwP3G4RE.js","/astro/hoisted.js?q=0":"_astro/hoisted.h1nIx15T.js","@/components/CostCalculator.tsx":"_astro/CostCalculator.BMAhj5D_.js","@astrojs/react/client.js":"_astro/client.BIGLHmRd.js","/astro/hoisted.js?q=1":"_astro/hoisted.U4U80kly.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/calculator.yFXIiulW.css","/favicon.svg","/robots.txt","/_astro/client.BIGLHmRd.js","/_astro/clientStore.CG9upLWk.js","/_astro/CostCalculator.BMAhj5D_.js","/_astro/hoisted.h1nIx15T.js","/_astro/hoisted.U4U80kly.js","/_astro/index.DhYZZe0J.js","/_astro/kenya.CGVdRWNH.js","/_astro/PriceTracker.BwP3G4RE.js","/calculator/index.html","/counties/index.html","/guides/index.html","/prices/index.html","/sitemap.xml","/submit-build-cost/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"RQFRaHwqg047HHMwwTral80/43UXjxwAqEWlKRyVpPM=","experimentalEnvGetSecretEnabled":false});

export { manifest };
