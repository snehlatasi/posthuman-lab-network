export interface NetworkLocation {
  id: string;
  name: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  chapterType: string;
  description: string;
  city?: string;
  featured?: boolean;
}

export const networkLocations: NetworkLocation[] = [
  {
    id: "india",
    name: "Posthuman Lab Network — India",
    country: "India",
    region: "South Asia",
    latitude: 20.5937,
    longitude: 78.9629,
    chapterType: "Regional Research Chapter",
    city: "New Delhi / Bengaluru",
    description:
      "Regional chapter connecting researchers, students, artists, and ecological practitioners across India. Focuses on botanical bio-electricity, indigenous ecology, and decolonial tech ethics.",
    featured: true,
  },
  {
    id: "europe",
    name: "Posthuman Lab Network — Europe",
    country: "United Kingdom",
    region: "Western Europe",
    latitude: 51.5074,
    longitude: -0.1278,
    chapterType: "European Philosophy & Sound Hub",
    city: "London / Berlin / Paris",
    description:
      "Interdisciplinary research collective linking European philosophy labs, sound design studios, and environmental humanities institutes.",
    featured: true,
  },
  {
    id: "north-america",
    name: "Posthuman Lab Network — North America",
    country: "United States",
    region: "North America",
    latitude: 40.7128,
    longitude: -74.006,
    chapterType: "Academic Theory & Tech Ethics Unit",
    city: "New York / Boston / Toronto",
    description:
      "Academic nodes advancing algorithmic ethics, critical posthumanism theory, and machine agency audits.",
    featured: true,
  },
  {
    id: "east-asia",
    name: "Posthuman Lab Network — East Asia",
    country: "Japan",
    region: "East Asia",
    latitude: 35.6762,
    longitude: 139.6503,
    chapterType: "Bio-Media & Synthetic Cognition Studio",
    city: "Tokyo / Seoul",
    description:
      "Creative technology research lab exploring synthetic cognition, generative bio-media art, and cybernetic philosophy.",
    featured: true,
  },
  {
    id: "africa",
    name: "Posthuman Lab Network — Africa",
    country: "Kenya",
    region: "East Africa",
    latitude: -1.2921,
    longitude: 36.8219,
    chapterType: "Environmental Sensing & Citizen Science Node",
    city: "Nairobi / Cape Town",
    description:
      "Grassroots research node investigating environmental sensing, open-access citizen science, and distributed knowledge systems.",
    featured: true,
  },
  {
    id: "latin-america",
    name: "Posthuman Lab Network — Latin America",
    country: "Brazil",
    region: "South America",
    latitude: -23.5505,
    longitude: -46.6333,
    chapterType: "Bio-Signal Mapping & Biodiversity Collective",
    city: "São Paulo / Mexico City",
    description:
      "Latin American hub developing bio-signal audio-visual mapping and bio-diversity archives.",
    featured: true,
  },
  {
    id: "oceania",
    name: "Posthuman Lab Network — Oceania",
    country: "Australia",
    region: "Oceania",
    latitude: -25.2744,
    longitude: 133.7751,
    chapterType: "Desert & Marine Acoustics Monitoring Unit",
    city: "Sydney / Melbourne",
    description:
      "Coastal and desert bio-ecology monitoring chapter examining marine acoustics and climate adaptation.",
    featured: false,
  },
];

export function geoToSvg(
  lat: number,
  lng: number,
  svgWidth = 1000,
  svgHeight = 500
): { x: number; y: number } {
  // Equirectangular mapping to viewBox 0 0 1000 500
  const x = ((lng + 180) / 360) * svgWidth;
  const clampedLat = Math.max(-60, Math.min(85, lat));
  const y = ((85 - clampedLat) / 145) * svgHeight;
  return { x, y };
}
