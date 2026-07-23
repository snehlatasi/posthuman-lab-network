export interface NavigationSubItem {
  label: string;
  href: string;
  description: string;
}

export interface NavigationGroup {
  label: string;
  number: string;
  description: string;
  items: NavigationSubItem[];
}

export const navigationConfig: NavigationGroup[] = [
  {
    label: "Explore",
    number: "01",
    description: "Discover our mission, researchers, publication volumes, and media archives.",
    items: [
      {
        label: "About the Network",
        href: "/about",
        description: "Discover our origin story, core beliefs, and vision for the future."
      },
      {
        label: "Global Lab Networks",
        href: "/labs",
        description: "Engage with our research, creative, ecological, and technological units."
      },
      {
        label: "Publications & Journal",
        href: "/publications",
        description: "Read essays, digital journals, and creative writing from emerging thinkers."
      },
      {
        label: "Media & Audio Archive",
        href: "/media",
        description: "Browse video lectures, visual essays, interviews, and podcast recordings."
      },
      {
        label: "Blog & Reflections",
        href: "/blog",
        description: "Read updates, research diaries, and logs from our global coordinators."
      }
    ]
  },
  {
    label: "Learn",
    number: "02",
    description: "Access open educational pathways, conceptual guides, and foundational bibliographies.",
    items: [
      {
        label: "Free Learning Hub",
        href: "/learning",
        description: "Free academic courses, beginners guides, and study materials."
      },
      {
        label: "Recorded Lectures",
        href: "/learning/recorded-lectures",
        description: "Watch and listen to past presentations and academic discussions."
      },
      {
        label: "Reading Lists & Syllabi",
        href: "/learning/reading-lists",
        description: "Curated bibliographies and academic references on posthumanism."
      },
      {
        label: "Foundational Concepts",
        href: "/learning/foundational-concepts",
        description: "An open dictionary defining essential posthuman terms and ideas."
      }
    ]
  },
  {
    label: "Participate",
    number: "03",
    description: "Join the network, engage in physical retreats, submit papers, and support our operations.",
    items: [
      {
        label: "Become a Member",
        href: "/membership",
        description: "Join as a learner, researcher, or creative collaborator."
      },
      {
        label: "Practice & Gatherings",
        href: "/practice",
        description: "Explore retreat details, workshops, and physical meetups."
      },
      {
        label: "Submit Your Work",
        href: "/publications/submit",
        description: "Contribute creative projects or academic papers to our journal."
      },
      {
        label: "Support the Network",
        href: "/support",
        description: "Enable open-access, sustainable, carbon-conscious academic exchange."
      }
    ]
  },
  {
    label: "Community",
    number: "04",
    description: "Interact with reading circles, speculative diaries, and global research chapters.",
    items: [
      {
        label: "Community Space",
        href: "/community",
        description: "View global reflections, shared experiences, and active projects."
      },
      {
        label: "Global Voices",
        href: "/community/global-voices",
        description: "Read field reports and speculative diaries from around the globe."
      },
      {
        label: "Collaboration & Contact",
        href: "/contact",
        description: "Pitch research joint-ventures, book speakers, or request media packages."
      },
      {
        label: "Research Pitches",
        href: "/contact/collaboration",
        description: "Get in touch regarding institutional partnerships and funding."
      }
    ]
  }
];

export const allSubpages: Record<string, string[]> = {
  blog: [
    "speculative-soil-mapping-forest-bio-telemetry",
    "linguistic-gateways-in-machine-architectures",
    "embodied-clay-digital-to-real-retreat"
  ],
  about: [
    "our-story",
    "what-is-posthumanism",
    "why-we-created-this-network",
    "digital-to-real-practice",
    "founders-collaborators",
    "future-vision"
  ],
  labs: [
    "research",
    "creative",
    "ecological-futures",
    "ai-ethics",
    "experimental-media",
    "collective-practice",
    "community-research",
    "open-collaboration"
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
    "faq"
  ],
  events: [
    "upcoming",
    "register",
    "community-conversations",
    "guest-speakers",
    "international-dialogues",
    "workshops",
    "discussion-themes",
    "archive"
  ],
  media: [
    "youtube-lectures",
    "recorded-sessions",
    "interviews",
    "posthuman-conversations",
    "podcasts",
    "visual-essays",
    "community-projects"
  ],
  membership: [
    "become-a-member",
    "apply",
    "guidelines",
    "volunteer",
    "contributor",
    "researcher-artist-educator",
    "global-ambassadors",
    "emerging-scholars"
  ],
  publications: [
    "submit",
    "emerging-scholars",
    "first-time-writers",
    "collaborative",
    "creative-writing",
    "community-work",
    "digital-journal",
    "archive"
  ],
  practice: [
    "posthumanism",
    "workshops",
    "collective-learning",
    "retreats",
    "embodied-practices",
    "creative-labs",
    "experimental-learning",
    "global-meetups"
  ],
  community: [
    "reflections",
    "global-voices",
    "reading-circles",
    "discussions",
    "future-diaries",
    "creative-showcase",
    "shared-experiences",
    "projects"
  ],
  support: [
    "why-support",
    "current-needs",
    "become-supporter",
    "ethical-partnerships",
    "sponsorship",
    "sustainability"
  ],
  contact: [
    "collaboration",
    "invite-speaker",
    "partnership",
    "media",
    "social"
  ]
};
