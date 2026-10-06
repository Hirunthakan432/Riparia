import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { c as haversineM, i as classifyOsm, u as simplifyLine } from "./geo-BLJfDxq2.mjs";
import { i as string, n as number, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/identify-fn-DDahYrfw.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var UA = "Riparia/1.0 (waterway identification atlas)";
var OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];
async function fetchJson(url, init, timeoutMs) {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), timeoutMs);
	try {
		const res = await fetch(url, {
			...init,
			signal: ctrl.signal,
			headers: {
				"user-agent": UA,
				...init.headers ?? {}
			}
		});
		if (!res.ok) throw new Error(`Upstream ${res.status}`);
		return await res.json();
	} finally {
		clearTimeout(t);
	}
}
function nameFromTags(tags) {
	return tags.name || tags["name:en"] || tags.alt_name || tags.loc_name || tags.ref || "Unnamed waterway";
}
function toHit(el, lat, lon) {
	const tags = el.tags ?? {};
	const center = el.center ?? (el.lat != null && el.lon != null ? {
		lat: el.lat,
		lon: el.lon
	} : el.geometry && el.geometry.length ? {
		lat: el.geometry[Math.floor(el.geometry.length / 2)].lat,
		lon: el.geometry[Math.floor(el.geometry.length / 2)].lon
	} : null);
	if (!center) return null;
	const geom = el.geometry && el.geometry.length >= 2 ? {
		type: "LineString",
		coordinates: simplifyLine(el.geometry.map((p) => [p.lon, p.lat]), 100)
	} : void 0;
	return {
		id: `${el.type}/${el.id}`,
		osmType: el.type,
		osmId: el.id,
		name: nameFromTags(tags),
		kind: classifyOsm(tags),
		tags,
		lat: center.lat,
		lon: center.lon,
		distanceM: haversineM(lat, lon, center.lat, center.lon),
		geometry: geom
	};
}
async function overpassAround(lat, lon, radiusM) {
	const query = `[out:json][timeout:12];
(
  way["waterway"](around:${Math.round(radiusM)},${lat},${lon});
  way["natural"="water"](around:${Math.round(radiusM)},${lat},${lon});
  way["landuse"="reservoir"](around:${Math.round(radiusM)},${lat},${lon});
  way["natural"="wetland"](around:${Math.round(radiusM)},${lat},${lon});
  relation["waterway"~"^(river|canal)$"](around:${Math.round(radiusM)},${lat},${lon});
  relation["natural"="water"](around:${Math.round(radiusM)},${lat},${lon});
);
out tags center 30;
`;
	let lastErr;
	for (const endpoint of OVERPASS) try {
		const hits = ((await fetchJson(endpoint, {
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({ data: query })
		}, 14e3)).elements ?? []).map((el) => toHit(el, lat, lon)).filter((h) => Boolean(h));
		hits.sort((a, b) => {
			const named = Number(a.name !== "Unnamed waterway") - Number(b.name !== "Unnamed waterway");
			if (named !== 0) return named > 0 ? -1 : 1;
			return a.distanceM - b.distanceM;
		});
		const seen = /* @__PURE__ */ new Set();
		const unique = [];
		for (const h of hits) {
			const key = `${h.kind}:${h.name}`;
			if (seen.has(key) && h.name !== "Unnamed waterway") continue;
			seen.add(key);
			unique.push(h);
			if (unique.length >= 12) break;
		}
		return unique;
	} catch (err) {
		lastErr = err;
	}
	throw lastErr instanceof Error ? lastErr : /* @__PURE__ */ new Error("Overpass failed");
}
async function reverseGeocode(lat, lon) {
	try {
		const a = (await fetchJson(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`, { method: "GET" }, 8e3)).address ?? {};
		const label = [a.city || a.town || a.village || a.county || a.state, a.country].filter(Boolean).join(", ");
		if (!label) return void 0;
		return {
			label,
			country: a.country
		};
	} catch {
		return;
	}
}
var identifyInput = object({
	lat: number().min(-90).max(90),
	lon: number().min(-180).max(180),
	radiusM: number().min(50).max(8e4)
});
var identifyAt_createServerFn_handler = createServerRpc({
	id: "9b1299feac882ce5a35fd08f9fc51acc5f6e3f5eb854e77046b3e6988ab6bcbe",
	name: "identifyAt",
	filename: "src/lib/waterways/identify-fn.ts"
}, (opts) => identifyAt.__executeServer(opts));
var identifyAt = createServerFn({ method: "POST" }).validator((input) => identifyInput.parse(input)).handler(identifyAt_createServerFn_handler, async ({ data }) => {
	const [hits, region] = await Promise.all([overpassAround(data.lat, data.lon, data.radiusM).catch(() => []), reverseGeocode(data.lat, data.lon)]);
	return {
		hits,
		region
	};
});
var searchInput = object({ q: string().min(2).max(80) });
function kindFromNominatim(cls, type) {
	if (type === "canal") return "canal";
	if (type === "stream" || type === "brook") return "stream";
	if (type === "reservoir") return "reservoir";
	if (type === "wetland" || type === "marsh") return "wetland";
	if (type === "lagoon") return "lagoon";
	if (type === "pond") return "pond";
	if (type === "lake" || type === "sea") return "lake";
	if (cls === "waterway") return "river";
	if (cls === "natural") return "lake";
	return "unknown";
}
var searchNominatim_createServerFn_handler = createServerRpc({
	id: "fe527ac5c8b77ad80250dd67d4e36dbc26a095ae15941b1c1c1e867b92ca136a",
	name: "searchNominatim",
	filename: "src/lib/waterways/identify-fn.ts"
}, (opts) => searchNominatim.__executeServer(opts));
var searchNominatim = createServerFn({ method: "POST" }).validator((input) => searchInput.parse(input)).handler(searchNominatim_createServerFn_handler, async ({ data }) => {
	const json = await fetchJson(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&addressdetails=0&q=${encodeURIComponent(data.q)}`, { method: "GET" }, 8e3);
	if (!Array.isArray(json)) return [];
	return json.filter((r) => r.class === "waterway" || r.class === "natural" || r.class === "landuse" || /water|river|lake|canal/i.test(r.display_name)).slice(0, 6).map((r) => ({
		id: `nom-${r.place_id}`,
		source: "nominatim",
		name: r.name || r.display_name.split(",")[0],
		kind: kindFromNominatim(r.class, r.type),
		lat: Number(r.lat),
		lon: Number(r.lon),
		subtitle: r.display_name
	}));
});
//#endregion
export { identifyAt_createServerFn_handler, searchNominatim_createServerFn_handler };
