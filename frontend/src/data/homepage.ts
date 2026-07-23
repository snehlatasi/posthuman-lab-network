export interface ConversationTheme {
  title: string;
  tag: string;
  description: string;
  href: string;
}

export interface FeaturedLab {
  name: string;
  tag: string;
  description: string;
  href: string;
  number: string;
}

export interface UpcomingMeeting {
  day: string;
  month: string;
  title: string;
  type: string;
  location: string;
  href: string;
}

export interface LatestPublication {
  category: string;
  title: string;
  author: string;
  date: string;
  href: string;
}

export interface LearningPathway {
  number: string;
  title: string;
  description: string;
  href: string;
}

export const conversationsList: ConversationTheme[] = [
  {
    title: "AI & Ethics",
    tag: "Theory / Technology",
    description: "Auditing synthetic cognition architectures, digital bias, and machine agency models.",
    href: "/labs/ai-ethics"
  },
  {
    title: "Ecological Futures",
    tag: "Ecology / Sensing",
    description: "Tracking micro-electrical soil grids, botanical bio-electricity, and organic communication.",
    href: "/labs/ecological-futures"
  },
  {
    title: "Human / Nonhuman Relations",
    tag: "Philosophy / Nature",
    description: "Decentering anthropocentric views. Exploring symbiotic networks and species interdependency.",
    href: "/about/what-is-posthumanism"
  },
  {
    title: "Experimental Media",
    tag: "Creative / Audio-Visual",
    description: "Mapping bio-signals into generative visuals, acoustic ecology soundscapes, and virtual space.",
    href: "/labs/experimental-media"
  },
  {
    title: "Collective Intelligence",
    tag: "Social / Grassroots",
    description: "Designing non-hierarchical open databases, citizen-science audits, and collaborative knowledge maps.",
    href: "/labs/collective-practice"
  }
];

export const featuredLabsList: FeaturedLab[] = [
  {
    number: "01",
    name: "Ecological Futures Lab",
    tag: "Bio-Sensing & Micro-Ecology",
    description: "Interfacing digital circuits with organic botanical networks to study carbon-water signal transductions.",
    href: "/labs/ecological-futures"
  },
  {
    number: "02",
    name: "AI Ethics & Tech Unit",
    tag: "Algorithmic Audits & Machine Agency",
    description: "Critically inspecting synthetic minds, language weights, and decolonial software patterns.",
    href: "/labs/ai-ethics"
  },
  {
    number: "03",
    name: "Experimental Media Studio",
    tag: "Soundscapes & Immersive Space",
    description: "Visualizing bio-voltage outputs inside dynamic browser canvases and spatial virtual topologies.",
    href: "/labs/experimental-media"
  }
];

export const upcomingMeetingsList: UpcomingMeeting[] = [
  {
    day: "12",
    month: "AUG",
    title: "Symbiotic Signals: Plant & Code",
    type: "Seminar & Demonstration",
    location: "Online Zoom / Discord Hub",
    href: "/events/upcoming"
  },
  {
    day: "18",
    month: "SEP",
    title: "Embodied Sensing Woodland Gathering",
    type: "Three-Day Retreat",
    location: "Black Forest Wilderness, Germany",
    href: "/events/upcoming"
  },
  {
    day: "05",
    month: "OCT",
    title: "Decentered Minds: Artificial Agency",
    type: "Hybrid Panel Discussion",
    location: "London Hub / Live Webcast",
    href: "/events/upcoming"
  }
];

export const latestPublicationsList: LatestPublication[] = [
  {
    category: "Critical Philosophy",
    title: "Agential Realism and Nonhuman Subjectivities",
    author: "Dr. Elena Rostova",
    date: "July 2026",
    href: "/publications"
  },
  {
    category: "Generative Art",
    title: "Lichen-Synth: Generative Visual Topologies",
    author: "Marcus Vance",
    date: "June 2026",
    href: "/publications"
  },
  {
    category: "Machine Agency",
    title: "Algorithmic Inquiries on Transformers",
    author: "Anya Chen",
    date: "May 2026",
    href: "/publications"
  }
];

export const learningPathwaysList: LearningPathway[] = [
  {
    number: "01",
    title: "Foundational Concepts",
    description: "Begin with our open dictionary defining posthuman subjectivity, agential realism, and sympoiesis.",
    href: "/learning/foundational-concepts"
  },
  {
    number: "02",
    title: "Beginner Reading Tracks",
    description: "Navigate curated step-by-step pathways and bibliographies to structure self-directed academic studies.",
    href: "/learning/beginner-pathways"
  },
  {
    number: "03",
    title: "Recorded Masterclasses",
    description: "Watch past video seminars and panel discussions led by international researchers and artists.",
    href: "/learning/recorded-lectures"
  }
];
