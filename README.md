# AgriWeb Prototype

A modern, responsive, front-end web prototype structured for an agriculture and seed distribution company. Built with clean HTML, Vanilla CSS, and modular Vanilla JS—requiring zero external libraries for its core operations.

## Overview
This platform acts as a showcase layout for a dummy company "AgriWeb," featuring extensive landing pages, product grids, a mock blog, and highly interactive UI components like a "Smart Seed Selector." 

Its architecture is kept deliberately lightweight, utilizing grid layouts and variable-driven CSS to enforce strict UI consistency across light and dark modes natively.

## Project Structure
```text
AgriWebDummy/
├── index.html                # Main landing page
├── about.html                # Company history & team layout
├── products.html             # Main catalogue grid layout
├── product-detail.html       # Individual product specification page
├── smart-selector.html       # Multi-step seed recommendation wizard
├── technology.html           # Research methodology overview
├── blog.html & blog-post.html# Knowledge center & articles
├── sustainability.html       # Corporate responsibility
├── distributors.html         # Network application portal
├── contact.html              # Core communication interfaces
├── careers.html              # Job portal layout
└── assets/
    ├── css/                  # Structured stylesheet bundles
    ├── js/                   # Segmented module operations
    └── images/               # Local site graphical assets
```

## Features
- **Smart Seed Recommendation Engine:** A 5-step interactive wizard `selector-logic.js` matching user environmental conditions (soil, climate, irrigation capabilities) to appropriate agricultural products.
- **Robust Theming:** A dynamic dark mode toggle orchestrated by `theme-lang.js` and defined entirely through mapped CSS token variables in `base.css`.
- **Dynamic Product Grids:** JSON-driven architecture (`products.json`) parsing product statistics natively inside `product-filter.js`.
- **Performant Vector Media:** Clean implementation of scalable, high-resolution SVG icon layouts ensuring no text-encoding fragmentation issues across browsers.

## ðŸ”— Links
- **GitHub Profile**: [Sparksoul23](https://github.com/Sparksoul23)
- **Email**: [Vikramyadav1192007@gmail.com](mailto:Vikramyadav1192007@gmail.com)
