// Portfolio Configuration System - Example Template
// Copy this file to 'config.js' and fill in your own details.
const CONFIG = {
  name: "Your Name",
  title: "Your Professional Title",
  college: "Your University/Organization",
  collegeDescription: "A brief summary of your education focus or key activities.",
  resumeUrl: "resume.pdf", // Path to your resume PDF file (placed in root or online)

  // Segmented contact info (5 parts each) to protect against scrapers/bots
  emailParts: ["your", "email", "prefix", "@gma", "il.com"],
  phoneParts: ["+91", "1234", "5", "678", "90"],
  linkedinParts: ["linkedin", ".com/in", "/your", "-profile", "-url"],
  githubParts: ["git", "hub", ".com", "/your", "username"],

  // Theme configuration (Hex values for color customization)
  theme: {
    primaryColor: "#8b5cf6",   // Hex for primary color (Default: violet)
    secondaryColor: "#10b981", // Hex for secondary color (Default: emerald)
  },

  // Hero Section
  hero: {
    titleNormal: "Your Headline First",
    titleHighlight: "Highlight Phrase",
    description: "Introduce your engineering skills, professional philosophy, and general domain expertise here."
  },

  // Projects Matrix
  projects: [
    {
      id: "project-unique-id-1",
      year: "2024",
      title: "Pioneering System Design",
      description: "A short, engaging high-level summary of your project.",
      details: "Detailed breakdown of the design architecture, problem constraints, methodology, and results.",
      icon: "cpu", // Options: "cpu", "layers", "code", "eye", "cloud", "award", "users", "globe", "terminal", "database", "settings", "activity"
      specs: [
        { label: "Processor", value: "Custom Specification 1" },
        { label: "Compiler", value: "Custom Specification 2" },
        { label: "Key Stat", value: "Custom Specification 3" }
      ],
      tags: ["C++", "SystemVerilog", "Embedded"]
    }
  ],

  // Skills Categories (add as many as you need)
  skills: [
    {
      category: "Software Engineering",
      icon: "code",
      items: ["Rust", "Python", "Go", "Git", "Docker"]
    },
    {
      category: "Hardware Design",
      icon: "cpu",
      items: ["Verilog", "FPGA Synthesis", "Kicad", "Oscilloscopes"]
    }
  ],

  // Achievements & Milestones (custom category groupings allowed)
  achievements: [
    {
      category: "Milestones",
      items: [
        {
          year: "2024",
          title: "Major Achievement",
          subtitle: "Issuing Organization • Your Role",
          description: "Details about the milestone, metrics of success, or responsibilities."
        }
      ]
    },
    {
      category: "Professional Affiliations",
      items: [
        {
          title: "Engineering Association",
          subtitle: "Committee Member",
          description: "Summary of your contributions to the society."
        }
      ]
    }
  ]
};
