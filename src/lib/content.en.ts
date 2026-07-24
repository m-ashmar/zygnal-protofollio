/**
 * English content dictionary — the single source of truth for all UI copy.
 * The Arabic dictionary (content.ar.ts) mirrors this exact shape.
 * Data sourced from the client intake form.
 */

const en = {
  meta: {
    title: "Zygnal — Telecom Infrastructure & Network Deployment",
    description:
      "Zygnal is a Syrian telecommunications infrastructure company delivering end-to-end mobile network deployment, civil works, power systems, and modernization to 5G. Local expertise, global standards, trusted execution.",
  },

  nav: {
    items: [
      { href: "#lifecycle", label: "Lifecycle" },
      { href: "#about", label: "About" },
      { href: "#services", label: "Services" },
      { href: "#capabilities", label: "Capabilities" },
      { href: "#work", label: "Clients" },
      { href: "#contact", label: "Contact" },
    ],
    cta: "Get in touch",
    skip: "Skip to content",
  },

  hero: {
    location: "Damascus, Syria",
    titleTop: "Building",
    titleBottom: "the network.",
    intro:
      "Zygnal deploys, powers, and modernizes mobile infrastructure — end to end. Scroll to watch a site come to life.",
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
        desc: "Every rollout begins on the ground — site selection, technical audit, and access secured.",
      },
      {
        id: "civil",
        index: "02",
        title: "Civil Works & Foundation",
        desc: "Excavation and reinforced foundations engineered to carry the structure for decades.",
      },
      {
        id: "tower",
        index: "03",
        title: "Tower Erection",
        desc: "The lattice mast rises — assembled and aligned by experienced field teams.",
      },
      {
        id: "bts",
        index: "04",
        title: "BTS & Antenna Installation",
        desc: "Base station, antennas, RRUs, and feeder cabling installed and integrated.",
      },
      {
        id: "power",
        index: "05",
        title: "Power Systems Online",
        desc: "AC/DC systems, rectifiers, batteries, and generators bring the site to life.",
      },
      {
        id: "fiber",
        index: "06",
        title: "Fiber & Transmission",
        desc: "Fiber and transmission tie the site into the wider network backbone.",
      },
      {
        id: "live",
        index: "07",
        title: "Network Goes Live",
        desc: "Integration complete — signal radiates and subscribers connect.",
      },
      {
        id: "modernize",
        index: "08",
        title: "Modernization to 5G",
        desc: "Swaps and upgrades carry the live network from 4G into the 5G era.",
      },
    ],
  },

  about: {
    index: "01",
    eyebrow: "Who we are",
    titleLead: "A local partner built to ",
    titleAccent: "global standards.",
    intro:
      "Zygnal is a Syrian telecommunications infrastructure company specializing in end-to-end mobile network deployment and engineering services. Our core capabilities span telecom site construction, installation and dismantling of mobile base stations, civil works, power infrastructure, site acquisition support, and logistics — every activity required for successful network rollout, modernization, and maintenance.",
    visionLabel: "Vision",
    vision:
      "To be the preferred local partner for global telecommunications vendors and operators — delivering excellence in network deployment, modernization, and infrastructure services.",
    missionLabel: "Mission",
    mission:
      "To support telecom operators and technology partners with efficient, high-quality infrastructure and engineering services that accelerate network deployment and modernization, while maintaining the highest standards of safety, quality, and performance.",
    valuesLabel: "Core values",
  },

  stats: [
    { value: "15+", label: "Engineers" },
    { value: "7", label: "Technical teams" },
    { value: "Nationwide", label: "Deployment reach" },
    { value: "Multi-vendor", label: "Huawei · Ericsson · Nokia" },
  ],

  coreValues: [
    { title: "Safety", desc: "HSE-first culture on every site, every shift." },
    { title: "Quality", desc: "Global engineering standards, locally executed." },
    { title: "Integrity", desc: "Transparent, dependable, accountable delivery." },
    { title: "Customer Focus", desc: "Operator and vendor success is our metric." },
    { title: "Innovation", desc: "Modern methods for modern networks." },
    { title: "Execution Excellence", desc: "Fast mobilization, end-to-end ownership." },
  ],

  services: {
    index: "02",
    eyebrow: "What we do",
    titleLead: "End-to-end services across the ",
    titleAccent: "site lifecycle.",
    intro:
      "From the first survey to ongoing modernization, Zygnal owns every stage of network deployment — so operators and vendors get one accountable partner.",
    coreLabel: "Core",
    featuredFlow: "Survey → On-air",
    items: [
      {
        title: "Telecom Infrastructure Deployment",
        desc: "End-to-end rollout of greenfield and rooftop telecom sites — from survey to on-air.",
      },
      {
        title: "BTS Installation & Dismantling",
        desc: "Installation, swap, and dismantling of mobile base stations across all major vendors.",
      },
      {
        title: "Civil Works & Site Construction",
        desc: "Foundations, towers, rooftops, shelters, and structural works built to spec.",
      },
      {
        title: "Power & Electrical Systems",
        desc: "AC/DC systems, rectifiers, batteries, and generators for reliable site power.",
      },
      {
        title: "Network Modernization",
        desc: "Technology upgrades and swaps that move live networks toward 5G.",
      },
      {
        title: "Operation & Maintenance (O&M)",
        desc: "Preventive and corrective maintenance that keeps networks performing.",
      },
      {
        title: "Project Management & Technical Support",
        desc: "Planning, execution, and quality assurance across the full project lifecycle.",
      },
    ],
  },

  capabilities: {
    index: "03",
    eyebrow: "Technical capabilities",
    titleLead: "The engineering depth to ",
    titleAccent: "execute anywhere.",
    intro:
      "A full-stack field engineering capability — structural, electrical, RF, and transmission — delivered by teams that mobilize fast and finish clean.",
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
      "Experienced field engineers and technicians",
      "Nationwide deployment teams",
      "Fast mobilization across Syria",
      "End-to-end project execution",
      "Strong HSE and Quality Management practices",
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
    titleLead: "Delivering for operators and ",
    titleAccent: "partners.",
    intro:
      "Zygnal supports mobile operators directly and through its engineering network — with strategic partners spanning Syria and the Gulf.",
    clientsLabel: "Major clients",
    partnersLabel: "Strategic partners",
    clients: [
      { name: "MTN Syria", note: "Mobile operator — via Zygnal" },
      { name: "Syriatel", note: "Mobile operator — via sister company BES" },
    ],
    partners: [
      { name: "BES", note: "Best Engineering Services — sister company" },
      { name: "Zee Generation", note: "Dubai, UAE" },
    ],
  },

  projects: {
    index: "05",
    eyebrow: "Flagship projects",
    titleLead: "Selected work, ",
    titleAccent: "coming soon.",
    intro:
      "Detailed case studies — scope, engineering challenge, and on-site photography — are being prepared with the client.",
    awaiting: "Awaiting details",
    clientLabel: "Client",
    countryLabel: "Country",
    scopeLabel: "Scope",
    items: [
      {
        code: "PRJ-01",
        title: "Flagship Project 01",
        client: "To be confirmed",
        country: "Syria",
        scope: "Details to be provided by client.",
      },
      {
        code: "PRJ-02",
        title: "Flagship Project 02",
        client: "To be confirmed",
        country: "Syria",
        scope: "Details to be provided by client.",
      },
    ],
  },

  contact: {
    eyebrow: "Let's build",
    titleLead: "Your next site, ",
    titleAccent: "on air.",
    intro:
      "Planning a rollout, a swap, or a modernization program? Zygnal mobilizes fast and delivers to global standards.",
    email: "info@zygnal.com",
    location: "Damascus, Syria",
    branch: "Rawda, Damascus",
    navLabel: "Navigate",
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
