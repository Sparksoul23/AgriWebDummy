# AgriWeb Prototype

A modern, responsive, front-end web prototype structured for an agriculture and seed distribution company. Built with clean HTML, Vanilla CSS, and modular Vanilla JS—requiring zero external libraries for its core operations.

## Overview
This platform acts as a showcase layout for a dummy company "AgriWeb," featuring extensive landing pages, product grids, a mock blog, and highly interactive UI components like a "Smart Seed Selector." 

Its architecture is kept deliberately lightweight, utilizing grid layouts and variable-driven CSS to enforce strict UI consistency across light and dark modes natively.

## Project Structure
```text
AgriWebDummy/
â”œâ”€â”€ index.html                # Main landing page
â”œâ”€â”€ about.html                # Company history & team layout
â”œâ”€â”€ products.html             # Main catalogue grid layout
â”œâ”€â”€ product-detail.html       # Individual product specification page
â”œâ”€â”€ smart-selector.html       # Multi-step seed recommendation wizard
â”œâ”€â”€ technology.html           # Research methodology overview
â”œâ”€â”€ blog.html & blog-post.html# Knowledge center & articles
â”œâ”€â”€ sustainability.html       # Corporate responsibility
â”œâ”€â”€ distributors.html         # Network application portal
â”œâ”€â”€ contact.html              # Core communication interfaces
â”œâ”€â”€ careers.html              # Job portal layout
â””â”€â”€ assets/
    â”œâ”€â”€ css/                  # Structured stylesheet bundles
    â”œâ”€â”€ js/                   # Segmented module operations
    â””â”€â”€ images/               # Local site graphical assets
```

## Features
- **Smart Seed Recommendation Engine:** A 5-step interactive wizard `selector-logic.js` matching user environmental conditions (soil, climate, irrigation capabilities) to appropriate agricultural products.
- **Robust Theming:** A dynamic dark mode toggle orchestrated by `theme-lang.js` and defined entirely through mapped CSS token variables in `base.css`.
- **Dynamic Product Grids:** JSON-driven architecture (`products.json`) parsing product statistics natively inside `product-filter.js`.
- **Performant Vector Media:** Clean implementation of scalable, high-resolution SVG icon layouts ensuring no text-encoding fragmentation issues across browsers.

## ðŸ”— Links
- **GitHub Profile**: [Sparksoul23](https://github.com/Sparksoul23)
- **Email**: [Vikramyadav1192007@gmail.com](mailto:Vikramyadav1192007@gmail.com)
