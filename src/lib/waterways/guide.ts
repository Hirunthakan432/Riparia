import type { WaterKind } from "./types";

export type GuideEntry = {
  kind: WaterKind;
  title: string;
  summary: string;
  satellite: string[];
  tells: string[];
};

export const GUIDE: GuideEntry[] = [
  {
    kind: "river",
    title: "River",
    summary:
      "A natural channel draining a catchment toward a sea, lake, or larger river.",
    satellite: [
      "Meanders, point bars, and oxbow scars on the floodplain",
      "Width that changes after tributary junctions",
      "Sediment plume where it meets a lake or coast",
    ],
    tells: [
      "Dendritic tributary tree, not a grid",
      "Variable bank vegetation and sandbars",
      "Follows valley gradient, not property lines",
    ],
  },
  {
    kind: "stream",
    title: "Stream",
    summary: "A small natural watercourse, often unnamed on world maps.",
    satellite: [
      "Narrow, often hidden under a tree line",
      "May vanish into alluvium in dry seasons",
    ],
    tells: [
      "Too small for commercial navigation",
      "May be tagged intermittent or seasonal",
    ],
  },
  {
    kind: "canal",
    title: "Canal",
    summary: "An engineered channel built for navigation, irrigation, or diversion.",
    satellite: [
      "Unnaturally straight reaches and uniform width",
      "Locks, towpaths, right-angle junctions",
      "Cuts across contours instead of following them",
    ],
    tells: [
      "Locks, basins, and named reaches",
      "Levees on both banks of similar height",
      "Connects two existing waters by the shortest practical cut",
    ],
  },
  {
    kind: "lake",
    title: "Lake",
    summary: "A standing natural waterbody with an inlet, outlet, or both.",
    satellite: [
      "Closed shoreline with bays and headlands",
      "Inlet delta and a single outlet on many systems",
    ],
    tells: [
      "Irregular, geology-controlled shoreline",
      "No dam wall at the outlet",
    ],
  },
  {
    kind: "reservoir",
    title: "Reservoir",
    summary: "An impounded lake created by a dam for storage, power, or supply.",
    satellite: [
      "Abrupt linear dam and a drowned river valley above it",
      "Dendritic shoreline of flooded tributaries",
      "Drawdown rings when the pool is low",
    ],
    tells: [
      "Named dam at the outlet",
      "Dead trees or roads ending underwater",
    ],
  },
  {
    kind: "wetland",
    title: "Wetland",
    summary: "Saturated land — marsh, swamp, fen, or bog — with diffuse water.",
    satellite: [
      "Mottled texture, no hard shoreline",
      "Braided light/dark patches of vegetation and open water",
    ],
    tells: [
      "Seasonal extent changes dramatically",
      "Rarely a single named channel",
    ],
  },
  {
    kind: "alkaline",
    title: "Saline lake",
    summary: "A closed-basin lake where evaporation concentrates salts.",
    satellite: [
      "Pale evaporite flats and ringing playa crust",
      "No outlet river",
    ],
    tells: [
      "Endorheic basin",
      "Color shifts with depth and algae (pink, green, white)",
    ],
  },
  {
    kind: "estuary",
    title: "Estuary",
    summary: "A drowned river mouth where freshwater mixes with the tide.",
    satellite: [
      "Funnel-shaped widening toward the sea",
      "Mudflats and shifting channels at low tide",
    ],
    tells: [
      "Tidal tagging on the waterway",
      "Brackish, not a simple lake",
    ],
  },
  {
    kind: "delta",
    title: "Delta",
    summary: "A fan of distributaries where a river drops its sediment load.",
    satellite: [
      "Bird-foot or arcuate branching into the sea",
      "Fresh sediment lobes and abandoned channels",
    ],
    tells: [
      "Many mouths, not one",
      "Sits at a river’s coastal terminus",
    ],
  },
  {
    kind: "oxbow",
    title: "Oxbow",
    summary: "A crescent lake left when a meander is cut off from the river.",
    satellite: [
      "Horseshoe of water beside a straightened channel",
      "Scar of the old meander still visible in fields",
    ],
    tells: ["Always adjacent to a meandering river"],
  },
  {
    kind: "lagoon",
    title: "Lagoon",
    summary: "A coastal pond separated from the sea by a barrier island or reef.",
    satellite: [
      "Longshore bar or spit enclosing still water",
      "Narrow tidal inlet",
    ],
    tells: ["Sits on a coast, not an inland basin"],
  },
  {
    kind: "pond",
    title: "Pond",
    summary: "A small standing waterbody, often farm, mill, or ornamental.",
    satellite: [
      "Compact, often rounded outline",
      "Sits in a field, park, or quarry",
    ],
    tells: ["Human context; too small to be a named lake"],
  },
];

export const SPOTTER: {
  prompt: string;
  answer: WaterKind;
  why: string;
}[] = [
  {
    prompt:
      "A perfectly straight, even-width channel cuts across farmland and meets another waterway at a right angle. Locks are visible as short rectangular basins.",
    answer: "canal",
    why: "Uniform width, locks, and geometric junctions are engineered — not fluvial.",
  },
  {
    prompt:
      "A winding channel with point bars on the inside of bends and a sediment plume at a lake. Tributaries join in a tree pattern.",
    answer: "river",
    why: "Meanders, bars, and a dendritic network are the signature of a natural river.",
  },
  {
    prompt:
      "A drowned valley of water ends at a straight concrete wall. Old roads disappear into the shoreline and side arms look like flooded creeks.",
    answer: "reservoir",
    why: "The dam wall and flooded tributary arms identify an impoundment.",
  },
  {
    prompt:
      "A horseshoe of still water sits in a floodplain next to a livelier, more direct channel.",
    answer: "oxbow",
    why: "Cutoff meanders leave crescent lakes beside the new course.",
  },
  {
    prompt:
      "Pale crust rings a closed inland water with no outlet river. The water sometimes looks pink.",
    answer: "alkaline",
    why: "Endorheic basins concentrate salt; evaporite flats are diagnostic.",
  },
  {
    prompt:
      "The river mouth fans into a dozen smaller channels pushing new land into the sea.",
    answer: "delta",
    why: "Distributaries and prograding lobes mark a delta, not a single estuary funnel.",
  },
];
