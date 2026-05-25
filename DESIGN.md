# Design Document — Daiwei Zhang's Personal Home Page

**Course:** CS 5610 Web Development (Online, Summer 2026) ·
[course page](https://johnguerra.co/classes/webDevelopment_online_summer_2026/)
**Live site:** <https://zdwww.github.io>

Covers the four Design-Document elements required by the Project 1 rubric:
project description, user personas, user stories, design mockups.

---

## 1. Project description

A personal home page that serves two visitors at once: an **academic
reader** (research, CV, contact) and a **casual visitor** (a more human
side). Two layers ship from this repository:

| Layer                 | URL prefix              | Stack                                    | Purpose                                  |
| --------------------- | ----------------------- | ---------------------------------------- | ---------------------------------------- |
| Academic homepage     | `/`, `/cv/`, `/personal/` | Jekyll + Academic Pages + Bootstrap 5  | Real personal/academic content           |
| Vanilla cat archive   | `/project1/*`           | Hand-authored HTML5/CSS3/ES6 modules    | Rubric-compliant graded submission       |

The vanilla layer is an editorial photo archive of three cats — chosen
as a subject because the photographs are abundant, the content is
personal without leaking sensitive information, and the
zoological-journal aesthetic resists the generic "AI-template" look the
rubric warns against. The two layers cross-link: `/personal/` has a
"Cabinet of Cats" card that opens the archive, and every page in
`/project1/` carries a back-link to `/`.

---

## 2. User personas

**Mei**, 38, prospective research collaborator. Assistant Professor of
Robotics; reviewing a paper that cites the author's Gaussian-Splatting
work. Wants to confirm authorship, find publications, and grab an
email — within a minute, on a desktop. Frustrated by academic homepages
buried under six clicks.

**Alex**, 27, an old college friend. Software engineer, not in
academia, browsing on a phone. Doesn't care about the CV; wants a
human signal — a photo, a hobby, something he can show his partner.
Frustrated by CV-only pages and sites that don't work without
JavaScript.

---

## 3. User stories

**Story 1 — "I just need to know if he's real."** (Mei)
Mei pastes `zdwww.github.io` into her address bar, lands on the about
page, and within five seconds sees a photo, a one-paragraph bio naming
the advisor, and a "Publications" link in the nav. She clicks it,
finds the paper that brought her, copies the email from the sidebar,
and closes the tab. Total time on site: under a minute.

**Story 2 — "Where's the human side?"** (Alex)
Alex opens the site on his phone. The landing page looks academic and
dry, but he notices a "Personal" link in the top nav. He taps it,
scrolls, sees a card with two animated cat sprites and a kicker — "The
Cabinet of Cats" — taps it, lands on the biographies page, and grins.

**Story 3 — "Filter, lightbox, keyboard nav."** (Alex, later)
Alex clicks "Gallery" in the archive nav, taps a filter chip to show
only one cat's photos, and clicks the first photo. A `<dialog>` opens
full-screen with the image, caption, and Prev/Next. He presses the
right arrow key; the next photo in the filtered set appears. Escape
closes the dialog and returns focus to the photo he opened.

---

## 4. Design mockups

ASCII wireframes describe layout intent; styling (typography, palette,
photo art-direction) is implemented in CSS.

### Sitemap

```
                          https://zdwww.github.io
                                    │
        ┌───────────────────────────┼────────────────────────┐
        /                          /cv/                  /personal/
   (about + pubs)                                            │
                                                "Cabinet of Cats" card
                                                             ▼
                                                      /project1/
                                       ┌──────────────────┼─────────────────────┐
                                       │                  │                     │
                                  /project1/    /project1/about.html  /project1/ai-companions.html
                                  (gallery)        (biographies)            (AI page)
```

Every `/project1/*` page carries a back-link to `/`.

### `/` — Academic landing (about + publications)

```
┌─────────────────────────────────────────────────────────────────────┐
│  DAIWEI'S HOMEPAGE              [Publications] [CV] [Personal]      │
├──────────────┬──────────────────────────────────────────────────────┤
│  ┌────────┐  │  ABOUT ME                                            │
│  │ photo  │  │  Bio paragraph (PhD program, advisor, prior degrees).│
│  └────────┘  │  Research interests.                                 │
│  Name        │                                                      │
│  Affiliation │  ──────────────────────────────────────────          │
│  Email ────► │  PUBLICATIONS                                        │
│  Links       │  ┌──────┐  Paper title  ·  Authors  ·  Venue/Year    │
│  (sidebar)   │  │teaser│  [Project][arXiv][Code]                    │
│              │  └──────┘  One-sentence summary.                     │
│              │  ┌──────┐  Next paper …                              │
│              │  └──────┘                                            │
└──────────────┴──────────────────────────────────────────────────────┘
```

Sticky author-profile sidebar; named anchor `#publications` lets the
navbar link jump on-page rather than navigate away. `/cv/` reuses the
same shell with Education + Teaching sections in the right column.

### `/personal/` — Cross-link into `/project1/`

```
┌─────────────────────────────────────────────────────────────────────┐
│  ┌──────────────┐  ALSO · A SIDE PROJECT                            │
│  │ 2 AI sprites │  The Cabinet of Cats                              │
│  │  (cropped)   │  A small editorial archive. Visit the cabinet →   │
│  └──────────────┘                                                   │
│                  (clickable card → /project1/about.html)            │
│  ┌──────────────┐  ALSO · A PHOTO DIARY                             │
│  │ flight photo │  My Flighty Passport                              │
│  └──────────────┘                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

Two stacked cards share design language (consistent stage width,
kicker / title / optional description); first is clickable, second is
static.

### `/project1/` — Gallery + lightbox overlay

```
┌─────────────────────────────────────────────────────────────────────┐
│  Wordmark                  [Gallery] [The Cats] [AI] [Daiwei's site]│
├─────────────────────────────────────────────────────────────────────┤
│  Volume I · Issue 01 · Boston, MA                                   │
│  A cabinet of three cats.                                           │
├─────────────────────────────────────────────────────────────────────┤
│  Filter:  [All]  [Cat #1]  [Cat #2]  [Cat #3]                       │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────┐  ┌──────────┐  ┌──────┐                                   │
│  │ img  │  │   img    │  │ img  │   asymmetric magazine grid        │
│  │Fig.01│  │  Fig.02  │  │Fig.03│   (mixed row spans)               │
│  └──────┘  └──────────┘  └──────┘                                   │
│  ┌──────────┐  ┌──────┐  ┌──────┐                                   │
│  │   img    │  │ img  │  │ img  │                                   │
│  └──────────┘  └──────┘  └──────┘                                   │
└─────────────────────────────────────────────────────────────────────┘

Lightbox (when a figure is clicked):

  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ░░░  ┌───────────────────────────────────────────────────────┐ ░░░
  ░░░  │                  enlarged photo                       │ ░░░
  ░░░  └───────────────────────────────────────────────────────┘ ░░░
  ░░░  Fig. 02 · Cat #1 · caption        [← Prev] [Next →] [×]  ░░░
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ← / →  cycle the filtered set  ·  Esc closes  ·  click backdrop closes
```

Real `<button>` filter chips, native `<dialog>` for the lightbox,
custom `gallery:filter` event so the lightbox respects the active
filter when stepping prev/next.

### `/project1/about.html` — Biographies

```
┌─────────────────────────────────────────────────────────────────────┐
│  ┌──────────┐  PLATE I · Breed · Kicker                             │
│  │ portrait │  Heading. Dropcap lede. Body. Traits list.            │
│  └──────────┘                                                       │
│  PLATE II · Breed · Kicker                       ┌──────────┐       │
│  Heading. Dropcap lede. Body. Traits list.       │ portrait │       │
│                                                  └──────────┘       │
│  ┌──────────┐  PLATE III · Breed · Kicker                           │
│  │ portrait │  Heading. Dropcap lede. Body. Traits list.            │
│  └──────────┘                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

Middle bio flips portrait to the right so the page reads with
editorial rhythm rather than a repeating column.

### `/project1/ai-companions.html` — AI-generated page

```
┌─────────────────────────────────────────────────────────────────────┐
│  ╔═════════════════════════════════════════════════════════════╗    │
│  ║  AI DISCLOSURE — sprites + text below were AI-generated     ║    │
│  ╚═════════════════════════════════════════════════════════════╝    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ ▮ sprite  ▮ │  │ ▮ sprite  ▮ │  │ ░ awaiting  ░│               │
│  │  animated   │  │  animated   │  │ ░  hatch    ░│  (placeholder) │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤               │
│  │ An imagined  │  │ An imagined  │  │  (no controls)│              │
│  │ short text…  │  │ short text…  │  │              │               │
│  │[Idle][Wave]  │  │[Idle][Wave]  │  │              │               │
│  │[Jump][Pause] │  │[Jump][Pause] │  │              │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

Disclosure banner first; two animated companions plus a deliberately
muted placeholder make the AI-vs-real distinction visible at a glance;
real `<button>` controls respect `prefers-reduced-motion`.
