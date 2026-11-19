/**
 * Single source of truth for all portfolio content.
 *
 * Content rules:
 *  - Nothing here is invented. Every claim comes from John's brief, his
 *    previous portfolio, or the README / source of the linked repository.
 *  - Numeric results that could not be verified against a source are kept
 *    with `verified: false` and are NOT rendered. Flip to `true` once confirmed.
 */

export const site = {
  name: "John Wesley",
  shortName: "Wesley",
  url: "https://wesley-portfolio-seven.vercel.app",
  title: "John Wesley — Software Engineer · AI/ML Engineer · Full-Stack Developer",
  description:
    "Portfolio of John Wesley, Integrated M.Tech (IT) student at ABV-IIITM Gwalior, building full-stack products and applied AI/ML systems — from HR platforms to computer vision and NLP research.",
  roles: ["Software Engineer", "AI/ML Engineer", "Full-Stack Developer"],
  email: "johnwesley.290305@gmail.com",
  availability: {
    open: true,
    label: "Open to internships & full-time roles",
  },
  photo: {
    // Set to null to fall back to the designed placeholder in the hero.
    src: "/images/john-wesley.webp" as string | null,
    alt: "John Wesley seated in a palace garden, framed through a carved sandstone window",
    width: 1008,
    height: 1177,
  },
  resume: {
    /**
     * Drop the PDF at /public/resume/John_Wesley_Resume.pdf and set `pdf`
     * to "/resume/John_Wesley_Resume.pdf" to enable the inline preview
     * and a direct download.
     */
    pdf: null as string | null,
    // Existing resume link carried over from the previous portfolio.
    external: "https://drive.google.com/drive/u/0/folders/19kUYy7epb_SZ_JtgHKptBH4C8z-LOsGD",
  },
};

export const socials = [
  { id: "github", label: "GitHub", handle: "wesley-2329", href: "https://github.com/wesley-2329" },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "john-wesley",
    href: "https://www.linkedin.com/in/john-wesley-933737262/",
  },
  { id: "leetcode", label: "LeetCode", handle: "wesley-2329", href: "https://leetcode.com/u/wesley-2329/" },
] as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  statement:
    "I build software that takes machine learning out of the notebook and puts it in front of people — products with real workflows, models with honest evaluations, and research that asks careful questions.",
  emphasis: ["software", "machine", "learning", "people", "honest", "careful"],
  paragraphs: [
    "I'm John Wesley, an Integrated M.Tech student in Information Technology at ABV-IIITM Gwalior. My work sits where software engineering meets AI: I enjoy designing the system around a model just as much as the model itself.",
    "That has meant building a full HR platform end-to-end, shipping a computer-vision inspection tool, training driving policies in simulation, and — right now — researching how bias shows up in Indian-language news media.",
  ],
  focus: [
    {
      title: "Software Engineering",
      body: "Full-stack products with clear data models, role-based access, and APIs designed to last.",
    },
    {
      title: "AI / Machine Learning",
      body: "Computer vision, deep learning, and LLM systems — from training pipelines to evaluation.",
    },
    {
      title: "Practical Products",
      body: "Technology that solves an operational problem for real users, not just a benchmark.",
    },
  ],
};

export const education = {
  institution: "ABV-IIITM Gwalior",
  institutionFull: "Atal Bihari Vajpayee Indian Institute of Information Technology and Management, Gwalior",
  degree: "Integrated Master of Technology",
  field: "Information Technology",
  graduation: "2027",
  status: "Expected graduation",
};

export const achievements = [
  {
    value: 15675,
    prefix: "AIR ",
    label: "All India Rank · Information Technology",
    /**
     * The examination name has not been confirmed yet.
     * Replace null with the exam name (e.g. as it appears on the scorecard).
     */
    exam: null as string | null,
  },
];

/* ------------------------------------------------------------------ */
/* Experience & research timeline                                      */
/* ------------------------------------------------------------------ */

export type TimelineItem = {
  period: string;
  role: string;
  org: string;
  kind: "Research" | "Internship" | "Education";
  ongoing?: boolean;
  summary: string;
  points: string[];
  tags: string[];
};

