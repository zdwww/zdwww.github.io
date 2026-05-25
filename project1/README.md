# Mabu, Peanut & 张三 — A cabinet of three cats

A small editorial photo archive of my three cats — **Mabu** (long-haired
silver tabby), **Peanut** (a curly-coated ginger in the Devon Rex
tradition), and **张三** (a pure-white Turkish-Angora-style longhair).
Built in vanilla HTML5 / CSS3 / ES6+ modules with no frameworks, no jQuery,
no component libraries.

Live site: <https://zdwww.github.io/project1/>

## Author

**Daiwei Zhang** — PhD student, Khoury College of Computer Sciences,
Northeastern University.

- Email: `zhang.daiwe@northeastern.edu`
- Site: <https://zdwww.github.io/>

## Class Link

Northeastern University · Web Development (Project 1: Your personal home page).
Course page: <https://northeastern.instructure.com/courses/249954/assignments/3196233>

## Project objective

Build a small, fully-static personal site that satisfies the Project 1
rubric (vanilla HTML5/CSS3/ES6+, ES6 modules, ≥ 2 pages plus an
AI-generated page, an original JS component, organized assets, semantic
markup, prettier + eslint, MIT license) while still being a real page worth
looking at. The chosen subject is three cats; the chosen aesthetic is a
1960s-style zoological-journal layout. The site is deployed at
`/project1/` of the author's GitHub Pages site so it does not interfere
with the unrelated academic homepage at the root.

## Pages

| Path                 | Purpose                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `index.html`         | Filterable photograph gallery with an arrow-key lightbox viewer.                                            |
| `about.html`         | Editorial biographies of Mabu, Peanut, and 张三.                                                            |
| `ai-companions.html` | The **AI-generated** page: animated sprite companions of Mabu and Peanut, plus a placeholder card for 张三. |

## Screenshot

`screenshot.png` (committed alongside this README) shows the gallery page.

## Folder structure

```
project1/
├── index.html
├── about.html
├── ai-companions.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js        # entry, branches by data-page
│   ├── manifest.js    # exported photo list
│   ├── lightbox.js    # original component: <dialog> + arrow-key navigation
│   ├── filter.js      # cat filter; dispatches a custom event for the lightbox
│   └── sprite.js      # AI-pet spritesheet animator (rAF-driven)
├── images/
│   ├── mabu/          # photographs of Mabu
│   ├── peanut/        # photographs of Peanut
│   ├── zhangsan/      # photographs of 张三
│   ├── ai/            # AI-generated spritesheets and pet.json metadata
│   └── favicon.svg
├── package.json       # type: "module"; no runtime dependencies
├── .eslintrc.json
├── .prettierrc
├── LICENSE
└── README.md
```

## Build / run instructions

No build step. Everything is hand-authored, framework-free.

```bash
# Clone (or open this folder in place)
git clone https://github.com/zdwww/zdwww.github.io.git
cd zdwww.github.io/project1

# Local preview — any static server works
python3 -m http.server 8080
# then open http://localhost:8080/
```

Optional developer commands (require `npm install` first):

```bash
npm run format       # Prettier writes
npm run format:check # Prettier check only
npm run lint         # ESLint on js/
```

## Original component

The lightbox in `js/lightbox.js` is the original ES6-only component:

- Built on the native `<dialog>` element (no library).
- Click any photograph to open it full-screen.
- ← and → keys cycle through the visible photos.
- `Esc` closes; clicking the dark backdrop closes.
- The lightbox listens for the custom `gallery:filter` event so that, after a
  filter is applied, prev/next only walks the currently-visible photos.

The AI-companions page features a second small original component
(`js/sprite.js`) that animates the AI-generated spritesheets by stepping
`background-position` in a `requestAnimationFrame` loop, with `Idle`,
`Wave`, `Jump`, and `Pause` controls and a `prefers-reduced-motion` fallback.

## Use of GenAI

Generative AI tools were used in three distinct ways for this project. Each
is documented below.

### 1. Sprite generation for the AI-Companions page

The two animated companions on `ai-companions.html` were produced by the
Codex `hatch-pet` skill — an image-generation pipeline that orchestrates an
image model to produce a 9-row, 8-column `192×208`-pixel spritesheet per
pet, plus a small `pet.json` metadata file with a textual description. The
pipeline was seeded with photographs and short descriptions of the real
Mabu and Peanut. The resulting `spritesheet.webp` and `pet.json` files were
copied into `images/ai/` and are loaded at runtime by `js/sprite.js`.

This page is explicitly disclosed as AI-generated.

### 2. Scaffolding assistance

The initial folder structure, the ES6 modules (`lightbox.js`, `filter.js`,
`sprite.js`, `manifest.js`, `main.js`), `styles.css`, and the three HTML
pages were drafted with assistance from Anthropic's **Claude** (model:
`claude-opus-4-7`) inside the Claude Code CLI. The Anthropic
`frontend-design` skill was loaded into the session and used to drive
aesthetic choices (typography pairing, palette, layout). Prompts were
iterative and conversational; the final structure, content, copy edits,
and review for rubric compliance were performed by the author.

### 3. Bio copy

The biographical text on `about.html` was drafted with help from Claude in
the same session and then edited by the author. The factual claims (coat,
eyes, signature sounds) reflect the real cats; the prose styling is partly
AI-assisted.

No AI-generated content appears on the gallery (`index.html`) other than
this README's acknowledgement; the photographs and their captions are the
author's.

## License

MIT — see [LICENSE](LICENSE).
