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
    title: "Digital Journalism & CSA",
    type: "Editorial / Interactive Article",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🇪🇺 Europe",
    client: "Academic Project · Journalism",
    platform: "Personal",
    image: "images/SexualAssault.png",
    gallery: [
        { type: "image", src: "images/SexualAssault2.png" },
      { type: "image", src: "images/SexualAssault1.png" },
    
      { type: "image", src: "images/SexualAssault3.png" },
      { type: "image", src: "images/SexualAssault4.png" } 
    ],
    brief: "A long-form digital journalism project focused on sensitive storytelling, combining structured content, readability, and ethical UX.",
    deliverables: [
      "Long-form editorial layout",
      "Structured storytelling UX",
      "Responsive typography system",
      "Clean content hierarchy"
    ],
    review: {
      text: "A powerful and well-structured digital experience. The content is presented clearly and professionally.",
      author: "Academic Reviewer"
    },
    liveUrl: "https://oleksandr549.github.io/SexualAssault.github.io/"
  },

  {
    id: 2,
    title: "Levantine Collective",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🌍 Global",
    client: "Creative Collective",
    platform: "Personal",
    image: "images/LevantineCollective.png",
    gallery: [
      { type: "image", src: "images/LevantineCollective3.png" },
      { type: "image", src: "images/LevantineCollective2.png" },
      { type: "image", src: "images/LevantineCollective1.png" },
      { type: "image", src: "images/LevantineCollective4.png" },
  
    ],
    brief: "A modern landing page for a creative collective with focus on branding, typography, and visual identity.",
    deliverables: [
      "Brand-focused UI design",
      "Responsive layout",
      "Typography-driven design",
      "Clean section structure"
    ],
    review: {
      text: "Elegant and modern design. Strong visual identity and great attention to detail.",
      author: "Design Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/LevantineCollective.github.io/"
  },

  {
    id: 3,
    title: "Chat UI",
    type: "Web App",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2024",
    country: "🌍 Global",
    client: "Concept UI",
    platform: "Personal",
    image: "images/Chat.png",
    gallery: [{ type: "image", src: "images/Chat.png" }],
    brief: "A clean and modern messaging interface concept focused on usability and layout clarity.",
    deliverables: [
      "Chat interface layout",
      "Message UI system",
      "Responsive design",
      "Minimal UX approach"
    ],
    review: {
      text: "Simple, clean, and very usable interface. Feels like a real product.",
      author: "UI Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/Chat.github.io/"
  },

  {
    id: 4,
    title: "KAAS Platform",
    type: "Landing / SaaS",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🌍 Global",
    client: "Startup Concept",
    platform: "Personal",
    image: "images/KAAS.png",
    gallery: [{ type: "image", src: "images/KAAS.png" }],
    brief: "A SaaS-style landing page presenting a digital product with structured sections and clear messaging.",
    deliverables: [
      "SaaS landing structure",
      "Feature sections UI",
      "Call-to-action blocks",
      "Responsive layout"
    ],
    review: {
      text: "Professional SaaS look with clear structure and strong usability.",
      author: "Product Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/KAAS.github.io/"
  },

  {
    id: 5,
    title: "Nations On Fire",
    type: "Interactive Landing",
    stack: ["HTML", "CSS", "JavaScript", "GSAP"],
    year: "2024",
    country: "🌍 Global",
    client: "Awareness Project",
    platform: "Personal",
    image: "images/NationsOnFire.png",
    gallery: [{ type: "image", src: "images/NationsOnFire.png" }],
    brief: "An animation-driven landing page using scroll-based interactions to create an immersive experience.",
    deliverables: [
      "GSAP animations",
      "Scroll-based storytelling",
      "Responsive design",
      "Visual-driven layout"
    ],
    review: {
      text: "Great use of animation. Smooth and engaging experience.",
      author: "Design Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/Nations-On-Fire-git.io/"
  },

  {
    id: 6,
    title: "Matrix Experience",
    type: "Interactive Landing",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2024",
    country: "🇵🇱 Poland",
    client: "Creative Studio",
    platform: "Web",
    image: "images/Matrix.png",
    gallery: [{ type: "image", src: "images/Matrix.png" }],
    brief: "A visually experimental landing page inspired by digital aesthetics and immersive visuals.",
    deliverables: [
      "Experimental UI design",
      "Visual effects",
      "Responsive layout",
      "Creative concept implementation"
    ],
    review: {
      text: "Unique and visually striking concept. Feels very experimental and modern.",
      author: "Creative Feedback"
    },
    liveUrl: "http://matrix.dreamerstudio.pl/"
  },

  {
    id: 7,
    title: "QBL Platform",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2024",
    country: "🌍 Global",
    client: "Business Concept",
    platform: "Personal",
    image: "images/QBL.png",
    gallery: [{ type: "image", src: "images/QBL.png" }],
    brief: "A corporate-style landing page with structured sections and business-oriented UI.",
    deliverables: [
      "Business landing UI",
      "Structured layout",
      "Responsive design",
      "Clear content hierarchy"
    ],
    review: {
      text: "Clean and professional. Well-structured for business use.",
      author: "Client Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/QBL.github.io/"
  },

  {
    id: 8,
    title: "Dream Apart",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2024",
    country: "🌍 Global",
    client: "Creative Project",
    platform: "Personal",
    image: "images/DreamApart.png",
    gallery: [{ type: "image", src: "images/DreamApart.png" }],
    brief: "A visually soft and aesthetic landing page focused on mood and presentation.",
    deliverables: [
      "Aesthetic UI design",
      "Responsive layout",
      "Visual hierarchy",
      "Modern typography"
    ],
    review: {
      text: "Beautiful and атмосферный дизайн. Strong visual mood.",
      author: "Design Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/DreamApart/"
  },

  {
    id: 9,
    title: "VR Lounge 2",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript", "GSAP"],
    year: "2025",
    country: "🇺🇸 United States",
    client: "VR Entertainment",
    platform: "Fiverr",
    image: "images/VRLounge.png",
    gallery: [{ type: "image", src: "images/VRLounge.png" }],
    brief: "A high-impact landing page for a VR business with focus on animations and conversion.",
    deliverables: [
      "GSAP animations",
      "Interactive sections",
      "Responsive layout",
      "Conversion-focused design"
    ],
    review: {
      text: "Modern, smooth, and very engaging. Exactly what we needed.",
      author: "Client · USA"
    },
    liveUrl: "https://oleksandr549.github.io/VRLounge2.github.io/"
  },

  {
    id: 10,
    title: "Restaurant Business",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🌍 Global",
    client: "Restaurant",
    platform: "Personal",
    image: "images/Restaurant.png",
    gallery: [{ type: "image", src: "images/Restaurant.png" }],
    brief: "A restaurant landing page showcasing menu, atmosphere, and booking flow.",
    deliverables: [
      "Restaurant UI",
      "Menu section",
      "Responsive design",
      "Call-to-action blocks"
    ],
    review: {
      text: "Clean and appetizing design. Works great for a restaurant.",
      author: "UI Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/Restaurant-Busienss.github.io/"
  },

  {
    id: 11,
    title: "TaskFlow",
    type: "Web App",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🌍 Global",
    client: "Productivity Concept",
    platform: "Personal",
    image: "images/TaskFlow.png",
    gallery: [{type: "image", src: "images/TaskFlow4.png"},
                {type: "image", src: "images/TaskFlow1.png"},
                {type: "image", src: "images/TaskFlow2.png"},
                {type: "image", src: "images/TaskFlow3.png"},
     ],
    brief: "A productivity tool interface designed for task management and workflow organization.",
    deliverables: [
      "Dashboard UI",
      "Task system layout",
      "Responsive design",
      "Minimal UX"
    ],
    review: {
      text: "Simple and effective. Great base for a SaaS product.",
      author: "Product Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/TaskFlow.github.io/"
  },

  {
    id: 12,
    title: "CaseHyg",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🌍 Global",
    client: "Medical / Hygiene",
    platform: "Personal",
    image: "images/CaseHyg.png",
    gallery: [{ type: "image", src: "images/CaseHyg.png" }],
    brief: "A clean and trust-focused landing page for a hygiene/medical product.",
    deliverables: [
      "Clean UI design",
      "Trust-focused layout",
      "Responsive structure",
      "Product presentation"
    ],
    review: {
      text: "Very clean and professional. Builds trust immediately.",
      author: "Client Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/CaseHyg.github.io/"
  },

  {
    id: 13,
    title: "HTP Platform",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🌍 Global",
    client: "Business",
    platform: "Personal",
    image: "images/HTP.png",
    gallery: [{ type: "image", src: "images/HTP.png" }],
    brief: "A business landing page with structured sections and clear messaging.",
    deliverables: [
      "Corporate UI",
      "Responsive layout",
      "Content structure",
      "CTA sections"
    ],
    review: {
      text: "Clear and structured. Good for business presentation.",
      author: "Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/HTP.github.io/"
  },

  {
    id: 14,
    title: "Ski Carv",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🌍 Global",
    client: "Sports",
    platform: "Personal",
    image: "images/Ski.png",
    gallery: [{ type: "image", src: "images/Ski.png" }],
    brief: "A dynamic landing page for a sports-related product with energetic visuals.",
    deliverables: [
      "Sport-style UI",
      "Responsive design",
      "Visual layout",
      "Modern typography"
    ],
    review: {
      text: "Dynamic and energetic design. Matches the product well.",
      author: "Design Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/Ski-Carv.github.io/"
  },

  {
    id: 15,
    title: "Fiverr Demo",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🌍 Global",
    client: "Freelance Demo",
    platform: "Fiverr",
    image: "images/Fiverr.png",
    gallery: [{ type: "image", src: "images/Fiverr.png" }],
    brief: "A demo landing page created to showcase freelance capabilities and attract clients.",
    deliverables: [
      "Conversion-focused layout",
      "Responsive design",
      "Modern UI",
      "Portfolio-ready structure"
    ],
    review: {
      text: "Great showcase piece. Perfect for attracting clients.",
      author: "Freelance Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/fiverdemo.github.io/"
  },

  {
    id: 16,
    title: "FinSweet Style Website",
    type: "Landing Page",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    country: "🌍 Global",
    client: "Web Design Concept",
    platform: "Personal",
    image: "images/Finsweet.png",
    gallery: [{ type: "image", src: "images/Finsweet.png" }],
    brief: "A modern website inspired by premium agency design trends with clean layout and strong UI.",
    deliverables: [
      "Agency-style UI",
      "Responsive layout",
      "Modern design system",
      "Clean structure"
    ],
    review: {
      text: "Looks like a premium agency website. Clean and modern.",
      author: "Design Feedback"
    },
    liveUrl: "https://oleksandr549.github.io/finsweetwebsiteoleksandr.github.io/home.html"
  }
  

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