export const timeline: TimelineItem[] = [
  {
    period: "Ongoing",
    role: "M.Tech Research",
    org: "ABV-IIITM Gwalior",
    kind: "Research",
    ongoing: true,
    summary: "Media Bias Detection and Mitigation for Indian Languages.",
    points: [
      "Investigating how bias appears in news media written in Indian languages using NLP.",
      "Studying bias analysis and detection approaches suited to multilingual, lower-resource settings.",
      "Exploring mitigation methodologies that reduce bias while preserving meaning.",
    ],
    tags: ["NLP", "Indian Languages", "Bias Analysis", "Mitigation"],
  },
  {
    period: "May 2025 — Jul 2025",
    role: "Research Intern",
    org: "ABV-IIITM Gwalior",
    kind: "Internship",
    summary: "Vehicle behaviour analysis and behavioural cloning for autonomous driving.",
    points: [
      "Built an end-to-end behavioural cloning pipeline in the CARLA simulator to train a driving policy from recorded frames.",
      "Engineered a data engine combining trajectory clustering and dynamic collision avoidance to cover complex edge cases.",
      "Applied transfer learning on a pre-trained Vision Transformer (ViT) to predict steering and speed control outputs.",
    ],
    tags: ["CARLA", "Behavioural Cloning", "Vision Transformers", "Trajectory Analysis"],
  },
  {
    period: "Expected 2027",
    role: "Integrated M.Tech, Information Technology",
    org: "ABV-IIITM Gwalior",
    kind: "Education",
    summary: "Integrated Master of Technology programme in Information Technology.",
    points: [],
    tags: ["Software Engineering", "AI/ML", "Research"],
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type SkillCategory = {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    blurb: "The languages I think in — from systems-level C++ to typed product code.",
    skills: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "web",
    title: "Frontend / Backend",
    blurb: "Interfaces and services for products people actually use every day.",
    skills: ["React", "Angular", "Node.js", "REST APIs", "Material UI"],
  },
  {
    id: "ai",
    title: "AI / ML",
    blurb: "Vision, deep learning and language-model systems, from training to agents.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "TensorFlow",
      "LLMs",
      "Embeddings",
      "RAG",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "AutoGen",
    ],
  },
  {
    id: "cloud",
    title: "Cloud / DevOps",
    blurb: "Shipping, scaling and operating what I build across the major clouds.",
    skills: ["AWS", "Azure", "GCP", "Git", "CI/CD", "Docker", "Azure AI Foundry", "Vertex AI"],
  },
  {
    id: "aieng",
    title: "AI Engineering",
    blurb: "Making AI systems measurable, observable and safe in production.",
    skills: ["Prompt Engineering", "AI Quality Metrics", "Monitoring", "OpenTelemetry", "AgentOps", "Guardrails"],
  },
];

/** Undirected relationships used to draw connections between skills. */
export const skillLinks: [string, string][] = [
  ["Python", "TensorFlow"],
  ["Python", "Machine Learning"],
  ["Machine Learning", "Deep Learning"],
  ["Deep Learning", "Computer Vision"],
  ["Deep Learning", "TensorFlow"],
  ["Computer Vision", "TensorFlow"],
  ["LLMs", "Embeddings"],
  ["Embeddings", "RAG"],
  ["LLMs", "RAG"],
  ["RAG", "LangChain"],
  ["LangChain", "LangGraph"],
  ["LLMs", "CrewAI"],
  ["LLMs", "AutoGen"],
  ["CrewAI", "AutoGen"],
  ["LLMs", "Prompt Engineering"],
  ["LLMs", "Guardrails"],
  ["LLMs", "AI Quality Metrics"],
  ["AI Quality Metrics", "Monitoring"],
  ["Monitoring", "OpenTelemetry"],
  ["Monitoring", "AgentOps"],
  ["AgentOps", "CrewAI"],
  ["AgentOps", "AutoGen"],
  ["Guardrails", "AI Quality Metrics"],
  ["Prompt Engineering", "Guardrails"],
  ["JavaScript", "TypeScript"],
  ["TypeScript", "React"],
  ["TypeScript", "Angular"],
  ["JavaScript", "Node.js"],
  ["JavaScript", "React"],
  ["React", "Material UI"],
  ["Node.js", "REST APIs"],
  ["SQL", "REST APIs"],
  ["Git", "CI/CD"],
  ["Docker", "CI/CD"],
  ["Azure", "Azure AI Foundry"],
  ["GCP", "Vertex AI"],
  ["AWS", "Docker"],
  ["Azure AI Foundry", "LLMs"],
  ["Vertex AI", "LLMs"],
  ["C++", "Java"],
];

