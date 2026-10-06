const R = 6371000;

export function haversineM(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dp = ((lat2 - lat1) * Math.PI) / 180;
  const dl = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function distToSegmentM(
  lat: number,
  lon: number,
  a: [number, number],
  b: [number, number],
): number {
  const [lon1, lat1] = a;
  const [lon2, lat2] = b;
  const vx = lon2 - lon1;
  const vy = lat2 - lat1;
  const wx = lon - lon1;
  const wy = lat - lat1;
  const c1 = vx * wx + vy * wy;
  if (c1 <= 0) return haversineM(lat, lon, lat1, lon1);
  const c2 = vx * vx + vy * vy;
  if (c2 <= c1) return haversineM(lat, lon, lat2, lon2);
  const t = c1 / c2;
  return haversineM(lat, lon, lat1 + t * vy, lon1 + t * vx);
}

export function distToLineM(
  lat: number,
  lon: number,
  line: [number, number][],
): number {
  let min = Infinity;
  for (let i = 1; i < line.length; i++) {
    min = Math.min(min, distToSegmentM(lat, lon, line[i - 1], line[i]));
  }
  return min;
}

export function pointInRing(
  lon: number,
  lat: number,
  ring: [number, number][],
): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi + 0.0000001) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function formatKm(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  if (m < 10000) return `${(m / 1000).toFixed(1)} km`;
  return `${Math.round(m / 1000)} km`;
}

export function formatCoord(lat: number, lon: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(3)}° ${ns}  ${Math.abs(lon).toFixed(3)}° ${ew}`;
}

export function radiusForZoom(zoom: number): number {
  if (zoom >= 13) return 700;
  if (zoom >= 11) return 1800;
  if (zoom >= 9) return 5000;
  if (zoom >= 7) return 14000;
  if (zoom >= 5) return 28000;
  return 50000;
}

export function rankForZoom(zoom: number): number {
  if (zoom >= 8) return 8;
  if (zoom >= 6) return 6;
  if (zoom >= 5) return 5;
  if (zoom >= 4) return 4;
  if (zoom >= 3) return 3;
  return 2;
}

export function simplifyLine(
  coords: [number, number][],
  max = 80,
): [number, number][] {
  if (coords.length <= max) return coords;
  const step = Math.ceil(coords.length / max);
  const out: [number, number][] = [];
  for (let i = 0; i < coords.length; i += step) out.push(coords[i]);
  const last = coords[coords.length - 1];
  if (out[out.length - 1] !== last) out.push(last);
  return out;
}
