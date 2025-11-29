# Climate Wayfinding

> **"In Defense of a Beating Heart"** — How falling in love with the wild world shaped my climate journey

A sophisticated, single-page website exploring how emotional connection to nature provides a more authentic foundation for climate action than guilt or obligation. Created as a final project for PHI 116: Climate Philosophy.

---

## 🌿 Overview

This website articulates a philosophical position on climate ethics through personal narrative, drawing on two key frameworks:

- **Ecocentrism**: Nature's intrinsic value beyond human utility
- **Care Ethics**: Environmental action as caring for relationships

The core thesis argues that love and relationship, rather than guilt and fear, provide a more sustainable foundation for long-term environmental commitment.

---

## 🚀 Quick Start

### Local Development

1. **Clone or download the project**

2. **Open with a local server** (choose one method):

   Using Python:
   ```bash
   cd phi-climate-project
   python -m http.server 8000
   ```

   Using Node.js:
   ```bash
   cd phi-climate-project
   npx serve .
   ```

   Using VS Code:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **View in browser** at `http://localhost:8000` (or the port shown)

---

## 📦 Deployment to Vercel

### Option 1: Deploy via Git

1. Push project to GitHub/GitLab/Bitbucket
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Vercel will auto-detect settings and deploy

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
cd phi-climate-project
vercel
```

---

## 📁 Project Structure

```
phi-climate-project/
├── index.html          # Main HTML document
├── vercel.json         # Vercel deployment configuration
├── package.json        # Node.js package manifest
├── README.md           # This file
├── styles/
│   └── main.css        # All styles with CSS custom properties
├── scripts/
│   └── main.js         # Interactive features and animations
└── assets/
    └── images/         # Image assets (if needed)
```

---

## 🎨 Design System

### Colors (CSS Custom Properties)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--primary-deep` | `#1B4332` | Forest green, headers |
| `--primary-medium` | `#40916C` | Ecosystem green, links |
| `--accent-warm` | `#D4A373` | Earth tone, accents |
| `--neutral-light` | `#FEFAE0` | Warm paper, backgrounds |
| `--neutral-dark` | `#2D2D2A` | Rich text, body copy |

### Typography

- **Headlines**: Playfair Display (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Scale**: Fluid typography using `clamp()` for responsive sizing

### Features

- ✅ Smooth scroll navigation
- ✅ Sticky header with transparency transition
- ✅ Scroll-triggered animations
- ✅ Mobile-responsive navigation
- ✅ Accessibility-first design (WCAG 2.1 AA)
- ✅ Reduced motion support
- ✅ Print stylesheet

---

## ♿ Accessibility

This project is built with accessibility in mind:

- Semantic HTML5 structure
- ARIA labels and roles where appropriate
- Skip link for keyboard navigation
- Focus-visible styles
- Reduced motion media query support
- Sufficient color contrast ratios
- Screen reader friendly content structure

---

## 🔧 Customization

### Updating Content

Edit `index.html` to modify:
- Personal narrative (Section 2)
- Philosophical frameworks (Section 3)
- Action items (Section 4)
- Quotes and attributions

### Updating Styles

Edit `styles/main.css`:
- Colors: Modify CSS custom properties in `:root`
- Typography: Adjust font families and scale
- Spacing: Update spacing scale variables
- Animations: Modify keyframes and transitions

### Adding Images

1. Place images in `assets/images/`
2. Reference in HTML: `<img src="assets/images/your-image.jpg" alt="Description">`
3. Consider using WebP format for better performance

---

## 📝 Content Sections

1. **Hero**: Full-viewport introduction with title and call-to-action
2. **Personal Narrative**: Formative nature experience and ecological awakening
3. **Philosophical Framework**: Ecocentrism and Care Ethics explained
4. **Action & Application**: Three tangible pathways for engagement
5. **Conclusion**: Reflective closing statement

---

## 🌐 Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome for Android)

---

## 📄 License

MIT License - Feel free to adapt for your own projects.

---

## 🙏 Acknowledgments

- **Aldo Leopold** - *A Sand County Almanac*
- **Nel Noddings** - *Caring: A Feminine Approach to Ethics*
- PHI 116: Climate Philosophy course and instructor

---

*"The climate crisis asks us not to fear the future, but to love the present more deeply."*


