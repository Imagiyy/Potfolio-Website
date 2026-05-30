# ELC Portfolio

A premium, high-performance, and responsive portfolio website built specifically for showcasing projects, skills, and academic achievements in Electrical & Computer Engineering.

## 🚀 Features

- **Rich, Dynamic Aesthetics**: Modern dark theme with grid backgrounds, glowing purple accent gradients, and custom micro-animations (cards scale up and glow on hover).
- **Tabbed Navigation**: Seamless switching between Projects, Skills, and Achievements tabs without page reloads.
- **Config-Driven Content**: Dynamic content injection powered by `config.js`, separating layout from personal data.
- **Anti-Scraping Protection**: Sensitive contact details (Email, Phone, LinkedIn, GitHub) are segmented into a 5-part obfuscation array and reassembled only upon user click to thwart bot harvesting.
- **Zero Build Overhead**: Powered by pure, vanilla CSS and modern JavaScript, utilizing Tailwind Play CDN for layout utility classes without requiring complex build environments.

---

## 📂 Project Structure

```bash
├── index.html          # Core layout, structure, and HTML markup
├── styles.css          # Custom typography, animations, gradients, and hovers
├── script.js          # Dynamic DOM rendering and obfuscated link resolver
├── config.js           # Your personal configuration (local-only, ignored by git)
├── config.example.js   # Template config structure committed to git
├── resume.pdf          # Your resume file (place your own resume here)
└── .gitignore          # Git configuration file to keep credentials private
```

---

## 🛠️ Setup Instructions

### 1. Clone & Initialize
If you are running the project locally:
```bash
# Clone the repository
git clone <your-repository-url>
cd elc-portfolio
```

### 2. Configure Your Personal Details
Since `config.js` is ignored by Git to protect your contact details:
1. Copy the example configuration template:
   ```bash
   cp config.example.js config.js
   ```
2. Open `config.js` in your editor and update the details with your own name, college, email parts, phone parts, LinkedIn parts, and GitHub parts.

### 3. Add Your Resume
Rename your resume file to `resume.pdf` and place it in the root folder of the project.

### 4. Run the Project
Simply open `index.html` in any web browser, or use a local dev server (like VS Code Live Server extension or Python's HTTP server):
```bash
# Run a quick local server
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.