/** Technologies shown in the moving marquee (icon keys live in components/ui/TechIcon). */
export const marqueeTech = [
  "Python",
  "C++",
  "Java",
  "TypeScript",
  "JavaScript",
  "React",
  "Angular",
  "Node.js",
  "Material UI",
  "TensorFlow",
  "OpenCV",
  "Docker",
  "Git",
  "AWS",
  "Azure",
  "GCP",
  "MongoDB",
  "Flask",
  "OpenTelemetry",
  "SQL",
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Metric = {
  value: string;
  label: string;
  /** Only verified metrics are rendered. */
  verified: boolean;
  source?: string;
};

export type ProjectMedia =
  | { type: "image"; src: string; alt: string; secondary?: { src: string; alt: string }[] }
  | { type: "visual"; variant: "trajectory" | "bias" };

export type Project = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  status: string;
  ongoing?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
  metrics: Metric[];
  media: ProjectMedia;
  links: { label: string; href: string; kind: "live" | "code" | "demo" }[];
  accent: string;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "hr-orbit",
    index: "01",
    title: "HR Orbit",
    kicker: "Human Resource Management System",
    status: "Live product",
    summary:
      "A full-stack HRM platform with separate HR Director and Employee workspaces that covers the employee lifecycle — from recruitment to exit — behind role-based access.",
    highlights: [
      "Employee management, directory and organisation structure",
      "Leave requests with approval routing and balance checks",
      "Recruitment ATS with a Kanban pipeline",
      "HR dashboards, notifications and approvals inbox",
      "Administrative workflows: transfers, promotions, compliance, exit",
      "JWT role-based access with real-time updates over Socket.IO",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
    metrics: [
      { value: "34", label: "REST route modules", verified: true, source: "HRM_PROJECT/backend/routes" },
      { value: "195", label: "Mongoose data models", verified: true, source: "HRM_PROJECT/backend/models" },
      { value: "2", label: "role-based workspaces", verified: true, source: "HRM_PROJECT/README.md" },
    ],
    media: {
      type: "image",
      src: "/projects/hr-orbit/landing.webp",
      alt: "HR Orbit landing page with the product name over a perspective grid",
      secondary: [
        {
          src: "/projects/hr-orbit/modules.webp",
          alt: "HR Orbit module overview: Workspace and Shift Board cards",
        },
      ],
    },
    links: [
      { label: "Live site", href: "https://hrorbit.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/wesley-2329/HRM_PROJECT", kind: "code" },
    ],
    accent: "#8E7BFF",
  },
  {
    slug: "defektguard",
    index: "02",
    title: "DefektGuard",
    kicker: "AI-Powered Product Defect Detection",
    status: "Walmart Sparkathon · 2025",
    summary:
      "A computer-vision inspection system that flags damaged packages during warehouse loading and conveyor operations, with an operator dashboard to review, verify and track every scan.",
    highlights: [
      "Classifies products as intact or damaged from webcam frames or uploads",
      "ResNet-34 classifier served through a Flask REST /predict endpoint",
      "Flagged items logged with condition, confidence, SKU and timestamp",
      "React + Material UI dashboard for inventory overview and scan history",
      "Evaluation work focused on false negatives and data-leakage risks",
    ],
    stack: ["React", "Material UI", "TensorFlow", "Flask", "MongoDB", "OpenCV"],
    metrics: [
      { value: "ResNet-34", label: "image classifier", verified: true, source: "IntelliGuard/backend/model/model.py" },
      { value: "256²", label: "RGB input resolution", verified: true, source: "IntelliGuard/backend/model/model.py" },
      // Previously quoted figures. The project's published evaluation does not support them — do not enable.
      { value: "92%", label: "accuracy", verified: false },
      { value: "95%", label: "precision", verified: false },
    ],
    media: {
      type: "image",
      src: "/projects/defektguard/dashboard.webp",
      alt: "DefektGuard inventory overview dashboard showing scanned, damaged and intact item counts",
      secondary: [
        { src: "/projects/defektguard/scan-result.webp", alt: "DefektGuard scan result marking a package as damaged" },
        { src: "/projects/defektguard/landing.webp", alt: "DefektGuard landing page" },
      ],
    },
    links: [
      { label: "Demo video", href: "https://youtu.be/w_kA8id0Yv8", kind: "demo" },
      { label: "Source", href: "https://github.com/wesley-2329/IntelliGuard", kind: "code" },
    ],
    accent: "#4FD1E8",
  },
  {
    slug: "behavioral-cloning",
    index: "03",
    title: "Vehicle Behaviour Analysis & Behavioural Cloning",
    kicker: "Research project · ABV-IIITM Gwalior",
    status: "Research · 2025",
    summary:
      "Teaching a vehicle to drive by imitation: a behavioural cloning pipeline in the CARLA simulator, strengthened with trajectory analysis and collision-aware data collection.",
    highlights: [
      "Data collection and policy training inside the CARLA simulator",
      "Trajectory clustering to surface diverse and rare driving behaviour",
      "Dynamic collision avoidance scenarios for edge-case coverage",
      "Vision Transformer backbone via transfer learning for steering & speed",
    ],
    stack: ["Python", "CARLA", "Computer Vision", "Vision Transformers", "Deep Learning"],
    metrics: [
      // From the previous portfolio; not yet verified against a paper, report or repository.
      { value: "20,000+", label: "simulation frames", verified: false },
      { value: "35%", label: "edge-case coverage gain", verified: false },
      { value: "40%", label: "less training time", verified: false },
    ],
    media: { type: "visual", variant: "trajectory" },
    links: [],
    accent: "#E9C9A1",
  },
  {
    slug: "media-bias",
    index: "04",
    title: "Media Bias Detection & Mitigation for Indian Languages",
    kicker: "M.Tech research",
    status: "Ongoing research",
    ongoing: true,
    summary:
      "My ongoing M.Tech research: using NLP to detect, analyse and mitigate bias in news media written in Indian languages.",
    highlights: [
      "NLP for Indian languages",
      "Media bias detection",
      "Bias analysis",
      "Mitigation methodologies",
    ],
    stack: ["NLP", "Python", "Transformers", "Indian Languages"],
    metrics: [],
    media: { type: "visual", variant: "bias" },
    links: [],
    accent: "#B5A8FF",
    note: "Work in progress — results will be shared once published.",
  },
];

