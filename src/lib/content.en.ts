/**
 * English content dictionary — the single source of truth for all UI copy.
 * The Arabic dictionary (content.ar.ts) mirrors this exact shape.
 * Voice: confident engineer's precision — concrete, active, a touch of craft.
 */

const en = {
  meta: {
    title: "Zygnal — Mobile Network Infrastructure & Deployment",
    description:
      "Zygnal builds, powers, and modernizes mobile networks across Syria — from the first site survey to live 5G. Field-proven engineering, multi-vendor experience, delivered on schedule.",
  },

  nav: {
    items: [
      { href: "#lifecycle", label: "Lifecycle" },
      { href: "#about", label: "About" },
      { href: "#services", label: "Services" },
      { href: "#capabilities", label: "Capabilities" },
      { href: "#work", label: "Clients" },
      { href: "#board", label: "Leadership" },
      { href: "#contact", label: "Contact" },
    ],
    cta: "Start a project",
    skip: "Skip to content",
  },

  hero: {
    location: "Damascus, Syria",
    titleTop: "Building",
    titleBottom: "the network.",
    intro:
      "Every tower starts as empty ground. Scroll to watch Zygnal raise one — from survey to signal.",
    scroll: "Scroll",
    phaseLabel: "Phase",
    connector: "Signal · live",
  },

  lifecycle: {
    phases: [
      {
        id: "survey",
        index: "01",
        title: "Site Survey & Acquisition",
        desc: "Before anything rises, the ground is read — coverage, access, and rights secured.",
      },
      {
        id: "civil",
        index: "02",
        title: "Civil Works & Foundation",
        desc: "Concrete and steel go deep — a base cut to hold the mast for decades.",
      },
      {
        id: "tower",
        index: "03",
        title: "Tower Erection",
        desc: "Section by section, the mast climbs the skyline — plumb to the millimetre.",
      },
      {
        id: "bts",
        index: "04",
        title: "BTS & Antenna Installation",
        desc: "Antennas, radios, and feeders take their place — and the site learns to speak.",
      },
      {
        id: "power",
        index: "05",
        title: "Power Systems Online",
        desc: "Rectifiers, batteries, and generators wake the site — power that never blinks.",
      },
      {
        id: "fiber",
        index: "06",
        title: "Fiber & Transmission",
        desc: "Fiber threads the last metres, and the site joins the backbone.",
      },
      {
        id: "live",
        index: "07",
        title: "Network Goes Live",
        desc: "Integration clears — the signal goes out, and the first call connects.",
      },
      {
        id: "modernize",
        index: "08",
        title: "Modernization to 5G",
        desc: "Years on, we swap and upgrade in place — carrying the live network into 5G.",
      },
    ],
  },

  about: {
    index: "01",
    eyebrow: "Who we are",
    titleLead: "The team behind ",
    titleAccent: "the signal.",
    intro:
      "Zygnal is a Syrian telecom infrastructure company. We build, power, and maintain the physical layer of mobile networks — the towers, base stations, civil works, and power systems that carry every call, message, and megabyte.",
    visionLabel: "Vision",
    vision:
      "To be the first partner global operators and vendors call when they build in Syria.",
    missionLabel: "Mission",
    mission:
      "To give operators and vendors a local team they never have to worry about — on site fast, engineered right, and safe on every shift.",
    valuesLabel: "What we stand on",
  },

  stats: [
    { value: "15+", label: "Engineers" },
    { value: "7", label: "Field teams" },
    { value: "Nationwide", label: "Deployment reach" },
    { value: "Multi-vendor", label: "Huawei · Ericsson · Nokia" },
  ],

  coreValues: [
    { title: "Safety", desc: "HSE-first culture on every site, every shift." },
    { title: "Quality", desc: "To spec, every time — measured, not assumed." },
    { title: "Integrity", desc: "We say what we'll do, then do it." },
    { title: "Customer Focus", desc: "Your rollout is our reputation." },
    { title: "Innovation", desc: "We retire the old way when a better one exists." },
    { title: "Execution Excellence", desc: "On site in days, owned to sign-off." },
  ],

  services: {
    index: "02",
    eyebrow: "What we do",
    titleLead: "From bare ground ",
    titleAccent: "to live signal.",
    intro:
      "Survey, civil works, install, power, integration, maintenance — one accountable team from first visit to live signal, so nothing slips between vendors.",
    coreLabel: "Core",
    featuredFlow: "Survey → On-air",
    items: [
      {
        title: "Telecom Infrastructure Deployment",
        desc: "New greenfield and rooftop sites taken from empty ground to on-air — surveyed, built, integrated, handed over.",
      },
      {
        title: "BTS Installation & Dismantling",
        desc: "Base stations installed, swapped, or cleanly removed — Huawei, Ericsson, Nokia, ZTE, no relearning curve.",
      },
      {
        title: "Civil Works & Site Construction",
        desc: "Foundations, towers, rooftops, and shelters — the structure everything else bolts onto, built to hold.",
      },
      {
        title: "Power & Electrical Systems",
        desc: "AC/DC, rectifiers, batteries, and generators sized so the site stays up when the grid goes down.",
      },
      {
        title: "Network Modernization",
        desc: "Upgrades and swaps on live networks — more capacity and a clear path to 5G, without downtime.",
      },
      {
        title: "Operation & Maintenance (O&M)",
        desc: "Preventive and corrective maintenance that catches faults before subscribers ever feel them.",
      },
      {
        title: "Project Management & Technical Support",
        desc: "Planning, coordination, and quality assurance that keep every site on schedule and on spec.",
      },
    ],
  },

  capabilities: {
    index: "03",
    eyebrow: "Technical capabilities",
    titleLead: "The engineering depth to ",
    titleAccent: "execute anywhere.",
    intro:
      "Full-stack field engineering — structural, electrical, RF, and transmission — in the hands of teams that show up ready and finish clean.",
    execLabel: "Execution capability",
    vendorLabel: "Multi-vendor field ops",
    items: [
      "Telecom Site Installation & Integration",
      "BTS Installation, Swap & Dismantling",
      "Civil & Structural Engineering",
      "Power Systems (AC/DC, Rectifiers, Batteries & Generators)",
      "Tower & Rooftop Site Construction",
      "Fiber Optic & Transmission Infrastructure",
      "Site Surveys & Technical Audits",
      "Network Modernization & Upgrade Projects",
      "Preventive & Corrective Maintenance",
      "Project Planning & Execution",
      "Quality Assurance & HSE Compliance",
      "Multi-Vendor Field Operations",
    ],
    execution: [
      "Seasoned field engineers and technicians",
      "Teams positioned across the country",
      "On site in days, anywhere in Syria",
      "One team from kickoff to sign-off",
      "Safety and quality managed by the book",
    ],
  },

  vendors: ["Huawei", "Ericsson", "Nokia", "ZTE"],

  industries: {
    label: "Industries served",
    items: [
      "Mobile Telecommunications",
      "Telecom Infrastructure",
      "Network Deployment & Modernization",
      "Engineering & Civil Construction",
    ],
  },

  work: {
    index: "04",
    eyebrow: "Trusted by",
    titleLead: "Chosen by operators, ",
    titleAccent: "backed by partners.",
    intro:
      "We deliver for mobile operators directly and through our engineering network — with partners spanning Syria and the Gulf.",
    clientsLabel: "Major clients",
    partnersLabel: "Strategic partners",
    clients: [
      { name: "MTN Syria", note: "Mobile operator — via Zygnal" },
      { name: "Syriatel", note: "Mobile operator — via sister company BES" },
    ],
    partners: [
      { name: "BES", logo: "bes-logo.png", note: "Best Engineering Services — sister company" },
      { name: "Amjaad Company", logo: "amjaad-logo.png", note: "General contracting" },
      { name: "Zee Generation", logo: "zee-logo.jpg", note: "Dubai, UAE" },
    ],
  },

  board: {
    index: "05",
    eyebrow: "Leadership",
    titleLead: "The people ",
    titleAccent: "behind the build.",
    intro:
      "Operators, engineers, and industrialists who have run national networks and built companies — now steering Zygnal.",
    members: [
      {
        photo: "bashar-naboulsi.jpg",
        name: "Bashar Naboulsi",
        role: "Founder & General Manager",
        summary:
          "25+ years of leadership in the telecommunications industry.",
        points: [
          "Former CTO, MTN Syria",
          "Founder & General Manager of Zygnal; Founder of Zee Generation (Dubai)",
          "Executive MBA (EMBA) — Higher Institute of Business Administration (HIBA)",
        ],
      },
      {
        photo: "houssam-tarabichi.jpg",
        name: "Houssam Tarabichi",
        role: "Board Member",
        summary:
          "Industrial entrepreneur with over three decades in manufacturing and industrial development.",
        points: [
          "B.Sc. Chemistry (1992)",
          "Founder & Managing Director, Orchid for Cosmetic Industries (1997–present)",
          "Founding Partner, Amjaad General Contracting — overseeing multiple Syria reconstruction projects",
          "Chairman, Chemical Sector Committee, Damascus Suburbs Chamber of Industry (2006–2016)",
        ],
      },
      {
        photo: "mohammad-albitar.jpg",
        name: "Dr. Mohammad Albitar",
        role: "Finance Director — PhD, CFM, S.CPA",
        summary:
          "Accounting and advisory across technology, banking, non-profit, manufacturing, and healthcare.",
        points: [
          "Ph.D. in Accounting, Damascus University (2015)",
          "Syrian Certified Public Accountant (S.CPA); Certified Finance Manager, USA (2025)",
          "Senior Consultant, Ernst & Young (2023–present)",
          "Regulatory Financial Relations Manager, MTN Syria (2016–2021)",
        ],
      },
      {
        photo: "kinan-saleh.jpg",
        name: "Kinan Saleh",
        role: "Board Member",
        summary:
          "16+ years of leadership and experience in the transmission field.",
        points: [
          "Former Transmission Manager and Head of Unit, Syriatel",
          "Founder & General Manager, BES (Best Engineering Services)",
          "Extensive experience in WiFi planning and execution",
        ],
      },
    ],
  },

  projects: {
    index: "06",
    eyebrow: "Selected work",
    titleLead: "Proven ",
    titleAccent: "in the field.",
    intro:
      "A snapshot of the work Zygnal delivers across Syria. Named, detailed case studies — scope, engineering challenges, and on-site photography — are available on request.",
    requestLabel: "Full case studies on request",
    scopeLabel: "Scope",
    items: [
      {
        code: "01",
        tag: "Multi-vendor",
        title: "Mobile Network Rollout",
        sector: "Mobile operator · Syria",
        scope:
          "Greenfield and rooftop sites carried from survey through civil, install, power, and integration to on-air.",
      },
      {
        code: "02",
        tag: "4G → 5G",
        title: "Network Modernization & Swap",
        sector: "Mobile operator · Syria",
        scope:
          "Live-network upgrade and multi-vendor swap toward 5G, with the civil and power works to support it.",
      },
    ],
  },

  contact: {
    eyebrow: "Let's build",
    titleLead: "Your next site, ",
    titleAccent: "on air.",
    intro:
      "Planning a rollout, a swap, or a modernization program? Tell us the sites and the timeline — we'll tell you how fast we can have them on air.",
    email: "Bnabulsi@zygnal-sy.com",
    phones: [
      { label: "Syria", value: "+963 944 222 169", tel: "+963944222169" },
      { label: "UAE", value: "+971 56 284 6033", tel: "+971562846033" },
    ],
    location: "Damascus, Syria",
    branch: "Rawda, Damascus",
    navLabel: "Navigate",
    contactLabel: "Contact",
    locationsLabel: "Locations",
    rights: "All rights reserved.",
  },

  company: {
    legalName: "Zygnal for Smart Solutions",
    name: "Zygnal",
    tagline: "Local Expertise. Global Standards. Trusted Execution.",
  },
};

export default en;
