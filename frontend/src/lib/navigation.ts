export interface NavigationSubItem {
  label: string;
  href: string;
  description: string;
}

export interface NavigationGroup {
  label: string;
  number: string;
  href: string;
  description: string;
  items: NavigationSubItem[];
}

export const navigationConfig: NavigationGroup[] = [
  {
    label: "About",
    number: "01",
    href: "/about",
    description: "Understand the network, its origin, collaborators, and posthuman orientation.",
    items: [
      {
        label: "Our Story",
        href: "/about/our-story",
        description: "Trace the project history and the need it responds to.",
      },
      {
        label: "What is Posthumanism",
        href: "/about/what-is-posthumanism",
        description: "Start with the field's core ideas, questions, and tensions.",
      },
      {
        label: "Founders & Collaborators",
        href: "/about/founders-collaborators",
        description: "Meet the people shaping the network and its practices.",
      },
      {
        label: "Future Vision",
        href: "/about/future-vision",
        description: "See where the network is heading over the coming phases.",
      },
    ],
  },
  {
    label: "Research",
    number: "02",
    href: "/research",
    description: "Move through research cells, creative studios, ecological futures, and AI ethics.",
    items: [
      {
        label: "AI Ethics",
        href: "/research/ai-ethics",
        description: "Study machine agency, accountability, and posthuman governance.",
      },
      {
        label: "Ecological Futures",
        href: "/research/ecological-futures",
        description: "Explore planetary repair, multispecies relations, and future ecologies.",
      },
      {
        label: "Open Collaboration",
        href: "/research/open-collaboration",
        description: "Find opportunities for shared research and creative experiments.",
      },
    ],
  },
  {
    label: "Learning",
    number: "03",
    href: "/learning",
    description:
      "Access open educational pathways, conceptual guides, and foundational bibliographies.",
    items: [
      {
        label: "Introduction to Posthumanism",
        href: "/learning/introduction-to-posthumanism",
        description: "Begin with a guided entry point into posthuman thought.",
      },
      {
        label: "Recorded Lectures",
        href: "/learning/recorded-lectures",
        description: "Watch and listen to past presentations and academic discussions.",
      },
      {
        label: "Reading Lists & Syllabi",
        href: "/learning/reading-lists",
        description: "Curated bibliographies and academic references on posthumanism.",
      },
      {
        label: "Foundational Concepts",
        href: "/learning/foundational-concepts",
        description: "An open dictionary defining essential posthuman terms and ideas.",
      },
    ],
  },
  {
    label: "Events",
    number: "04",
    href: "/events",
    description: "Find upcoming gatherings, workshops, conversations, and event archives.",
    items: [
      {
        label: "Upcoming Events",
        href: "/events/upcoming",
        description: "See the next conversations, workshops, and public sessions.",
      },
      {
        label: "Workshops",
        href: "/events/workshops",
        description: "Join practical sessions around methods, making, and dialogue.",
      },
      {
        label: "Event Archive",
        href: "/events/archive",
        description: "Review past gatherings and recorded programming.",
      },
    ],
  },
  {
    label: "Media",
    number: "05",
    href: "/media",
    description: "Browse video lectures, visual essays, interviews, and recorded sessions.",
    items: [
      {
        label: "YouTube Lectures",
        href: "/media/youtube-lectures",
        description: "Watch public lectures and extended conversations.",
      },
      {
        label: "Recorded Sessions",
        href: "/media/recorded-sessions",
        description: "Return to previous live sessions and seminar recordings.",
      },
      {
        label: "Visual Essays",
        href: "/media/visual-essays",
        description: "Explore image-led and experimental media work.",
      },
    ],
  },
  {
    label: "Community",
    number: "06",
    href: "/community",
    description:
      "Interact with reading circles, speculative diaries, and global research chapters.",
    items: [
      {
        label: "Global Voices",
        href: "/community/global-voices",
        description: "Read field reports and speculative diaries from around the globe.",
      },
      {
        label: "Reading Circles",
        href: "/community/reading-circles",
        description: "Join study groups and recurring discussion circles.",
      },
      {
        label: "Community Projects",
        href: "/community/projects",
        description: "See shared experiments, local chapters, and network initiatives.",
      },
    ],
  },
  {
    label: "Blog",
    number: "07",
    href: "/blog",
    description: "Read essays, research diaries, announcements, and reflective field notes.",
    items: [
      {
        label: "Publications & Journal",
        href: "/publications",
        description: "Read essays, digital journals, and creative writing.",
      },
      {
        label: "Submit Your Work",
        href: "/publications/submit",
        description: "Contribute creative projects or academic papers to our journal.",
      },
    ],
  },
  {
    label: "Support",
    number: "08",
    href: "/support",
    description: "Support open access, ethical partnerships, and network sustainability.",
    items: [
      {
        label: "Why Support",
        href: "/support/why-support",
        description: "Understand what support makes possible.",
      },
      {
        label: "Become a Member",
        href: "/membership",
        description: "Join as a learner, researcher, or creative collaborator.",
      },
      {
        label: "Collaboration & Contact",
        href: "/support/contact",
        description: "Pitch partnerships, invite speakers, or request media packages.",
      },
    ],
  },
];

