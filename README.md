# Customizable Portfolio Website Template

A premium, high-performance, and responsive portfolio website template built specifically for showcasing projects, skills, and achievements. Designed to be completely customizable, this template lets anyone create a professional developer or engineering portfolio by modifying a single configuration file.

## 🚀 Features

- **Professional Profile Layout**: A clean, institutional header layout highlighting your name, professional title, and background profile details.
- **Runtime Theme Customization**: Define custom primary and secondary brand colors in `config.js` to change the entire site's theme (gradients, highlights, card borders, and shadows) instantly.
- **Dynamic Content Engine**: Layout is fully decoupled from content. Modify projects, skills, and achievements dynamic grids from a simple JSON-like JavaScript schema.
- **Anti-Scraping Protection**: Sensitive contact details (Email, Phone, LinkedIn, GitHub) are segmented into a 5-part obfuscation array and reassembled only upon user interaction to thwart email-harvesting bots.
- **Tabbed Navigation**: Seamless switching between Projects, Skills, and Achievements tabs with smooth view-transitions.
- **Zero Build Overhead**: Powered by pure HTML, vanilla CSS, and modern JavaScript, utilizing Tailwind Play CDN for layout utility classes without requiring complex build steps or dependencies.

---

## 📂 Project Structure

```bash
├── index.html          # Core layout, structure, and HTML markup
├── styles.css          # Custom typography, animations, gradients, and hovers
├── script.js           # Dynamic DOM rendering, theme compiler, and link resolver
├── config.js           # Your personal configuration
└── README.md           # Project documentation and guide
```

---

## 🛠️ Setup Instructions

### 1. Configure Your Personal Details
Open `config.js` in your editor and update the details:
- **General Info**: Name, college name, professional title, biography/descriptions.
- **Contact Obfuscation**: Split your email, GitHub profile path, LinkedIn profile path, and phone number into 5 equal parts to protect them from scrapers.
- **Custom Themes**: Change `theme.primaryColor` and `theme.secondaryColor` to any hex color code.
- **Projects**: Add, modify, or remove project objects (with custom tags, expandable details, and specs matrices).
- **Skills & Achievements**: Add custom categories, list items, and choose from supported icons.

### 2. Add Your Resume
Rename your resume file to `resume.pdf` and place it in the root folder of the project.

### 3. Run the Project
Simply open `index.html` in any web browser, or use a local dev server (like VS Code Live Server extension or Python's HTTP server):
```bash
# Run a quick local server
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## 🎨 Theme & Icon Configuration

### Supported Custom Icons
The template includes built-in SVG icon mapping. You can specify any of the following values for the `icon` field on projects, skills, or achievements:
- `cpu`: For hardware, microprocessors, or systems engineering.
- `layers`: For multilayer architectures or generic systems.
- `code`: For generic software development or scripts.
- `network`: For connectivity, routing, and APIs.
- `database`: For database systems and data engineering.
- `terminal`: For CLI tools and scripts.
- `globe`: For web projects or remote systems.
- `award`: For certifications, milestones, and awards.
- `users`: For student groups, leadership, or organizations.
- `briefcase`: For work history and professional experiences.
- `book`: For education and academic accomplishments.
- `activity`: For telemetry, monitoring, or real-time metrics.
