//#region node_modules/.nitro/vite/services/ssr/assets/geo-BLJfDxq2.js
var KIND_LABEL = {
	river: "River",
	stream: "Stream",
	canal: "Canal",
	drain: "Drain",
	tidal: "Tidal channel",
	lake: "Lake",
	reservoir: "Reservoir",
	pond: "Pond",
	wetland: "Wetland",
	lagoon: "Lagoon",
	oxbow: "Oxbow",
	alkaline: "Saline lake",
	estuary: "Estuary",
	delta: "Delta",
	unknown: "Waterway"
};
var KIND_COLOR_VAR = {
	river: "var(--color-kind-river)",
	stream: "var(--color-kind-stream)",
	canal: "var(--color-kind-canal)",
	drain: "var(--color-kind-drain)",
	tidal: "var(--color-kind-tidal)",
	lake: "var(--color-kind-lake)",
	reservoir: "var(--color-kind-reservoir)",
	pond: "var(--color-kind-pond)",
	wetland: "var(--color-kind-wetland)",
	lagoon: "var(--color-kind-lagoon)",
	oxbow: "var(--color-kind-oxbow)",
	alkaline: "var(--color-kind-alkaline)",
	estuary: "var(--color-kind-estuary)",
	delta: "var(--color-kind-delta)",
	unknown: "var(--color-kind-unknown)"
};
function atlasKindToWater(kind) {
	if (kind === "alkaline") return "alkaline";
	return kind;
}
function classifyOsm(tags) {
	const ww = tags.waterway;
	const water = tags.water;
	const natural = tags.natural;
	const landuse = tags.landuse;
	if (tags.estuary === "yes" || water === "estuary") return "estuary";
	if (water === "oxbow" || tags.oxbow === "yes") return "oxbow";
	if (ww === "canal") return "canal";
	if (ww === "river" || ww === "riverbank") return "river";
	if (ww === "stream" || ww === "brook") return "stream";
	if (ww === "drain" || ww === "ditch") return "drain";
	if (ww === "tidal_channel" || ww === "fairway") return "tidal";
	if (natural === "wetland" || Boolean(tags.wetland)) return "wetland";
	if (water === "reservoir" || landuse === "reservoir") return "reservoir";
	if (water === "pond" || water === "basin" || water === "reflecting_pool") return "pond";
	if (water === "lagoon") return "lagoon";
	if (water === "salt" || tags.salt === "yes" || tags.salinity === "hypersaline") return "alkaline";
	if (water === "lake" || natural === "water") return "lake";
	if (ww) return "river";
	return "unknown";
}
function cuesFromTags(kind, tags) {
	const cues = [];
	const ww = tags.waterway;
	const water = tags.water;
	const natural = tags.natural;
	if (ww) cues.push(`Mapped as waterway=${ww}`);
	else if (water) cues.push(`Mapped as water=${water}`);
	else if (natural) cues.push(`Mapped as natural=${natural}`);
	if (tags.intermittent === "yes" || tags.seasonal === "yes") cues.push("Seasonal or intermittent flow");
	if (tags.tidal === "yes") cues.push("Tidal influence");
	if (tags.lock) cues.push("Has lock structures — typical of canals");
	if (tags.tunnel === "yes") cues.push("Runs through a tunnel");
	if (tags.bridge === "yes") cues.push("Carried on an aqueduct / bridge");
	if (tags.width) cues.push(`Recorded width ${tags.width} m`);
	if (tags.salt === "yes") cues.push("Saline water");
	if (tags.boat === "yes" || tags.motorboat === "yes") cues.push("Navigable to boats");
	if (tags.dam || tags.water === "reservoir") cues.push("Impounded water behind a dam");
	if (kind === "canal" && !tags.lock) cues.push("Straight engineered channel");
	if (kind === "river") cues.push("Natural channel with tributary network");
	if (kind === "wetland") cues.push("Diffuse shoreline, vegetated water");
	return cues.slice(0, 5);
}
function normalizeName(s) {
	return s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}
var R = 6371e3;
function haversineM(lat1, lon1, lat2, lon2) {
	const p1 = lat1 * Math.PI / 180;
	const p2 = lat2 * Math.PI / 180;
	const dp = (lat2 - lat1) * Math.PI / 180;
	const dl = (lon2 - lon1) * Math.PI / 180;
	const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
	return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function formatKm(m) {
	if (m < 1e3) return `${Math.round(m)} m`;
	if (m < 1e4) return `${(m / 1e3).toFixed(1)} km`;
	return `${Math.round(m / 1e3)} km`;
}
function formatCoord(lat, lon) {
	const ns = lat >= 0 ? "N" : "S";
	const ew = lon >= 0 ? "E" : "W";
	return `${Math.abs(lat).toFixed(3)}° ${ns}  ${Math.abs(lon).toFixed(3)}° ${ew}`;
}
function simplifyLine(coords, max = 80) {
	if (coords.length <= max) return coords;
	const step = Math.ceil(coords.length / max);
	const out = [];
	for (let i = 0; i < coords.length; i += step) out.push(coords[i]);
	const last = coords[coords.length - 1];
	if (out[out.length - 1] !== last) out.push(last);
	return out;
}
//#endregion
export { cuesFromTags as a, haversineM as c, classifyOsm as i, normalizeName as l, KIND_LABEL as n, formatCoord as o, atlasKindToWater as r, formatKm as s, KIND_COLOR_VAR as t, simplifyLine as u };
