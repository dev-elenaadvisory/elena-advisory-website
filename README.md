# Elena Advisory Website

Marketing website for [Elena Advisory](https://elenaadvisory.com) — a private advisory service for international students building long-term careers in the United States.

## Pages

- **`index.html`** — Landing page with hero, services overview, and calls to action
- **`program.html`** — Details on the advisory program and pathways
- **`apply.html`** — Admission application form

## Project Structure

```
├── index.html
├── program.html
├── apply.html
├── styles.css
├── script.js
├── ContactFormMailTemplate.md
├── images/
│   └── favicon.svg
└── docs/
    ├── results.pdf
    ├── press.pdf
    ├── privacy.pdf
    └── terms.pdf
```

## Running Locally

This is a static site with no build step. Open `index.html` in a browser or use any local server:

```sh
# Python
python3 -m http.server 8000

# Node
npx serve .
```

## Tech Stack

- Plain HTML, CSS, JavaScript — no frameworks or bundlers
- Google Fonts (Cormorant Garamond, Cinzel, EB Garamond)
- Schema.org structured data (JSON-LD)
- Open Graph meta tags