export const allSubpages: Record<string, string[]> = {
  blog: [
    "speculative-soil-mapping-forest-bio-telemetry",
    "linguistic-gateways-in-machine-architectures",
    "embodied-clay-digital-to-real-retreat",
  ],
  about: [
    "our-story",
    "what-is-posthumanism",
    "why-we-created-this-network",
    "digital-to-real-practice",
    "founders-collaborators",
    "future-vision",
  ],
  research: [
    "research",
    "creative",
    "ecological-futures",
    "ai-ethics",
    "experimental-media",
    "collective-practice",
    "community-research",
    "open-collaboration",
  ],
  learning: [
    "introduction-to-posthumanism",
    "beginner-pathways",
    "recorded-lectures",
    "foundational-concepts",
    "reading-lists",
    "study-materials",
    "downloads",
    "archive",
    "faq",
  ],
  events: [
    "upcoming",
    "register",
    "community-conversations",
    "guest-speakers",
    "international-dialogues",
    "workshops",
    "discussion-themes",
    "archive",
  ],
  media: [
    "youtube-lectures",
    "recorded-sessions",
    "interviews",
    "posthuman-conversations",
    "podcasts",
    "visual-essays",
    "community-projects",
  ],
  membership: [
    "become-a-member",
    "apply",
    "guidelines",
    "volunteer",
    "contributor",
    "researcher-artist-educator",
    "global-ambassadors",
    "emerging-scholars",
  ],
  publications: [
    "submit",
    "emerging-scholars",
    "first-time-writers",
    "collaborative",
    "creative-writing",
    "community-work",
    "digital-journal",
    "archive",
  ],
  practice: [
    "posthumanism",
    "workshops",
    "collective-learning",
    "retreats",
    "embodied-practices",
    "creative-labs",
    "experimental-learning",
    "global-meetups",
  ],
  community: [
    "reflections",
    "global-voices",
    "reading-circles",
    "discussions",
    "future-diaries",
    "creative-showcase",
    "shared-experiences",
    "projects",
  ],
  support: [
    "contact",
    "collaboration",
    "invite-speaker",
    "partnership",
    "media",
    "social",
    "why-support",
    "current-needs",
    "become-supporter",
    "ethical-partnerships",
    "sponsorship",
    "sustainability",
  ],
};

const subpageLabels: Record<string, Record<string, string>> = {
  community: {
    reflections: "Reflections",
    "global-voices": "Global Voices",
    "reading-circles": "Reading Circles",
    discussions: "Discussions",
    "future-diaries": "Future Diaries",
    "creative-showcase": "Creative Showcase",
    "shared-experiences": "Shared Experiences",
    projects: "Projects",
  },
};

export function getSubpageLabel(section: string, subpage: string) {
  const configuredLabel = subpageLabels[section]?.[subpage];
  if (configuredLabel) return configuredLabel;

  return subpage
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getSectionSubpageLinks(section: string, activeSubpage?: string) {
  return (allSubpages[section] || []).map((subpage) => ({
    label: getSubpageLabel(section, subpage),
    href: `/${section}/${subpage}`,
    active: subpage === activeSubpage,
  }));
}

export function getNextSectionSubpage(section: string, currentSubpage: string) {
  const subpages = allSubpages[section] || [];
  const currentIndex = subpages.indexOf(currentSubpage);
  if (currentIndex < 0 || currentIndex >= subpages.length - 1) return null;

  const nextSubpage = subpages[currentIndex + 1];
  return {
    label: getSubpageLabel(section, nextSubpage),
    href: `/${section}/${nextSubpage}`,
  };
}
