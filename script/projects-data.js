/* ═══════════════════════════════════════════════════════════════
   PROJECTS DATA  —  shared by projects.html & project-detail.html
   ═══════════════════════════════════════════════════════════════
   All fields are optional except id, title, type.
   Missing fields are simply not rendered — nothing breaks.

   Fields:
   ─────────────────────────────────────────────
   id          number      unique identifier
   title       string      project name
   type        string      "Landing" | "Business" | "E-commerce" | "Platform" | "Web App"
   stack       string[]    tech tags e.g. ["HTML", "CSS", "JavaScript"]
   year        string      e.g. "2024"
   country     string      e.g. "🇺🇸 United States"
   client      string      e.g. "Restaurant Business"
   platform    string      e.g. "Fiverr" | "UpWork" | "Direct"
   image       string      path to main image  e.g. "images/VRLounge.png"
   gallery     object[]    extra media items:
                           { type: "image" | "video", src: "path/to/file" }
   brief       string      1–2 sentence task description
   deliverables string[]   what you did (bullet points)
   review      object      { text: "...", author: "Client · Country" }
   liveUrl     string      live site URL (omit or "#" to hide button)
   ═══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    id: 1,
    title: "VR Lounge",
    type: "Landing",
    stack: ["HTML", "CSS", "JavaScript", "GSAP"],
    year: "2024",
    country: "🇺🇸 United States",
    client: "Entertainment · VR Club",
    platform: "Fiverr",
    image: "images/VRLounge.png",
    gallery: [
      { type: "image", src: "images/VRLounge.png" },
      { type: "image", src: "images/NationsOnFire.png" },
      { type: "image", src: "images/DreamApart.png" },
      { type: "image", src: "images/QBL.png" },
      { type: "image", src: "images/VRLounge.png" },
    ],
    brief: "A VR entertainment venue needed a high-impact landing page to drive bookings and showcase their immersive experiences.",
    deliverables: [
      "Full-page build from Figma design",
      "Advanced GSAP scroll animations and entrance effects",
      "Responsive layout for mobile and tablet",
      "Custom booking CTA section with hover interactions"
    ],
    review: {
      text: "The page looks stunning. Exactly what we needed — modern, fast, and our customers love it. Delivered ahead of schedule.",
      author: "Client · USA"
    },
    liveUrl: "#"
  },
  {
    id: 2,
    title: "Nations on Fire",
    type: "Platform",
    stack: ["HTML", "CSS", "JavaScript", "PHP"],
    year: "2024",
    country: "🇬🇧 United Kingdom",
    client: "Gaming · Online Platform",
    platform: "UpWork",
    image: "images/NationsOnFire.png",
    brief: "A competitive online gaming platform requiring user authentication, dynamic leaderboards, and real-time match data.",
    deliverables: [
      "Multi-page platform architecture",
      "PHP backend with user registration and login",
      "Dynamic leaderboard and match history sections",
      "Fully responsive across all devices"
    ],
    liveUrl: "#"
  },
  {
    id: 3,
    title: "Dream Apart",
    type: "Business",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2023",
    country: "🇵🇱 Poland",
    client: "Real Estate · Apartments",
    platform: "Dreamer Studio",
    image: "images/DreamApart.png",
    brief: "A premium apartment rental service needed a clean, conversion-focused website to attract international tenants.",
    deliverables: [
      "Property showcase with image galleries",
      "Interactive contact and booking form",
      "Multi-language layout preparation",
      "SEO-optimized structure and meta setup"
    ],
    liveUrl: "#"
  },
  {
    id: 4,
    title: "QBL Platform",
    type: "Web App",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    year: "2024",
    country: "🇨🇦 Canada",
    client: "Sports · League Management",
    platform: "UpWork",
    image: "images/QBL.png",
    brief: "A basketball league needed a full management platform — teams, schedules, standings, and player profiles, all in one place.",
    deliverables: [
      "Admin dashboard for league management",
      "Dynamic standings and schedule system",
      "Player and team profile pages",
      "PHP + SQL backend with full CRUD"
    ],
    liveUrl: "#"
  },
  // ─── ADD YOUR OWN PROJECTS HERE ──────────────────────────────
  // {
  //   id: 5,
  //   title: "Project Name",
  //   type: "Landing",
  //   stack: ["HTML", "CSS", "JS"],
  //   year: "2024",
  //   country: "🇩🇪 Germany",
  //   client: "Restaurant Business",
  //   platform: "Fiverr",
  //   image: "images/your-screenshot.png",
  //   gallery: [
  //     { type: "image", src: "images/your-detail.png" },
  //     { type: "video", src: "images/your-demo.mp4" },
  //   ],
  //   brief: "Short task description.",
  //   deliverables: ["Thing 1", "Thing 2"],
  //   review: { text: "Great work!", author: "Client · Country" },
  //   liveUrl: "https://yourproject.com"
  // },
];
