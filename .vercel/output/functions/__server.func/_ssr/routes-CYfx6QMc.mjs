import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Slot } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as cuesFromTags, l as normalizeName, n as KIND_LABEL, o as formatCoord, r as atlasKindToWater, s as formatKm, t as KIND_COLOR_VAR } from "./geo-BLJfDxq2.mjs";
import { i as string, n as number, r as object } from "../_libs/zod.mjs";
import { a as Plus, c as Layers, i as Satellite, l as BookOpen, o as Mountain, r as Search, s as Minus, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as Viewport, n as ScrollAreaScrollbar, r as ScrollAreaThumb, t as Root } from "../_libs/@radix-ui/react-scroll-area+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CYfx6QMc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-elevated text-fg border border-border hover:border-border-strong",
			ghost: "text-muted hover:text-fg hover:bg-elevated",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-accent/20 text-accent",
		outline: "border-border text-muted",
		muted: "border-transparent bg-elevated text-muted"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ScrollArea({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
		className: cn("relative overflow-hidden", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
			orientation: "vertical",
			className: "flex w-2 touch-none select-none p-0.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border-strong" })
		})]
	});
}
function Separator({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "separator",
		className: cn("bg-border shrink-0", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
var CATALOG = [
	{
		aliases: [
			"amazon",
			"amazonas",
			"rio amazonas"
		],
		kind: "river",
		summary: "The Amazon carries more freshwater than the next seven rivers combined. Its mouth is a drowned ria, not a classic delta.",
		lengthKm: 6400,
		dischargeM3s: 209e3,
		basin: "Amazon",
		source: "Andes, Peru",
		mouth: "Atlantic Ocean, Brazil",
		countries: "Peru, Colombia, Brazil",
		note: "Identify by immense width, anabranching islands, and a sediment-brown main stem."
	},
	{
		aliases: [
			"nile",
			"an nil",
			"bahr el abiad",
			"white nile",
			"blue nile",
			"abay"
		],
		kind: "river",
		summary: "The Nile is a desert exotic: it crosses hyper-arid land fed by Ethiopian highland rains and the equatorial lakes.",
		lengthKm: 6650,
		basin: "Nile",
		source: "White Nile — Lake Victoria; Blue Nile — Lake Tana",
		mouth: "Mediterranean, Egypt (Damietta & Rosetta)",
		countries: "Uganda, South Sudan, Sudan, Egypt",
		note: "Look for a thin green ribbon, a braided desert course, and a classic arcuate delta."
	},
	{
		aliases: [
			"yangtze",
			"chang",
			"chang jiang",
			"jinsha",
			"tongtian",
			"tuotuo"
		],
		kind: "river",
		summary: "Asia’s longest river. The Three Gorges impoundment is the tell that the middle Yangtze is heavily regulated.",
		lengthKm: 6300,
		basin: "Yangtze",
		source: "Tibetan Plateau",
		mouth: "East China Sea at Shanghai",
		countries: "China",
		note: "Broad alluvial lower course, heavy shipping, and a funnel estuary at the sea."
	},
	{
		aliases: ["mississippi", "missouri"],
		kind: "river",
		summary: "The Mississippi–Missouri system drains the interior of North America. Meander cutoffs and revetments armor the lower river.",
		lengthKm: 3730,
		basin: "Mississippi",
		source: "Lake Itasca, Minnesota (Mississippi stem)",
		mouth: "Gulf of Mexico, bird-foot delta",
		countries: "United States",
		note: "Identify the bird-foot delta and tightly meandered floodplain with oxbow lakes."
	},
	{
		aliases: [
			"congo",
			"lualaba",
			"zaire"
		],
		kind: "river",
		summary: "The Congo is the world’s deepest river and the second by discharge. It crosses the equator twice.",
		lengthKm: 4700,
		dischargeM3s: 41e3,
		basin: "Congo",
		source: "Highlands of Zambia / Lualaba",
		mouth: "Atlantic Ocean",
		countries: "DRC, Republic of the Congo, Angola",
		note: "A dark, forest-walled channel with rapids (Livingstone Falls) near the mouth."
	},
	{
		aliases: ["mekong", "lancang"],
		kind: "river",
		summary: "A monsoon river whose lower course is a maze of distributaries in Vietnam — the Mekong Delta.",
		lengthKm: 4900,
		basin: "Mekong",
		source: "Tibetan Plateau",
		mouth: "South China Sea",
		countries: "China, Myanmar, Laos, Thailand, Cambodia, Vietnam",
		note: "Seasonal flood pulse; Tonlé Sap reverses into this system."
	},
	{
		aliases: ["danube", "donau"],
		kind: "river",
		summary: "Europe’s second-longest river and a historic navigation spine from the Black Forest to the Black Sea.",
		lengthKm: 2850,
		basin: "Danube",
		source: "Black Forest, Germany",
		mouth: "Black Sea delta, Romania / Ukraine",
		countries: "Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Romania, Bulgaria, Moldova, Ukraine",
		note: "Identify the Danube Delta’s three main arms: Chilia, Sulina, Sfântu Gheorghe."
	},
	{
		aliases: [
			"ganges",
			"ganga",
			"padma"
		],
		kind: "river",
		summary: "Sacred and heavily used. Combined with the Brahmaputra it builds the world’s largest delta.",
		lengthKm: 2525,
		basin: "Ganges–Brahmaputra–Meghna",
		source: "Gangotri Glacier, Himalaya",
		mouth: "Bay of Bengal",
		countries: "India, Bangladesh",
		note: "Braided, sediment-choked, merging into the Sundarbans mangrove delta."
	},
	{
		aliases: [
			"brahmaputra",
			"jamuna",
			"yarlung",
			"dihang"
		],
		kind: "river",
		summary: "A braided Himalayan giant that swings through Assam before joining the Ganges in Bangladesh.",
		lengthKm: 3969,
		basin: "Ganges–Brahmaputra–Meghna",
		source: "Angsi Glacier, Tibet",
		mouth: "Bay of Bengal",
		countries: "China, India, Bangladesh",
		note: "Exceptionally wide braided belt in Assam — a diagnostic satellite signature."
	},
	{
		aliases: ["indus"],
		kind: "river",
		summary: "The spine of the Pakistani plain, fed by Himalayan snowmelt, ending in a large arid delta.",
		lengthKm: 3180,
		basin: "Indus",
		source: "Tibetan Plateau",
		mouth: "Arabian Sea",
		countries: "China, India, Pakistan",
		note: "Narrow green corridor through desert; large dam reservoirs upstream (Tarbela)."
	},
	{
		aliases: ["volga"],
		kind: "river",
		summary: "Europe’s longest river, now a staircase of reservoirs, emptying into the landlocked Caspian.",
		lengthKm: 3530,
		basin: "Volga",
		source: "Valdai Hills",
		mouth: "Caspian Sea",
		countries: "Russia",
		note: "Wide reservoirs and a large inland delta at Astrakhan."
	},
	{
		aliases: ["niger"],
		kind: "river",
		summary: "A boomerang course: from Guinea into the Sahel inland delta, then south to the Atlantic.",
		lengthKm: 4180,
		basin: "Niger",
		source: "Guinea Highlands",
		mouth: "Gulf of Guinea, Nigeria",
		countries: "Guinea, Mali, Niger, Nigeria",
		note: "The Inner Niger Delta is a seasonal inland wetland — not a coastal delta."
	},
	{
		aliases: ["zambezi"],
		kind: "river",
		summary: "Southern Africa’s great east-coast river, broken by Victoria Falls and Kariba / Cahora Bassa dams.",
		lengthKm: 2574,
		basin: "Zambezi",
		source: "Northwest Zambia",
		mouth: "Indian Ocean, Mozambique",
		countries: "Zambia, Angola, Namibia, Botswana, Zimbabwe, Mozambique",
		note: "Identify Victoria Falls as a sharp canyon nick; Kariba is a huge dendritic reservoir."
	},
	{
		aliases: ["orinoco"],
		kind: "river",
		summary: "Drains the Venezuelan–Colombian llanos. The Casiquiare canal is a rare natural bifurcation to the Amazon.",
		lengthKm: 2140,
		basin: "Orinoco",
		source: "Guiana Shield",
		mouth: "Atlantic Ocean, Venezuela",
		countries: "Venezuela, Colombia",
		note: "A wide, island-studded lower course and a classic delta."
	},
	{
		aliases: ["parana", "parana"],
		kind: "river",
		summary: "The Paraná, with the Paraguay, is the Río de la Plata system — South America’s second-largest discharge.",
		lengthKm: 4880,
		basin: "Río de la Plata",
		source: "Brazilian highlands",
		mouth: "Río de la Plata / Atlantic",
		countries: "Brazil, Paraguay, Argentina",
		note: "Itaipu reservoir is a tell on the Brazil–Paraguay reach."
	},
	{
		aliases: ["lena"],
		kind: "river",
		summary: "A great Siberian river ending in a vast Arctic delta — ice-bound much of the year.",
		lengthKm: 4294,
		basin: "Lena",
		source: "Baikal region",
		mouth: "Laptev Sea",
		countries: "Russia",
		note: "The Lena Delta’s radial channels are unmistakable from space."
	},
	{
		aliases: ["ob", "ob river"],
		kind: "river",
		summary: "West Siberian giant joined by the Irtysh, spreading into a huge floodplain.",
		lengthKm: 3650,
		basin: "Ob–Irtysh",
		source: "Altai Mountains",
		mouth: "Gulf of Ob, Arctic Ocean",
		countries: "Russia, Kazakhstan, China, Mongolia",
		note: "Identify the elongated Gulf of Ob as the drowned mouth."
	},
	{
		aliases: [
			"amur",
			"heilong jiang",
			"heilong"
		],
		kind: "river",
		summary: "The border river of the Russian Far East and northeast China.",
		lengthKm: 2824,
		basin: "Amur",
		source: "Onon / Shilka / Argun confluence",
		mouth: "Strait of Tartary",
		countries: "Russia, China",
		note: "Wide floodplain wetlands; ice in winter."
	},
	{
		aliases: [
			"murray",
			"darling",
			"barwon"
		],
		kind: "river",
		summary: "Australia’s principal system. Highly regulated, often low, with a small mouth at Encounter Bay.",
		lengthKm: 2508,
		basin: "Murray–Darling",
		source: "Australian Alps",
		mouth: "Southern Ocean, South Australia",
		countries: "Australia",
		note: "Sinuous, tree-lined, with irrigation weirs — not a high-discharge tropical river."
	},
	{
		aliases: ["yukon"],
		kind: "river",
		summary: "A glacial, braided Alaskan–Yukon river emptying into the Bering Sea.",
		lengthKm: 3190,
		basin: "Yukon",
		source: "British Columbia",
		mouth: "Bering Sea",
		countries: "Canada, United States",
		note: "Broad gravel braid plain and a large coastal delta."
	},
	{
		aliases: [
			"mackenzie",
			"slave",
			"peace"
		],
		kind: "river",
		summary: "Canada’s longest river system, draining Great Slave Lake north to the Arctic Ocean.",
		lengthKm: 1738,
		basin: "Mackenzie",
		source: "Great Slave Lake (stem); Finlay / Peace headwaters",
		mouth: "Beaufort Sea",
		countries: "Canada",
		note: "Identify the Mackenzie Delta’s maze of channels."
	},
	{
		aliases: [
			"st lawrence",
			"st. lawrence",
			"saint lawrence"
		],
		kind: "river",
		summary: "The outlet of the Laurentian Great Lakes and a seaway to the Atlantic.",
		lengthKm: 1197,
		basin: "Great Lakes–St. Lawrence",
		source: "Lake Ontario",
		mouth: "Gulf of St. Lawrence",
		countries: "Canada, United States",
		note: "A broad estuary with the Thousand Islands at the head."
	},
	{
		aliases: ["columbia"],
		kind: "river",
		summary: "A high-power, heavily dammed river of the Pacific Northwest.",
		lengthKm: 2e3,
		basin: "Columbia",
		source: "Columbia Lake, British Columbia",
		mouth: "Pacific Ocean",
		countries: "Canada, United States",
		note: "Staircase reservoirs; a dangerous bar at the mouth."
	},
	{
		aliases: [
			"huang",
			"yellow",
			"huang he",
			"yellow river"
		],
		kind: "river",
		summary: "The Yellow River is named for loess silt. It has changed mouth many times and hangs above its floodplain behind levees.",
		lengthKm: 5464,
		basin: "Yellow",
		source: "Bayankala Mountains",
		mouth: "Bohai Sea",
		countries: "China",
		note: "Distinct ochre color and a raised, levee-bound lower course."
	},
	{
		aliases: [
			"irrawaddy",
			"ayeyarwady",
			"irrawaddy delta"
		],
		kind: "river",
		summary: "Myanmar’s axial river, ending in a wide tide-dominated delta.",
		lengthKm: 2170,
		basin: "Irrawaddy",
		source: "Confluence of Nmai and Mali",
		mouth: "Andaman Sea",
		countries: "Myanmar",
		note: "Identify the fan of tidal distributaries south of Yangon."
	},
	{
		aliases: [
			"euphrates",
			"al furat",
			"firat",
			"shatt al arab"
		],
		kind: "river",
		summary: "With the Tigris, the historic Mesopotamian pair. Heavily dammed; they meet as the Shatt al-Arab.",
		lengthKm: 2800,
		basin: "Tigris–Euphrates",
		source: "Eastern Turkey",
		mouth: "Persian Gulf via Shatt al-Arab",
		countries: "Turkey, Syria, Iraq",
		note: "An arid alluvial course with irrigation canals peeling off the stem."
	},
	{
		aliases: ["suez canal", "suez"],
		kind: "canal",
		summary: "Sea-level cut joining the Mediterranean to the Red Sea — no locks on the main stem.",
		lengthKm: 193,
		basin: "Artificial",
		source: "Port Said",
		mouth: "Suez / Red Sea",
		countries: "Egypt",
		note: "Ruler-straight, even width, Great Bitter Lake as a passing basin."
	},
	{
		aliases: ["panama canal", "panama"],
		kind: "canal",
		summary: "A lock canal lifting ships through Gatun Lake across the isthmus.",
		lengthKm: 82,
		basin: "Chagres / Gatun",
		source: "Caribbean (Colón)",
		mouth: "Pacific (Balboa)",
		countries: "Panama",
		note: "Identify Gatun Lake, the Gaillard Cut, and three lock flights."
	},
	{
		aliases: ["grand canal", "jing hang grand canal"],
		kind: "canal",
		summary: "The world’s longest artificial waterway, linking Beijing’s basin to Hangzhou and the Yangtze.",
		lengthKm: 1776,
		basin: "Hai / Yellow / Yangtze",
		source: "Beijing",
		mouth: "Hangzhou",
		countries: "China",
		note: "A historic north–south cut crossing several natural rivers."
	},
	{
		aliases: ["kiel canal", "nord ostsee kanal"],
		kind: "canal",
		summary: "A lock canal across Schleswig-Holstein joining the North Sea to the Baltic.",
		lengthKm: 98,
		countries: "Germany",
		note: "High banks, ferry crossings, and locks at Brunsbüttel and Holtenau."
	},
	{
		aliases: ["erie canal"],
		kind: "canal",
		summary: "The 19th-century cut that tied the Hudson to Lake Erie and opened the Midwest.",
		lengthKm: 584,
		countries: "United States",
		note: "Follows a lowland corridor across New York with locks and a towpath."
	},
	{
		aliases: ["lake baikal", "baikal"],
		kind: "lake",
		summary: "The deepest and oldest freshwater lake — a rift holding about one-fifth of Earth’s unfrozen fresh water.",
		basin: "Yenisei via Angara",
		countries: "Russia",
		note: "Long, crescent rift; winter ice; Angara is the only outlet."
	},
	{
		aliases: ["lake superior", "superior"],
		kind: "lake",
		summary: "Largest freshwater lake by surface area, head of the Great Lakes cascade.",
		basin: "Great Lakes–St. Lawrence",
		countries: "Canada, United States",
		note: "Irregular shield shoreline; outlet at the Soo toward Huron."
	},
	{
		aliases: [
			"lake nyanza",
			"nyanza",
			"lake victoria",
			"victoria"
		],
		kind: "lake",
		summary: "Africa’s largest lake and the principal source of the White Nile, sitting on a plateau.",
		basin: "Nile",
		countries: "Uganda, Kenya, Tanzania",
		note: "Rounded, island-dotted; Owen Falls / Nalubaale marks the Nile outlet."
	},
	{
		aliases: ["lake tanganyika", "tanganyika"],
		kind: "lake",
		summary: "The world’s longest freshwater lake, a deep African rift.",
		basin: "Congo via Lukuga",
		countries: "Burundi, DRC, Tanzania, Zambia",
		note: "Extremely elongate north–south; very steep sides."
	},
	{
		aliases: [
			"lake malawi",
			"malawi",
			"nyasa"
		],
		kind: "lake",
		summary: "Southern rift lake, famous for cichlid diversity.",
		basin: "Zambezi via Shire",
		countries: "Malawi, Mozambique, Tanzania",
		note: "Elongate rift form; Shire River is the outlet."
	},
	{
		aliases: [
			"lake titicaca",
			"titicaca",
			"lago titicaca"
		],
		kind: "lake",
		summary: "Highest large navigable lake, on the Altiplano.",
		basin: "Endorheic (Desaguadero → Poopó)",
		countries: "Peru, Bolivia",
		note: "High-altitude plateau setting; reed shallows."
	},
	{
		aliases: ["dead sea", "sea of salt"],
		kind: "alkaline",
		summary: "A hypersaline terminal lake, the lowest land elevation on Earth.",
		basin: "Jordan Rift (endorheic)",
		countries: "Jordan, Israel, Palestine",
		note: "No outlet, evaporite works, striking turquoise-to-white shallows."
	},
	{
		aliases: ["great salt", "great salt lake"],
		kind: "alkaline",
		summary: "Remnant of Pleistocene Lake Bonneville; area swings with climate.",
		basin: "Endorheic Great Basin",
		countries: "United States",
		note: "Causeway split, pink/orange shallows, vast salt flats to the west."
	},
	{
		aliases: ["tonle sap", "tonlé sap"],
		kind: "lake",
		summary: "A flood-pulse lake that reverses flow into and out of the Mekong with the monsoon.",
		basin: "Mekong",
		countries: "Cambodia",
		note: "Dramatic seasonal size change — unique identification cue."
	},
	{
		aliases: ["lake mead", "mead"],
		kind: "reservoir",
		summary: "Impoundment of the Colorado behind Hoover Dam.",
		countries: "United States",
		note: "Classic dendritic reservoir; bathtub ring of drawdown is diagnostic."
	},
	{
		aliases: ["kariba"],
		kind: "reservoir",
		summary: "One of the world’s largest reservoirs by volume, on the Zambezi.",
		countries: "Zambia, Zimbabwe",
		note: "Drowned gorge and a long east–west pool."
	}
];
var INDEX = /* @__PURE__ */ new Map();
for (const fact of CATALOG) for (const alias of fact.aliases) INDEX.set(normalizeName(alias), fact);
function factForName(name) {
	if (!name) return void 0;
	const n = normalizeName(name);
	const direct = INDEX.get(n);
	if (direct) return direct;
	for (const [alias, fact] of INDEX) if (n.includes(alias) || alias.includes(n)) return fact;
}
var GUIDE = [
	{
		kind: "river",
		title: "River",
		summary: "A natural channel draining a catchment toward a sea, lake, or larger river.",
		satellite: [
			"Meanders, point bars, and oxbow scars on the floodplain",
			"Width that changes after tributary junctions",
			"Sediment plume where it meets a lake or coast"
		],
		tells: [
			"Dendritic tributary tree, not a grid",
			"Variable bank vegetation and sandbars",
			"Follows valley gradient, not property lines"
		]
	},
	{
		kind: "stream",
		title: "Stream",
		summary: "A small natural watercourse, often unnamed on world maps.",
		satellite: ["Narrow, often hidden under a tree line", "May vanish into alluvium in dry seasons"],
		tells: ["Too small for commercial navigation", "May be tagged intermittent or seasonal"]
	},
	{
		kind: "canal",
		title: "Canal",
		summary: "An engineered channel built for navigation, irrigation, or diversion.",
		satellite: [
			"Unnaturally straight reaches and uniform width",
			"Locks, towpaths, right-angle junctions",
			"Cuts across contours instead of following them"
		],
		tells: [
			"Locks, basins, and named reaches",
			"Levees on both banks of similar height",
			"Connects two existing waters by the shortest practical cut"
		]
	},
	{
		kind: "lake",
		title: "Lake",
		summary: "A standing natural waterbody with an inlet, outlet, or both.",
		satellite: ["Closed shoreline with bays and headlands", "Inlet delta and a single outlet on many systems"],
		tells: ["Irregular, geology-controlled shoreline", "No dam wall at the outlet"]
	},
	{
		kind: "reservoir",
		title: "Reservoir",
		summary: "An impounded lake created by a dam for storage, power, or supply.",
		satellite: [
			"Abrupt linear dam and a drowned river valley above it",
			"Dendritic shoreline of flooded tributaries",
			"Drawdown rings when the pool is low"
		],
		tells: ["Named dam at the outlet", "Dead trees or roads ending underwater"]
	},
	{
		kind: "wetland",
		title: "Wetland",
		summary: "Saturated land — marsh, swamp, fen, or bog — with diffuse water.",
		satellite: ["Mottled texture, no hard shoreline", "Braided light/dark patches of vegetation and open water"],
		tells: ["Seasonal extent changes dramatically", "Rarely a single named channel"]
	},
	{
		kind: "alkaline",
		title: "Saline lake",
		summary: "A closed-basin lake where evaporation concentrates salts.",
		satellite: ["Pale evaporite flats and ringing playa crust", "No outlet river"],
		tells: ["Endorheic basin", "Color shifts with depth and algae (pink, green, white)"]
	},
	{
		kind: "estuary",
		title: "Estuary",
		summary: "A drowned river mouth where freshwater mixes with the tide.",
		satellite: ["Funnel-shaped widening toward the sea", "Mudflats and shifting channels at low tide"],
		tells: ["Tidal tagging on the waterway", "Brackish, not a simple lake"]
	},
	{
		kind: "delta",
		title: "Delta",
		summary: "A fan of distributaries where a river drops its sediment load.",
		satellite: ["Bird-foot or arcuate branching into the sea", "Fresh sediment lobes and abandoned channels"],
		tells: ["Many mouths, not one", "Sits at a river’s coastal terminus"]
	},
	{
		kind: "oxbow",
		title: "Oxbow",
		summary: "A crescent lake left when a meander is cut off from the river.",
		satellite: ["Horseshoe of water beside a straightened channel", "Scar of the old meander still visible in fields"],
		tells: ["Always adjacent to a meandering river"]
	},
	{
		kind: "lagoon",
		title: "Lagoon",
		summary: "A coastal pond separated from the sea by a barrier island or reef.",
		satellite: ["Longshore bar or spit enclosing still water", "Narrow tidal inlet"],
		tells: ["Sits on a coast, not an inland basin"]
	},
	{
		kind: "pond",
		title: "Pond",
		summary: "A small standing waterbody, often farm, mill, or ornamental.",
		satellite: ["Compact, often rounded outline", "Sits in a field, park, or quarry"],
		tells: ["Human context; too small to be a named lake"]
	}
];
var SPOTTER = [
	{
		prompt: "A perfectly straight, even-width channel cuts across farmland and meets another waterway at a right angle. Locks are visible as short rectangular basins.",
		answer: "canal",
		why: "Uniform width, locks, and geometric junctions are engineered — not fluvial."
	},
	{
		prompt: "A winding channel with point bars on the inside of bends and a sediment plume at a lake. Tributaries join in a tree pattern.",
		answer: "river",
		why: "Meanders, bars, and a dendritic network are the signature of a natural river."
	},
	{
		prompt: "A drowned valley of water ends at a straight concrete wall. Old roads disappear into the shoreline and side arms look like flooded creeks.",
		answer: "reservoir",
		why: "The dam wall and flooded tributary arms identify an impoundment."
	},
	{
		prompt: "A horseshoe of still water sits in a floodplain next to a livelier, more direct channel.",
		answer: "oxbow",
		why: "Cutoff meanders leave crescent lakes beside the new course."
	},
	{
		prompt: "Pale crust rings a closed inland water with no outlet river. The water sometimes looks pink.",
		answer: "alkaline",
		why: "Endorheic basins concentrate salt; evaporite flats are diagnostic."
	},
	{
		prompt: "The river mouth fans into a dozen smaller channels pushing new land into the sea.",
		answer: "delta",
		why: "Distributaries and prograding lobes mark a delta, not a single estuary funnel."
	}
];
var ALL_FILTERS = [
	"river",
	"canal",
	"lake",
	"reservoir",
	"alkaline",
	"wetland"
];
var useMapStore = create()((set, get) => ({
	atlas: null,
	atlasError: null,
	basemap: "satellite",
	zoom: 3,
	center: {
		lat: 18,
		lon: 12
	},
	click: null,
	identifying: false,
	identifyError: null,
	selection: null,
	nearby: [],
	recents: [],
	filters: [...ALL_FILTERS],
	guideOpen: false,
	flyTo: null,
	fitBounds: null,
	setAtlas: (atlas) => set({
		atlas,
		atlasError: null
	}),
	setAtlasError: (msg) => set({ atlasError: msg }),
	setBasemap: (basemap) => set({ basemap }),
	setView: (lat, lon, zoom) => set({
		center: {
			lat,
			lon
		},
		zoom
	}),
	setClick: (lat, lon) => set({ click: {
		lat,
		lon
	} }),
	setIdentifying: (identifying) => set({ identifying }),
	setIdentifyError: (identifyError) => set({ identifyError }),
	select: (selection, nearby) => {
		if (!selection) {
			set({
				selection: null,
				nearby: nearby ?? []
			});
			return;
		}
		set({
			selection,
			recents: [selection, ...get().recents.filter((r) => r.name !== selection.name || r.kind !== selection.kind)].slice(0, 8),
			nearby: nearby ?? get().nearby,
			identifyError: null
		});
	},
	toggleFilter: (kind) => {
		const filters = get().filters;
		const next = filters.includes(kind) ? filters.filter((k) => k !== kind) : [...filters, kind];
		set({ filters: next.length ? next : [...ALL_FILTERS] });
	},
	setGuideOpen: (guideOpen) => set({ guideOpen }),
	requestFlyTo: (lat, lon, zoom) => set({ flyTo: {
		lat,
		lon,
		zoom
	} }),
	requestFit: (fitBounds) => set({ fitBounds }),
	clearFly: () => set({
		flyTo: null,
		fitBounds: null
	})
}));
function IdentifyPanel() {
	const selection = useMapStore((s) => s.selection);
	const nearby = useMapStore((s) => s.nearby);
	const identifying = useMapStore((s) => s.identifying);
	const identifyError = useMapStore((s) => s.identifyError);
	const click = useMapStore((s) => s.click);
	const select = useMapStore((s) => s.select);
	const recents = useMapStore((s) => s.recents);
	const requestFlyTo = useMapStore((s) => s.requestFlyTo);
	const fact = factForName(selection?.name);
	const guide = GUIDE.find((g) => g.kind === selection?.kind);
	const cues = selection?.osm?.tags ? cuesFromTags(selection.kind, selection.osm.tags) : guide?.tells.slice(0, 3) ?? [];
	if (!selection && !identifying && !identifyError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "chrome-panel hidden w-full rounded-lg p-5 md:block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg text-fg",
				children: "Identify a waterway"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "Click anywhere on the map. Riparia classifies the nearest river, canal, lake, reservoir, or wetland from live OpenStreetMap hydrography and the world atlas."
			}),
			recents.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.14em] text-subtle uppercase",
					children: "Recent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1",
					children: recents.slice(0, 4).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-elevated",
						onClick: () => {
							select(r);
							requestFlyTo(r.lat, r.lon, 7);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-fg",
							children: r.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 shrink-0 text-[10px] tracking-wider text-muted uppercase",
							children: KIND_LABEL[r.kind]
						})]
					}) }, `${r.name}-${r.kind}`))
				})]
			}) : null
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "chrome-panel flex max-h-[min(40dvh,22rem)] w-full flex-col rounded-lg xl:max-h-[calc(100dvh-8rem)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3 p-4 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.16em] text-subtle uppercase",
					children: identifying ? "Scanning hydrography" : "Identification"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-1 text-xl leading-tight text-fg",
					children: selection?.name ?? "Locating…"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": "Clear identification",
				onClick: () => select(null, []),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
			className: "min-h-0 flex-1 px-4 pb-4",
			children: [selection ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							style: {
								color: KIND_COLOR_VAR[selection.kind],
								background: "color-mix(in oklab, var(--color-elevated) 70%, transparent)",
								borderColor: "color-mix(in oklab, currentColor 35%, transparent)"
							},
							children: KIND_LABEL[selection.kind]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: selection.source === "osm" ? "Live map" : selection.source === "atlas" ? "World atlas" : "Search"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-2 gap-x-3 gap-y-2 text-sm",
						children: [
							selection.region && !fact?.countries ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Region",
								value: selection.region,
								wide: true
							}) : null,
							click ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Fix",
								value: formatCoord(click.lat, click.lon),
								wide: true
							}) : null,
							selection.distanceM != null && selection.distanceM > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Distance",
								value: formatKm(selection.distanceM)
							}) : null,
							fact?.lengthKm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Length",
								value: `${fact.lengthKm.toLocaleString()} km`
							}) : null,
							fact?.dischargeM3s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Discharge",
								value: `${fact.dischargeM3s.toLocaleString()} m³/s`
							}) : null,
							fact?.basin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Basin",
								value: fact.basin
							}) : null,
							fact?.source ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Source",
								value: fact.source
							}) : null,
							fact?.mouth ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Mouth",
								value: fact.mouth
							}) : null,
							fact?.countries ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Countries",
								value: fact.countries,
								wide: true
							}) : null
						]
					}),
					fact?.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: fact.summary
					}) : guide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: guide.summary
					}) : null,
					fact?.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-fg/90",
						children: fact.note
					}) : null,
					cues.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[11px] tracking-[0.14em] text-subtle uppercase",
						children: "Why this class"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5",
						children: cues.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c })]
						}, c))
					})] }) : null,
					guide ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[11px] tracking-[0.14em] text-subtle uppercase",
						children: "Satellite tells"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5",
						children: guide.satellite.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: c
						}, c))
					})] }) : null,
					nearby.filter((h) => h.name !== selection.name).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[11px] tracking-[0.14em] text-subtle uppercase",
							children: "Nearby water"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1",
							children: nearby.filter((h) => h.name !== selection.name).slice(0, 5).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex w-full items-center justify-between rounded-sm px-1 py-1.5 text-left hover:bg-elevated",
								onClick: () => select({
									name: h.name,
									kind: h.kind,
									lat: h.lat,
									lon: h.lon,
									source: "osm",
									osm: h,
									distanceM: h.distanceM,
									geometry: h.geometry,
									region: selection.region
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm text-fg",
									children: h.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 shrink-0 font-mono text-[10px] text-muted uppercase",
									children: KIND_LABEL[h.kind]
								})]
							}) }, h.id))
						})
					] }) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: identifyError ?? "Reading water features around this point."
			}), identifyError && selection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 text-xs text-warn"),
				children: identifyError
			}) : null]
		})]
	});
}
function Stat({ label, value, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: wide ? "col-span-2" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[10px] tracking-[0.12em] text-subtle uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-0.5 text-sm text-fg",
			children: value
		})]
	});
}
function FieldGuide() {
	const open = useMapStore((s) => s.guideOpen);
	const setOpen = useMapStore((s) => s.setGuideOpen);
	const [tab, setTab] = (0, import_react.useState)("types");
	const [qIndex, setQIndex] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	if (!open) return null;
	const q = SPOTTER[qIndex];
	const revealed = picked !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "chrome-panel panel-enter flex max-h-[min(52dvh,32rem)] w-full flex-col rounded-lg xl:max-h-[calc(100dvh-8rem)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 p-4 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.16em] text-subtle uppercase",
					children: "Field guide"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-1 text-xl text-fg",
					children: "How to read water"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: () => setOpen(false),
					"aria-label": "Close guide",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 flex gap-1 rounded-sm bg-elevated p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("h-8 flex-1 rounded-xs text-xs font-medium", tab === "types" ? "bg-surface text-fg" : "text-muted"),
					onClick: () => setTab("types"),
					children: "Types"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("h-8 flex-1 rounded-xs text-xs font-medium", tab === "spotter" ? "bg-surface text-fg" : "text-muted"),
					onClick: () => setTab("spotter"),
					children: "Spotter"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "min-h-0 flex-1 p-4",
				children: tab === "types" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: GUIDE.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-md border border-border bg-elevated/50 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 rounded-full",
									style: { background: KIND_COLOR_VAR[g.kind] }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-medium text-fg",
									children: g.title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: g.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[10px] tracking-[0.12em] text-subtle uppercase",
								children: "From satellite"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1 space-y-1",
								children: g.satellite.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-xs text-muted",
									children: s
								}, s))
							})
						]
					}, g.kind))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-fg",
						children: q.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-2 gap-2",
						children: [
							"river",
							"canal",
							"reservoir",
							"oxbow",
							"alkaline",
							"delta"
						].map((k) => {
							const correct = revealed && k === q.answer;
							const wrong = revealed && picked === k && k !== q.answer;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: revealed,
								onClick: () => setPicked(k),
								className: cn("rounded-sm border px-3 py-2 text-left text-sm", correct ? "border-accent bg-accent/15 text-fg" : wrong ? "border-danger/50 text-danger" : "border-border text-muted hover:border-border-strong hover:text-fg"),
								children: KIND_LABEL[k]
							}, k);
						})
					}),
					revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: picked === q.answer ? "Correct" : "Look again" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: q.why
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-4",
								variant: "secondary",
								onClick: () => {
									setPicked(null);
									setQIndex((i) => (i + 1) % SPOTTER.length);
								},
								children: "Next tell"
							})
						]
					}) : null
				] })
			})
		]
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("flex h-10 w-full rounded-sm border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-40", className),
		...props
	});
}
function allFeatures(atlas) {
	return [...atlas.rivers, ...atlas.lakes];
}
function searchAtlas(atlas, q, limit = 8) {
	const n = normalizeName(q);
	if (n.length < 2) return [];
	const scored = [];
	for (const f of allFeatures(atlas)) {
		const names = [
			f.name,
			f.alt,
			f.native
		].filter(Boolean).join(" ");
		const nn = normalizeName(names);
		if (!nn) continue;
		let s = 0;
		if (nn === n) s = 100;
		else if (nn.startsWith(n)) s = 80;
		else if (nn.includes(n)) s = 60;
		else continue;
		s += Math.max(0, 8 - f.rank);
		scored.push({
			f,
			s
		});
	}
	scored.sort((a, b) => b.s - a.s);
	return scored.slice(0, limit).map((x) => x.f);
}
function featureCentroid(f) {
	const pts = [];
	if (f.lines) for (const line of f.lines) pts.push(...line);
	if (f.rings) for (const poly of f.rings) for (const ring of poly) pts.push(...ring);
	if (pts.length === 0) return {
		lat: 0,
		lon: 0
	};
	let lon = 0;
	let lat = 0;
	for (const p of pts) {
		lon += p[0];
		lat += p[1];
	}
	return {
		lon: lon / pts.length,
		lat: lat / pts.length
	};
}
function featureBounds(f) {
	const pts = [];
	if (f.lines) for (const line of f.lines) pts.push(...line);
	if (f.rings) for (const poly of f.rings) for (const ring of poly) pts.push(...ring);
	if (pts.length === 0) return null;
	let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;
	for (const [lon, lat] of pts) {
		if (lon < minLon) minLon = lon;
		if (lat < minLat) minLat = lat;
		if (lon > maxLon) maxLon = lon;
		if (lat > maxLat) maxLat = lat;
	}
	return [[minLat, minLon], [maxLat, maxLon]];
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var identifyInput = object({
	lat: number().min(-90).max(90),
	lon: number().min(-180).max(180),
	radiusM: number().min(50).max(8e4)
});
createServerFn({ method: "POST" }).validator((input) => identifyInput.parse(input)).handler(createSsrRpc("9b1299feac882ce5a35fd08f9fc51acc5f6e3f5eb854e77046b3e6988ab6bcbe"));
var searchInput = object({ q: string().min(2).max(80) });
var searchNominatim = createServerFn({ method: "POST" }).validator((input) => searchInput.parse(input)).handler(createSsrRpc("fe527ac5c8b77ad80250dd67d4e36dbc26a095ae15941b1c1c1e867b92ca136a"));
function SearchBar() {
	const atlas = useMapStore((s) => s.atlas);
	const select = useMapStore((s) => s.select);
	const requestFit = useMapStore((s) => s.requestFit);
	const requestFlyTo = useMapStore((s) => s.requestFlyTo);
	const setClick = useMapStore((s) => s.setClick);
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [remote, setRemote] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const boxRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const local = (0, import_react.useMemo)(() => {
		if (!atlas || q.trim().length < 2) return [];
		return searchAtlas(atlas, q, 7).map((f) => {
			const c = featureCentroid(f);
			return {
				id: f.id,
				source: "atlas",
				name: f.name,
				kind: atlasKindToWater(f.kind),
				lat: c.lat,
				lon: c.lon,
				subtitle: f.alt || f.native || KIND_LABEL[atlasKindToWater(f.kind)],
				atlasId: f.id
			};
		});
	}, [atlas, q]);
	(0, import_react.useEffect)(() => {
		if (q.trim().length < 3) {
			setRemote([]);
			return;
		}
		const t = setTimeout(() => {
			setLoading(true);
			searchNominatim({ data: { q: q.trim() } }).then(setRemote).catch(() => setRemote([])).finally(() => setLoading(false));
		}, 320);
		return () => clearTimeout(t);
	}, [q]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
				e.preventDefault();
				inputRef.current?.focus();
			}
			if (e.key === "Escape") setOpen(false);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
		function onDoc(e) {
			if (!boxRef.current?.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	const combined = (0, import_react.useMemo)(() => {
		const seen = /* @__PURE__ */ new Set();
		const out = [];
		for (const h of [...local, ...remote]) {
			const key = h.name.toLowerCase();
			if (seen.has(key)) continue;
			seen.add(key);
			out.push(h);
		}
		return out.slice(0, 8);
	}, [local, remote]);
	function pick(hit) {
		setQ(hit.name);
		setOpen(false);
		setClick(hit.lat, hit.lon);
		const atlasFeat = hit.atlasId && atlas ? atlas.rivers.find((r) => r.id === hit.atlasId) ?? atlas.lakes.find((r) => r.id === hit.atlasId) : void 0;
		select({
			name: hit.name,
			kind: hit.kind,
			lat: hit.lat,
			lon: hit.lon,
			source: hit.source === "atlas" ? "atlas" : "search",
			atlasId: hit.atlasId,
			region: hit.subtitle
		});
		if (atlasFeat) {
			const b = featureBounds(atlasFeat);
			if (b) requestFit(b);
			else requestFlyTo(hit.lat, hit.lon, 6);
		} else requestFlyTo(hit.lat, hit.lon, 10);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: boxRef,
		className: "relative w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				ref: inputRef,
				value: q,
				onChange: (e) => {
					setQ(e.target.value);
					setOpen(true);
				},
				onFocus: () => setOpen(true),
				placeholder: "Search a waterway",
				className: "h-11 rounded-md border-0 bg-transparent pr-10 pl-10 shadow-none focus-visible:ring-0",
				"aria-label": "Search waterways"
			}),
			q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center text-subtle hover:text-fg",
				onClick: () => {
					setQ("");
					setRemote([]);
					inputRef.current?.focus();
				},
				"aria-label": "Clear search",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded-xs border border-border px-1.5 font-mono text-[10px] text-subtle md:inline",
				children: "/"
			}),
			open && (combined.length > 0 || loading) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "chrome-panel absolute top-[calc(100%+8px)] right-0 left-0 z-30 overflow-hidden rounded-md py-1",
				children: [loading && combined.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-2 text-sm text-muted",
					children: "Searching hydrography…"
				}) : null, combined.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => pick(hit),
					className: cn("flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-elevated"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 font-mono text-[10px] tracking-wider text-accent uppercase",
						children: KIND_LABEL[hit.kind]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm text-fg",
							children: hit.name
						}), hit.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-xs text-muted",
							children: hit.subtitle
						}) : null]
					})]
				}) }, hit.id))]
			}) : null
		]
	});
}
var BASEMAPS = [
	{
		id: "satellite",
		label: "Satellite",
		icon: Satellite
	},
	{
		id: "chart",
		label: "Chart",
		icon: Layers
	},
	{
		id: "terrain",
		label: "Terrain",
		icon: Mountain
	}
];
function AppChrome() {
	const basemap = useMapStore((s) => s.basemap);
	const setBasemap = useMapStore((s) => s.setBasemap);
	const filters = useMapStore((s) => s.filters);
	const toggleFilter = useMapStore((s) => s.toggleFilter);
	const zoom = useMapStore((s) => s.zoom);
	const center = useMapStore((s) => s.center);
	const identifying = useMapStore((s) => s.identifying);
	const guideOpen = useMapStore((s) => s.guideOpen);
	const setGuideOpen = useMapStore((s) => s.setGuideOpen);
	const requestFlyTo = useMapStore((s) => s.requestFlyTo);
	const selection = useMapStore((s) => s.selection);
	function bumpZoom(delta) {
		requestFlyTo(center.lat, center.lon, Math.min(18, Math.max(2, zoom + delta)));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10 flex flex-col p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] md:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pointer-events-auto flex flex-col gap-3 md:flex-row md:items-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "chrome-panel flex items-center gap-3 rounded-md px-3 py-2 md:px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none text-fg italic",
							children: "Riparia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[10px] tracking-[0.18em] text-subtle uppercase",
							children: "Waterway atlas"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "chrome-panel min-w-0 flex-1 rounded-md md:max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chrome-panel ml-auto flex items-center gap-1 rounded-md p-1",
						children: [BASEMAPS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							className: cn("h-9 gap-1.5 px-2.5", basemap === b.id && "bg-elevated text-fg"),
							onClick: () => setBasemap(b.id),
							"aria-pressed": basemap === b.id,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: b.label
							})]
						}, b.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: guideOpen ? "default" : "ghost",
							size: "sm",
							className: "h-9 gap-1.5 px-2.5",
							onClick: () => setGuideOpen(!guideOpen),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Guide"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto mt-3 lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: ALL_FILTERS.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggleFilter(kind),
						className: cn("chrome-panel flex h-9 shrink-0 items-center gap-2 rounded-full px-3 text-xs", filters.includes(kind) ? "text-fg" : "text-subtle"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2 rounded-full",
							style: {
								background: KIND_COLOR_VAR[kind],
								opacity: filters.includes(kind) ? 1 : .3
							}
						}), KIND_LABEL[kind]]
					}, kind))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex min-h-0 flex-1 items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto hidden w-56 shrink-0 flex-col gap-2 lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "chrome-panel rounded-md p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] tracking-[0.14em] text-subtle uppercase",
								children: "Show"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1",
								children: ALL_FILTERS.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
									kind,
									on: filters.includes(kind),
									onToggle: () => toggleFilter(kind)
								}, kind))
							})]
						}), identifying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md border border-border bg-surface/90 px-3 py-2 text-xs text-muted",
							children: "Reading live hydrography…"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-w-0 flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-auto hidden w-[22rem] shrink-0 flex-col gap-3 xl:flex",
						children: guideOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGuide, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentifyPanel, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto mt-3 flex items-end justify-between gap-3 xl:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: guideOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGuide, {}) : selection || identifying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentifyPanel, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "chrome-panel rounded-md px-3 py-2 text-xs text-muted",
						children: "Tap the map to identify a river, lake, or canal."
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "pointer-events-none mt-auto flex items-end justify-between gap-3 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto chrome-panel hidden max-w-sm rounded-md px-3 py-2 text-[11px] text-muted xl:block",
					children: "Click the map to classify a waterway. Atlas overlay from Natural Earth; live tags from OpenStreetMap."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto ml-auto flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chrome-panel hidden rounded-md px-3 py-2 font-mono text-[11px] text-muted tabular md:block",
						children: [
							formatCoord(center.lat, center.lon),
							" · z",
							Math.round(zoom)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chrome-panel flex overflow-hidden rounded-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "rounded-none",
							onClick: () => bumpZoom(-1),
							"aria-label": "Zoom out",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "rounded-none",
							onClick: () => bumpZoom(1),
							"aria-label": "Zoom in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
						})]
					})]
				})]
			})
		]
	});
}
function FilterChip({ kind, on, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onToggle,
		className: cn("flex h-9 w-full items-center gap-2 rounded-sm px-2 text-left text-sm", on ? "text-fg" : "text-subtle"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-2 rounded-full",
			style: {
				background: KIND_COLOR_VAR[kind],
				opacity: on ? 1 : .3
			}
		}), KIND_LABEL[kind]]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh overflow-hidden bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapFallback, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppChrome, {})]
	});
}
function MapFallback() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-0 bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 opacity-40",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-1/3 h-px bg-accent/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-1/2 w-px bg-accent/10" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute bottom-16 left-1/2 -translate-x-1/2 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-fg italic",
				children: "Riparia"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Charting waterways…"
			})]
		})]
	});
}
//#endregion
export { Home as component };