/** Other repositories on John's GitHub, summarised from their READMEs. */
export const moreWork = [
  {
    title: "AlgoNest",
    body: "Collaborative coding & interview-prep platform with sandboxed execution, BullMQ job queues and live pair-programming rooms.",
    tags: ["Node.js", "Redis", "Docker", "Socket.IO"],
    href: "https://github.com/wesley-2329/AlgoNest",
  },
  {
    title: "MAGE Open-Set Detection",
    body: "Reproduces ACL 2024 MAGE benchmarks for AI-generated text detection and adds an open-set generator-rejection layer.",
    tags: ["PyTorch", "NLP", "Research"],
    href: "https://github.com/wesley-2329/MAGE",
  },
  {
    title: "APCI — Parking Intelligence",
    body: "XGBoost forecasting of parking-driven congestion in Bengaluru with DBSCAN hotspots and patrol-route optimisation.",
    tags: ["XGBoost", "DBSCAN", "Leaflet"],
    href: "https://github.com/wesley-2329/APCI_parking_ntelligence",
  },
  {
    title: "Cyber-SecureSphere",
    body: "Context-aware firewall with ML-based anomaly detection, an admin dashboard and a local firewall agent.",
    tags: ["Python", "ML", "Security"],
    href: "https://github.com/wesley-2329/Cyber-SecureSphere",
  },
  {
    title: "Havenly",
    body: "Full-stack hotel booking platform with suites, dining reservations and JWT authentication.",
    tags: ["Express", "MongoDB", "JWT"],
    href: "https://github.com/wesley-2329/Havenly",
  },
  {
    title: "WesleyFoods",
    body: "MERN food-ordering app with live search, cart, order history and geolocation autofill.",
    tags: ["MERN", "JWT"],
    href: "https://github.com/wesley-2329/WesleyFoods",
  },
];

/* ------------------------------------------------------------------ */
/* Research storytelling                                               */
/* ------------------------------------------------------------------ */

export const researchSteps = [
  {
    step: "01",
    title: "Simulate",
    body: "Drive in the CARLA simulator to record synchronised camera frames alongside the controls a driver applied.",
  },
  {
    step: "02",
    title: "Analyse trajectories",
    body: "Cluster recorded trajectories to understand driving behaviour and find under-represented manoeuvres.",
  },
  {
    step: "03",
    title: "Cover the edge cases",
    body: "Add dynamic collision-avoidance scenarios so the dataset includes the situations that matter most.",
  },
  {
    step: "04",
    title: "Learn to drive",
    body: "Fine-tune a pre-trained Vision Transformer to map what the car sees to steering and speed.",
  },
];
