export interface PageItem {
  title: string;
  subtitle?: string;
  description: string;
  tag?: string;
  date?: string;
  href?: string;
}

export interface EditorialSection {
  heading: string;
  content: string;
}

export interface PageContent {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  layout: "editorial" | "listing" | "form";
  parentLabel?: string;
  parentHref?: string;
  // Editorial layout data
  editorialSections?: EditorialSection[];
  // Listing layout data
  items?: PageItem[];
  // Form layout data
  formType?: "contact" | "collaboration" | "submission" | "membership";
  // Related links
  relatedLinks?: { label: string; href: string }[];
}

export const pagesContentMap: Record<string, PageContent> = {
  // ----------------------------------------------------
  // ABOUT SECTION
  // ----------------------------------------------------
  "about/why-we-created-this-network": {
    slug: "why-we-created-this-network",
    title: "WHY WE CREATED THIS NETWORK",
    eyebrow: "Pillars",
    description: "An inquiry into institutional silos, open knowledge systems, and collaborative futures.",
    layout: "editorial",
    parentLabel: "About",
    parentHref: "/about",
    editorialSections: [
      {
        heading: "Breaking Institutional Silos",
        content: "Traditional academic structures often restrict critical discourse to paywalled journals and exclusive conferences. We created the Posthuman Lab Network to build horizontal pathways connecting independent thinkers, artists, developers, and established scholars without institutional gatekeeping."
      },
      {
        heading: "Knowledge as an Ecosystem",
        content: "We believe knowledge is not a static human product, but a dynamic ecosystem. Our programs are designed to treat technical code, philosophy, and environmental sensing as interconnected expressions of a shared planetary intelligence."
      }
    ],
    relatedLinks: [
      { label: "Our Story", href: "/about/our-story" },
      { label: "What is Posthumanism?", href: "/about/what-is-posthumanism" }
    ]
  },
  "about/digital-to-real-practice": {
    slug: "digital-to-real-practice",
    title: "DIGITAL TO REAL PRACTICE",
    eyebrow: "Methodology",
    description: "Translating speculative critical theory into tactile, local, real-world community actions.",
    layout: "editorial",
    parentLabel: "About",
    parentHref: "/about",
    editorialSections: [
      {
        heading: "Speculation to Embodiment",
        content: "Philosophy should not exist solely as screen text. Our methodology bridges technical development (Next.js, Spring Boot, micro-electronics) with physical soil interactions, clay sculpting, and off-grid retreats. We test theories of posthuman agency by engaging with nonhuman actors directly."
      },
      {
        heading: "Decentralized Action Cells",
        content: "Our members form localized cells to run ecological sensors, set up community forums, and host translation circles. These physical gatherings ensure that our planetary networking remains grounded in real-world practices."
      }
    ],
    relatedLinks: [
      { label: "Practice & Gatherings", href: "/practice" },
      { label: "Future Vision", href: "/about/future-vision" }
    ]
  },
  "about/future-vision": {
    slug: "future-vision",
    title: "FUTURE VISION",
    eyebrow: "Horizon",
    description: "Strategic trajectories for interdisciplinary collaboration and technical expansion over the next decade.",
    layout: "editorial",
    parentLabel: "About",
    parentHref: "/about",
    editorialSections: [
      {
        heading: "Distributed Sensing Networks",
        content: "Our primary technical milestone is establishing a global, low-power sensing network. By deploying micro-controllers in collaboration with forest cells, we aim to map ecological telemetry data directly into a decentralized open archive."
      },
      {
        heading: "CC Academy & Open Press",
        content: "We are expanding our open-press publications to provide peer-reviewed, free-access publishing tracks for emerging scholars and experimental media practitioners who challenge anthropocentric paradigms."
      }
    ],
    relatedLinks: [
      { label: "Why Support?", href: "/support/why-support" },
      { label: "Become a Member", href: "/membership/become-a-member" }
    ]
  },

  // ----------------------------------------------------
  // LABS SECTION
  // ----------------------------------------------------
  "labs/research": {
    slug: "research",
    title: "RESEARCH CELL",
    eyebrow: "Labs",
    description: "Investigating agency, decolonial computing, and post-anthropocentric ethics.",
    layout: "listing",
    parentLabel: "Labs",
    parentHref: "/labs",
    items: [
      {
        title: "Decentered Cognitive Architectures",
        description: "Auditing transformer neural weights and language assumptions from decolonial perspectives.",
        tag: "Active Project"
      },
      {
        title: "Symbiotic Systems Ethics",
        description: "Developing ethical frameworks that encompass nonhuman, botanical, and algorithm agents.",
        tag: "Working Group"
      }
    ],
    relatedLinks: [
      { label: "AI Ethics Lab", href: "/labs/ai-ethics" },
      { label: "Open Collaboration", href: "/labs/open-collaboration" }
    ]
  },
  "labs/creative": {
    slug: "creative",
    title: "CREATIVE CELL",
    eyebrow: "Labs",
    description: "Generative visuals, acoustic ecology, and biosensor-driven space design.",
    layout: "listing",
    parentLabel: "Labs",
    parentHref: "/labs",
    items: [
      {
        title: "Lichen-Synth Visual Topologies",
        description: "Mapping slow growth patterns of biological lichen into dynamic canvas graphics.",
        tag: "Art Installation"
      },
      {
        title: "Acoustic Forest Ecology",
        description: "Recording sub-audible woodland electrical currents and converting them to modular synthesizers.",
        tag: "Audio Project"
      }
    ],
    relatedLinks: [
      { label: "Experimental Media Lab", href: "/labs/experimental-media" },
      { label: "Collective Practice", href: "/labs/collective-practice" }
    ]
  },
  "labs/collective-practice": {
    slug: "collective-practice",
    title: "COLLECTIVE PRACTICE",
    eyebrow: "Labs",
    description: "Co-designing open-source community libraries, archives, and collective datasets.",
    layout: "listing",
    parentLabel: "Labs",
    parentHref: "/labs",
    items: [
      {
        title: "Decentralized Knowledge Ledger",
        description: "A secure, peer-to-peer bibliography indexing database managed by regional study cells.",
        tag: "Software Library"
      },
      {
        title: "Citizen-Science Bio-Audits",
        description: "Creating open instructions for mapping local plant species and environmental soil health.",
        tag: "Community Tool"
      }
    ],
    relatedLinks: [
      { label: "Ecological Futures Lab", href: "/labs/ecological-futures" },
      { label: "Community Research", href: "/labs/community-research" }
    ]
  },
  "labs/community-research": {
    slug: "community-research",
    title: "COMMUNITY RESEARCH CELL",
    eyebrow: "Labs",
    description: "Grassroots inquiries on local environmental changes and digital commons.",
    layout: "listing",
    parentLabel: "Labs",
    parentHref: "/labs",
    items: [
      {
        title: "Waterway Sensors Audit",
        description: "Deploying low-cost turbidity sensors in urban streams to document pollution timelines.",
        tag: "Grassroots Project"
      },
      {
        title: "Open Digital Commons Mapping",
        description: "Documenting free local spaces, tool lending libraries, and community gardens.",
        tag: "Database Initiative"
      }
    ],
    relatedLinks: [
      { label: "Collective Practice Lab", href: "/labs/collective-practice" },
      { label: "Why Support?", href: "/support/why-support" }
    ]
  },
  "labs/open-collaboration": {
    slug: "open-collaboration",
    title: "OPEN COLLABORATION CELL",
    eyebrow: "Labs",
    description: "Ad-hoc temporary project groups linking external artists and research hubs.",
    layout: "listing",
    parentLabel: "Labs",
    parentHref: "/labs",
    items: [
      {
        title: "Planetary Synthesizer Hackathon",
        description: "A virtual workshop mapping global temperature vectors into modular sound patterns.",
        tag: "Seasonal Focus"
      },
      {
        title: "Decolonial Software Patterns",
        description: "Collaborative translation of interface guidelines into multiple regional languages.",
        tag: "Translation Circle"
      }
    ],
    relatedLinks: [
      { label: "Research Lab", href: "/labs/research" },
      { label: "Collaboration Contact", href: "/contact/collaboration" }
    ]
  },
  "labs/experimental-media": {
    slug: "experimental-media",
    title: "EXPERIMENTAL MEDIA CELL",
    eyebrow: "Labs",
    description: "Mapping biodata signals into generative browser interfaces.",
    layout: "listing",
    parentLabel: "Labs",
    parentHref: "/labs",
    items: [
      {
        title: "Bio-Voltage Browser Interface",
        description: "Using standard Web Audio APIs to represent botanical voltages inside Next.js components.",
        tag: "Active Project"
      },
      {
        title: "Speculative Visual Essays",
        description: "Constructing multi-linear reading platforms using custom Framer Motion timelines.",
        tag: "Journal Project"
      }
    ],
    relatedLinks: [
      { label: "Creative Lab", href: "/labs/creative" },
      { label: "YouTube Lectures", href: "/media/youtube-lectures" }
    ]
  },

  // ----------------------------------------------------
  // LEARNING SECTION
  // ----------------------------------------------------
  "learning/beginner-pathways": {
    slug: "beginner-pathways",
    title: "BEGINNER READING PATHWAYS",
    eyebrow: "Learning",
    description: "Structured introductory tracks for navigating posthuman philosophy.",
    layout: "listing",
    parentLabel: "Learning",
    parentHref: "/learning",
    items: [
      {
        title: "Track 1: Decentering the Human",
        description: "A 4-week bibliography trace covering primary shifts in cognitive anthropocentrism.",
        tag: "Curriculum Map"
      },
      {
        title: "Track 2: Introduction to Sympoiesis",
        description: "Readings and podcasts introducing collective biological systems and Haraway's theories.",
        tag: "Curriculum Map"
      }
    ],
    relatedLinks: [
      { label: "Foundational Concepts", href: "/learning/foundational-concepts" },
      { label: "Reading Lists", href: "/learning/reading-lists" }
    ]
  },
  "learning/study-materials": {
    slug: "study-materials",
    title: "STUDY MATERIALS & GUIDES",
    eyebrow: "Learning",
    description: "Syllabi drafts, workshop handouts, and collective reading summaries.",
    layout: "listing",
    parentLabel: "Learning",
    parentHref: "/learning",
    items: [
      {
        title: "Posthuman Subjectivity Workshop Guide",
        description: "Discussion outlines, writing prompts, and exercise descriptions for local study cells.",
        tag: "Syllabus Handout"
      },
      {
        title: "Decolonial Computing Framework Guide",
        description: "Core questions for auditing digital software platforms and cloud architecture assumptions.",
        tag: "Handout Guide"
      }
    ],
    relatedLinks: [
      { label: "Introduction to Posthumanism", href: "/learning/introduction-to-posthumanism" },
      { label: "Open Archive", href: "/learning/open-archive" }
    ]
  },
  "learning/downloads": {
    slug: "downloads",
    title: "OPEN DOWNLOADS WORKSPACE",
    eyebrow: "Learning",
    description: "Print-ready PDFs, sensor schematic diagrams, and open-source code libraries.",
    layout: "listing",
    parentLabel: "Learning",
    parentHref: "/learning",
    items: [
      {
        title: "Soil Electro-Sensor Schematic",
        description: "Open-hardware blueprint for building ESP32 botanical signal transmitters.",
        tag: "PDF / Hardware Design"
      },
      {
        title: "Framer Motion Animation Primitives",
        description: "Code blocks and configuration templates matching our digital-organic UI system.",
        tag: "ZIP / Code Assets"
      }
    ],
    relatedLinks: [
      { label: "Open Archive", href: "/learning/open-archive" },
      { label: "Submit Your Work", href: "/publications/submit" }
    ]
  },
  "learning/open-archive": {
    slug: "open-archive",
    title: "OPEN DATA ARCHIVE",
    eyebrow: "Learning",
    description: "Public CC-licensed database of translated essays, research parameters, and code logs.",
    layout: "listing",
    parentLabel: "Learning",
    parentHref: "/learning",
    items: [
      {
        title: "Ecology Data Logs: Black Forest",
        description: "Raw soil telemetry measurements collected during the September physical retreat.",
        tag: "CSV Dataset"
      },
      {
        title: "Symposium Translation Manuscripts",
        description: "Translations of critical posthuman philosophy essays into four regional languages.",
        tag: "PDF Archive"
      }
    ],
    relatedLinks: [
      { label: "Recorded Lectures", href: "/learning/recorded-lectures" },
      { label: "Why Support?", href: "/support/why-support" }
    ]
  },
  "learning/faq": {
    slug: "faq",
    title: "FREQUENTLY ASKED QUESTIONS",
    eyebrow: "Learning",
    description: "Answers to common conceptual and structural questions about the Posthuman Lab Network.",
    layout: "listing",
    parentLabel: "Learning",
    parentHref: "/learning",
    items: [
      {
        title: "What does 'Posthuman' mean in this context?",
        description: "It refers to decentering the human observer and understanding agency as distributed across nature, technology, and ecosystems, rather than than focusing on sci-fi transhumanism.",
        tag: "Conceptual FAQ"
      },
      {
        title: "How do I start a local study cell?",
        description: "Download the Study Materials guide, organize 3-4 peers locally, and register your cell through our Contact forms to link your observations.",
        tag: "Community FAQ"
      }
    ],
    relatedLinks: [
      { label: "Become a Member", href: "/membership/become-a-member" },
      { label: "General Contact", href: "/contact/general" }
    ]
  },

  // ----------------------------------------------------
  // EVENTS SECTION
  // ----------------------------------------------------
  "events/past": {
    slug: "past",
    title: "PAST EVENTS ARCHIVE",
    eyebrow: "Events",
    description: "Documented history of our physical meetups, online panels, and woodland workshops.",
    layout: "listing",
    parentLabel: "Events",
    parentHref: "/events",
    items: [
      {
        title: "Lichen-Synth Installation",
        description: "A week-long presentation of lichen generative visual canvas mappings held in Berlin.",
        tag: "Art Show — June 2026"
      },
      {
        title: "Open Code and Decolonial Webs Panel",
        description: "Online roundtable auditing server dependencies and decolonial frameworks.",
        tag: "Webcast — March 2026"
      }
    ],
    relatedLinks: [
      { label: "Upcoming Events", href: "/events/upcoming" },
      { label: "Recorded Sessions", href: "/media/recorded-sessions" }
    ]
  },
  "events/global-conversations": {
    slug: "global-conversations",
    title: "GLOBAL CONVERSATIONS",
    eyebrow: "Events",
    description: "Online roundtable discussions linking regional cells to share research files.",
    layout: "listing",
    parentLabel: "Events",
    parentHref: "/events",
    items: [
      {
        title: "Intra-actions: Decentering Space",
        description: "A monthly discussion circle focused on quantum physics and agential realism.",
        tag: "Online Discussion"
      },
      {
        title: "Ecosystem Telemetry Roundtable",
        description: "Sharing sensor hardware design problems and local database parameters.",
        tag: "Online Panel"
      }
    ],
    relatedLinks: [
      { label: "Upcoming Events", href: "/events/upcoming" },
      { label: "Global Voices", href: "/community/global-voices" }
    ]
  },
  "events/workshops": {
    slug: "workshops",
    title: "WORKSHOPS & MASTERCLASSES",
    eyebrow: "Events",
    description: "Hands-on instruction circles covering hardware, audio sensing, and philosophy.",
    layout: "listing",
    parentLabel: "Events",
    parentHref: "/events",
    items: [
      {
        title: "Building ESP32 Soil Sensors",
        description: "Step-by-step tutorial on assembling micro-controllers and biological interfaces.",
        tag: "Technical Workshop"
      },
      {
        title: "Soundscapes and Acoustic Ecology",
        description: "Introduction to binaural field recording and modular signal conversion.",
        tag: "Creative Workshop"
      }
    ],
    relatedLinks: [
      { label: "Woodland Workshops", href: "/practice/workshops" },
      { label: "Recorded Lectures", href: "/learning/recorded-lectures" }
    ]
  },
  "events/guest-speakers": {
    slug: "guest-speakers",
    title: "GUEST SPEAKER SEMINARS",
    eyebrow: "Events",
    description: "Special presentations hosted by international researchers and artists.",
    layout: "listing",
    parentLabel: "Events",
    parentHref: "/events",
    items: [
      {
        title: "Agential Realism and Nonhuman Subjectivities",
        description: "Masterclass presentation by Dr. Elena Rostova exploring Barad's physical theories.",
        tag: "Guest Seminar"
      },
      {
        title: "Decentered Web Networks",
        description: "Exploring low-power, distributed protocols and lightweight interface designs.",
        tag: "Guest Seminar"
      }
    ],
    relatedLinks: [
      { label: "Recorded Lectures", href: "/learning/recorded-lectures" },
      { label: "Research Lab", href: "/labs/research" }
    ]
  },

  // ----------------------------------------------------
  // MEDIA SECTION
  // ----------------------------------------------------
  "media/podcasts": {
    slug: "podcasts",
    title: "POSTHUMAN CONVERSATIONS PODCAST",
    eyebrow: "Media",
    description: "Audio discussions with researchers, philosophers, artists, and educators.",
    layout: "listing",
    parentLabel: "Media",
    parentHref: "/media",
    items: [
      {
        title: "Episode 12: Soil Signals and Plant Voltages",
        description: "A conversation on building physical interfaces between plants and modular synthesizers.",
        tag: "Podcast Audio"
      },
      {
        title: "Episode 11: Decentering the Human Web",
        description: "A debate on low-power servers, static generation, and the carbon cost of modern AI.",
        tag: "Podcast Audio"
      }
    ],
    relatedLinks: [
      { label: "Recorded Sessions", href: "/media/recorded-sessions" },
      { label: "Interviews Archive", href: "/media/interviews" }
    ]
  },
  "media/interviews": {
    slug: "interviews",
    title: "INTERVIEWS & CONVERSATIONS",
    eyebrow: "Media",
    description: "Transcripts and recorded transcripts of exchanges with creative practitioners.",
    layout: "listing",
    parentLabel: "Media",
    parentHref: "/media",
    items: [
      {
        title: "Speculative Architectures: Interview with Marcus Vance",
        description: "Discussing spatial visual topologies, lichen models, and browser-canvas rendering.",
        tag: "Text Transcript"
      },
      {
        title: "Decolonial Software Networks: Interview with Anya Chen",
        description: "Discussing language constraints in algorithmic models and collaborative coding patterns.",
        tag: "Text Transcript"
      }
    ],
    relatedLinks: [
      { label: "Podcast Series", href: "/media/podcasts" },
      { label: "YouTube Lectures", href: "/media/youtube-lectures" }
    ]
  },
  "media/documentaries": {
    slug: "documentaries",
    title: "RETREAT DOCUMENTARIES",
    eyebrow: "Media",
    description: "Short video summaries documenting our woodland retreat sessions.",
    layout: "listing",
    parentLabel: "Media",
    parentHref: "/media",
    items: [
      {
        title: "Black Forest Off-Grid Retrospective",
        description: "A 10-minute visual essay documenting our 3-day retreat writing code and clay sculpting.",
        tag: "Video Documentary"
      },
      {
        title: "Community Sensor Deployment Logs",
        description: "Video documentation of local cells setting up turbidity sensors in urban streams.",
        tag: "Video Documentary"
      }
    ],
    relatedLinks: [
      { label: "Recorded Sessions", href: "/media/recorded-sessions" },
      { label: "Practice & Gatherings", href: "/practice" }
    ]
  },

  // ----------------------------------------------------
  // MEMBERSHIP SECTION
  // ----------------------------------------------------
  "membership/benefits": {
    slug: "benefits",
    title: "MEMBERSHIP BENEFITS & VALUES",
    eyebrow: "Membership",
    description: "What it means to join our distributed network. Values, open resources, and grants.",
    layout: "editorial",
    parentLabel: "Membership",
    parentHref: "/membership",
    editorialSections: [
      {
        heading: "CC-Academy Resources",
        content: "Members receive full access to our study guides, reading list outlines, print-ready PDFs, and code repositories. We operate on a CC-BY-NC license, ensuring you can use and translate our guides for local cell workshops."
      },
      {
        heading: "Research Collaboration Slots",
        content: "Members can submit research papers directly to our publications press, apply for project collaboration spaces inside active Labs, and receive invites to off-grid wilderness retreat events."
      }
    ],
    relatedLinks: [
      { label: "Become a Member", href: "/membership/become-a-member" },
      { label: "Participate pathways", href: "/membership/participate" }
    ]
  },
  "membership/participate": {
    slug: "participate",
    title: "HOW TO PARTICIPATE",
    eyebrow: "Membership",
    description: "Engagement paths for learners, research writers, artists, and local organizers.",
    layout: "editorial",
    parentLabel: "Membership",
    parentHref: "/membership",
    editorialSections: [
      {
        heading: "As a Learner",
        content: "Start by navigating the Foundational Concepts glossary and reading maps. Download study materials and attend monthly virtual Global Conversations."
      },
      {
        heading: "As a Cell Organizer",
        content: "Gather 3-4 peers in your city, set up a monthly schedule to discuss articles or deploy local water/soil sensors, and register your cell through our Contact forms to coordinate outputs."
      }
    ],
    relatedLinks: [
      { label: "Become a Member", href: "/membership/become-a-member" },
      { label: "General Contact", href: "/contact/general" }
    ]
  },

  // ----------------------------------------------------
  // PUBLICATIONS SECTION
  // ----------------------------------------------------
  "publications/articles": {
    slug: "articles",
    title: "ACADEMIC ARTICLES",
    eyebrow: "Publications",
    description: "Peer-reviewed critical essays focusing on posthuman philosophy and technology.",
    layout: "listing",
    parentLabel: "Publications",
    parentHref: "/publications",
    items: [
      {
        title: "Agential Realism and Nonhuman Subjectivities",
        description: "Elena Rostova analyzes Karen Barad's physical theories and Donna Haraway's planetary co-dependence.",
        tag: "Critical Essay",
        date: "July 2026"
      },
      {
        title: "Auditing Machine Agency Weights",
        description: "Anya Chen audits semantic bias and decolonial programming guidelines inside modern LLMs.",
        tag: "Research Paper",
        date: "June 2026"
      }
    ],
    relatedLinks: [
      { label: "Essays Archive", href: "/publications/essays" },
      { label: "Submit Your Work", href: "/publications/submit" }
    ]
  },
  "publications/essays": {
    slug: "essays",
    title: "SPECULATIVE ESSAYS",
    eyebrow: "Publications",
    description: "Shorter, artistic reflections and conceptual writings on technology, nature, and art.",
    layout: "listing",
    parentLabel: "Publications",
    parentHref: "/publications",
    items: [
      {
        title: "Lichen-Synth: Generative Visual Topologies",
        description: "Marcus Vance maps slow botanical patterns into generative browser layout configurations.",
        tag: "Creative Essay",
        date: "June 2026"
      },
      {
        title: "Entangled Listening: Soil Acoustics",
        description: "Reflections on field recording, woodland voltages, and decentering human auditory patterns.",
        tag: "Acoustic Essay",
        date: "May 2026"
      }
    ],
    relatedLinks: [
      { label: "Articles Index", href: "/publications/articles" },
      { label: "Creative Work", href: "/publications/creative-work" }
    ]
  },
  "publications/research": {
    slug: "research",
    title: "LAB RESEARCH PAPERS",
    eyebrow: "Publications",
    description: "Data logs, hardware schemas, and telemetry reports generated inside our active Labs.",
    layout: "listing",
    parentLabel: "Publications",
    parentHref: "/publications",
    items: [
      {
        title: "Waterway Sensors Audit: Urban Telemetry",
        description: "Soil salinity and turbidity datasets collected by community water monitoring cells.",
        tag: "Data Report",
        date: "May 2026"
      },
      {
        title: "Decentralized Bibliography Schemas",
        description: "Technical parameters of our peer-to-peer bibliography synchronization protocols.",
        tag: "Technical Draft",
        date: "April 2026"
      }
    ],
    relatedLinks: [
      { label: "Articles Index", href: "/publications/articles" },
      { label: "Ecological Futures Lab", href: "/labs/ecological-futures" }
    ]
  },
  "publications/creative-work": {
    slug: "creative-work",
    title: "CREATIVE & ART WORKS",
    eyebrow: "Publications",
    description: "Generative sound files, video documents, and conceptual digital canvas mappings.",
    layout: "listing",
    parentLabel: "Publications",
    parentHref: "/publications",
    items: [
      {
        title: "Black Forest Off-Grid Video logs",
        description: "A short documentary recording modular soundscapes generated by soil bio-sensors.",
        tag: "Media Log",
        date: "June 2026"
      },
      {
        title: "Lichen Mappings Archive",
        description: "Static images and code assets of generative lichen growth canvas rendering.",
        tag: "Code Assets",
        date: "May 2026"
      }
    ],
    relatedLinks: [
      { label: "Essays Index", href: "/publications/essays" },
      { label: "Experimental Media Lab", href: "/labs/experimental-media" }
    ]
  },

  // ----------------------------------------------------
  // PRACTICE SECTION
  // ----------------------------------------------------
  "practice/gatherings": {
    slug: "gatherings",
    title: "PHYSICAL GATHERINGS",
    eyebrow: "Practice",
    description: "Decentralized physical circles, reading meetups, and coordinate meetups.",
    layout: "listing",
    parentLabel: "Practice",
    parentHref: "/practice",
    items: [
      {
        title: "Black Forest Wilderness Retreat",
        description: "A three-day off-grid gathering to cook together, program, and audit technology systems.",
        tag: "Retreat Schedule"
      },
      {
        title: "Local Cell Reading Circle meetups",
        description: "Informal, horizontal meetups organized locally by distributed network members.",
        tag: "Local Meetup"
      }
    ],
    relatedLinks: [
      { label: "Practice Workshops", href: "/practice/workshops" },
      { label: "Embodied Practice", href: "/practice/embodied-practice" }
    ]
  },
  "practice/embodied-practice": {
    slug: "embodied-practice",
    title: "EMBODIED PRACTICES",
    eyebrow: "Practice",
    description: "Grounding exercises, sensory listening walks, and physical making methods.",
    layout: "listing",
    parentLabel: "Practice",
    parentHref: "/practice",
    items: [
      {
        title: "Binaural Sensor walks",
        description: "Listening exercises focused on documenting non-human audio patterns in urban parks.",
        tag: "Somatic Practice"
      },
      {
        title: "Clay Sculpting and Technology Audits",
        description: "Shaping raw clay while discussing software structures, linking organic and digital matter.",
        tag: "Art Practice"
      }
    ],
    relatedLinks: [
      { label: "Physical Gatherings", href: "/practice/gatherings" },
      { label: "Community Projects", href: "/practice/community-projects" }
    ]
  },
  "practice/community-projects": {
    slug: "community-projects",
    title: "COMMUNITY PROJECTS",
    eyebrow: "Practice",
    description: "Collaborative, open-access projects run locally by distributed cells.",
    layout: "listing",
    parentLabel: "Practice",
    parentHref: "/practice",
    items: [
      {
        title: "Urban stream sensors Deployment",
        description: "Deploying local monitoring cells to track turbidity changes in public urban waterways.",
        tag: "Grassroots Project"
      },
      {
        title: "Decentralized Seed Library Archive",
        description: "Collaborative plant cataloging and seed exchange indexes managed by local members.",
        tag: "Botanical Project"
      }
    ],
    relatedLinks: [
      { label: "Embodied Practice", href: "/practice/embodied-practice" },
      { label: "Become a Member", href: "/membership/become-a-member" }
    ]
  },

  // ----------------------------------------------------
  // COMMUNITY SECTION
  // ----------------------------------------------------
  "community/collaborations": {
    slug: "collaborations",
    title: "CELL COLLABORATIONS",
    eyebrow: "Community",
    description: "Listing of active collaborative projects run across different regional groups.",
    layout: "listing",
    parentLabel: "Community",
    parentHref: "/community",
    items: [
      {
        title: "Telemetry Data Mapping Integration",
        description: "Integrating ecological sensors in Germany and India into a single visual ledger.",
        tag: "Cross-Cell Project"
      },
      {
        title: "Translation Circle Alliance",
        description: "Collaborative translation of primary philosophy texts led by East Asian and Latin cells.",
        tag: "Cross-Cell Project"
      }
    ],
    relatedLinks: [
      { label: "Global Voices", href: "/community/global-voices" },
      { label: "Discussions Space", href: "/community/discussions" }
    ]
  },
  "community/discussions": {
    slug: "discussions",
    title: "DISCUSSIONS SPACE",
    eyebrow: "Community",
    description: "Join our active virtual forums, Discord circles, and reading boards.",
    layout: "listing",
    parentLabel: "Community",
    parentHref: "/community",
    items: [
      {
        title: "Weekly Discord Reading Circles",
        description: "Join active voice channels to critique essays, share reference files, and code guides.",
        tag: "Discord Circle"
      },
      {
        title: "Hardware Hack Q&A Board",
        description: "Online forum tracking soil sensor voltage offsets and sensor calibration tips.",
        tag: "Forum Board"
      }
    ],
    relatedLinks: [
      { label: "Cell Collaborations", href: "/community/collaborations" },
      { label: "Collaboration Contact", href: "/contact/collaboration" }
    ]
  },

  // ----------------------------------------------------
  // SUPPORT SECTION
  // ----------------------------------------------------
  "support/contribute": {
    slug: "contribute",
    title: "WAYS TO CONTRIBUTE",
    eyebrow: "Support",
    description: "Financial, intellectual, and technical contributions to keep our network open.",
    layout: "editorial",
    parentLabel: "Support",
    parentHref: "/support",
    editorialSections: [
      {
        heading: "CC translation Support",
        content: "If you speak multiple regional languages, you can contribute by translating our public study manuals, glossary files, and guides. Submit these using our Publications workspace."
      },
      {
        heading: "Sensor Node donations",
        content: "Support the network by purchasing and donating pre-assembled ESP32 water/soil sensor kits to emerging cell organizers who lack access to parts."
      }
    ],
    relatedLinks: [
      { label: "Why Support?", href: "/support/why-support" },
      { label: "Submit Your Work", href: "/publications/submit" }
    ]
  },

  // ----------------------------------------------------
  // CONTACT SECTION
  // ----------------------------------------------------
  "contact/general": {
    slug: "general",
    title: "GENERAL INQUIRIES",
    eyebrow: "Contact",
    description: "Get in touch with our core coordinators for general questions about the network.",
    layout: "form",
    parentLabel: "Contact",
    parentHref: "/contact",
    formType: "contact",
    relatedLinks: [
      { label: "Collaboration Inquiry", href: "/contact/collaboration" },
      { label: "Become a Member", href: "/membership/become-a-member" }
    ]
  }
};
