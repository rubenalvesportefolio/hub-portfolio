# Ruben Alves - Portfolio

A dark, metallic, CGI-inspired portfolio in several pages, on a flat
black background with a soft navy glow (see "Page background"). The whole
site reads in **English or Portuguese** - there's an EN/PT switch in the
header of every page (see "Languages (EN / PT)" below) - and a gear
button in the top-right corner that switches between the **full
experience** and a **lite** mode (see "Display mode" below).

## Pages

- `index.html` - Home / hero, with two buttons: "Explore selected work"
  (all categories) and "See my best projects" (a short curated list -
  see `best-projects.html` below) - then a "Selected work" block with
  three featured projects (see "Homepage: selected work" below).
- `work.html` - Category tabs (3D / Graphic Design / 3D Printable /
  Contests / Commissions, plus a Games tab that's hidden for now - see
  "Hiding a category tab" below). Each shows only the projects you've
  added - no filler tiles - plus a search bar that filters by tag. Search
  suggestions are built per-category from that category's own tags, so
  categories never share a keyword list.
  - **3D, Graphic Design, 3D Printable, Contests, Games**: clicking a tile
    opens that project's page on `project.html` - a short description
    plus its skill tags - with a "View full project" button that then
    sends people to the outside link (Rookies, ArtStation, itch.io, etc)
    in a new tab. Contests tiles are also full width, one per row.
  - **Commissions**: tiles link straight to their own dedicated
    case-study page instead (richer than the generic template) - see
    "Commissions" below.
- `project.html` - one shared, dynamic page for every 3D /
  Graphic Design / 3D Printable / Contests / Games project. It reads
  `?id=...` from the URL and fills itself in from `PROJECTS` - see below.
  A project can also carry a longer, full-width case study below the
  cover (see `caseStudy` below - used by Protocol - Marked). Clicking the
  cover image or any image in a project's extra gallery opens it larger
  in a lightbox (see "Image lightbox" below). A project with a `video`
  shows a play button on its cover instead (see `video` below - used by
  Protocol - Marked and Star Destroyer). Skill tags link to the Work page
  filtered to that tag, a "Software" row lists the programs used, and
  "previous / next project" cards at the bottom walk through the
  projects in Work-page order (wrapping around at the ends).
  On the live site each project also gets its own page,
  `project-<id>.html` - see "Search, sharing and stats".
- `best-projects.html` - a short, hand-picked list of your strongest
  work, split into just two sections (3D and Graphic Design), nothing
  else - see "Best Projects page" below.
- `about.html` - Bio, facts (location, availability, focus, languages),
  education, activities beyond the degree, and tools - all taken from
  `cv.pdf`. If the CV changes, update this page to match (the text is in
  `i18n.js` under `about.*`, the tool pills in the HTML).
- `contact.html` - CV download + email + social links (Instagram,
  LinkedIn, ArtStation, Behance, The Rookies, itch.io).
- `404.html` - shown by GitHub Pages for any address that doesn't exist,
  with links back to Home and Work (see "Search, sharing and stats").

## Work page - adding your real projects

Open `script.js` and find the `PROJECTS` object right at the top of the
file (it's shared by `project.html` and `best-projects.html` too, not
just the Work page grids). Each category is a plain array - add or
remove entries and the grid updates to match exactly (no empty
placeholder tiles are ever generated beyond what you list). The Work
grid shows each tab **newest first** by `date` (the end of a range
counts; undated projects go last), so the order inside the array
doesn't matter there. Best Projects and the homepage keep the order you
give them.

```js
'3d': [
  { id: '3d-008', title: 'Product Render 08', tags: ['3D Modelling'], link: 'https://your-project-url', image: '', description: '[...]' },
],
```

- `id` - required for 3D / Graphic Design / Contests / Games (not
  needed for Commissions). A short, unique, URL-safe slug with no spaces -
  it's what `project.html?id=...` looks up, and what `BEST_PROJECTS`
  references (see "Best Projects page" below). Just make sure it's not
  already used by another project.
- `title` - shown on the tile and on its detail page.
- `tags` - an array of one or more tags. Shown as the badge on the tile
  and again as "skills applied" chips on the detail page, and used by the
  search bar to filter results within that category - the search box
  accepts multiple, comma-separated tags at once (see "Multi-tag search"
  below). Each category builds its own search suggestions automatically
  from whatever tags its projects use. Current 3D vocabulary:
  `3D Modelling`, `Hard-Surface Modelling`, `3D Animation`, `Detail`,
  `Environment`, `Nature`, `Interior`, `Game Asset`, `Geometry Nodes`,
  `Shading & Materials`, `Procedural Shading`, `Compositing`,
  `University Work`.
- `description` - shown on the project's detail page, next to the cover
  image. Plain text, or simple HTML (e.g. `<p>...</p>` paragraphs) when
  it needs more than one paragraph. Bracketed placeholder text (`[...]`) means "write the real thing
  whenever you have it" - several 3D projects still have these
  since only you know the actual brief/process for each one.
- `link` - the "View full project" destination on the detail page (always
  opens in a **new tab**, since it's meant to send people to the more
  detailed version elsewhere - ArtStation, Rookies, itch.io, etc). Leave
  it as `''` and that button is simply left out; the description/skills
  still show on their own. (For Commissions, `link` instead points
  directly at that commission's own page - see below.)
- `image` - path to the cover image relative to the site root (e.g.
  `images/work/3d/project-001.jpg`). Leave it as `''` to show a placeholder
  tile until you have a real image.
- `images` - optional array of extra image paths, shown in a small
  gallery grid on the project's detail page (below the cover/
  description). Use this for a project with more than one worthwhile
  shot - e.g. Exposição - Telefones do Mundo shows a day and night
  render of two different views. Only `image` (the single cover) shows
  on the grid tile; the rest only appear once you click through. Every
  image here and the main cover are clickable - clicking either opens a
  full-size lightbox view (see "Image lightbox" below).
- `fit` - optional. Set to `'contain'` for a cover image that shouldn't be
  cropped at all (e.g. a wordmark or banner with its own padding, like
  Jorge's cover). Leave it out for normal photo/render covers, which crop
  to fill as usual - this applies on both the grid tile and its detail page.
- `caseStudy` - optional. A longer write-up as HTML, shown full width
  below the cover/description and above the gallery. Use `<h2>` for
  phases, `<h3>` for steps, `<p>`, `<ul>/<li>` and `<strong>` (all styled
  in `styles.css` under `.project-case-study`). Leave it out and the
  section is hidden. Protocol - Marked uses it for its full
  pre-production / production / post-production breakdown. It's
  translatable like `description` (see "Languages" below).
- `date` - when the project was made: `'2025'`, `'2025-07'`, or a range
  `'start/end'` with either form on each side (`'2025/2026-04'` shows as
  "2025 – April 2026"). The project page shows it under the
  description (month names follow the site language: "julho de 2025"
  in Portuguese), and the tiles on Work, Best Projects and the homepage
  show the year(s). Leave it out and nothing is shown -
  `npm run validate` warns about every visible project without one, and
  fails on a badly written date.
- `software` - optional. The programs used, e.g. `['Blender',
  'Photoshop']` - shown as its own "Software" row on the project page,
  separate from the skill tags. Names, so never translated. Every
  visible project has it set.
- `video` - optional. A YouTube video ID - the 11 characters after
  `watch?v=` in the address (Protocol - Marked: `'I9UdgZKVZ8A'`). The
  detail page then shows the cover image with a play button in the
  cover slot; pressing it loads the YouTube player right there
  (privacy-enhanced `youtube-nocookie.com`, already playing) and adds a
  "Watch on YouTube" button. Nothing is loaded from YouTube until
  someone presses play, so the page stays light. The video keeps playing
  if the visitor switches language.
- `hidden: true` - optional. Keeps a draft in the file but off the site:
  no Work tile, no Best Projects or homepage tile, and its
  `project.html?id=` page says "not found". `npm run validate` doesn't
  nag about placeholder text in hidden drafts, and fails if a hidden
  project is still listed in `BEST_PROJECTS` or `HOME_FEATURED`. Delete
  the line to publish it.
- `downloadUrl` / `viewUrl` - optional. Set either (or both) to add extra
  buttons on the project's detail page: one to download a file directly,
  one to open a link (e.g. a PDF preview) in a new tab. Used on Jorge to
  offer its descriptive-memory PDF alongside the itch.io link, on
  Mystery Box for its project report, and on Protocol - Marked for the
  full final report (`files/protocol-marked-final-report.pdf`).

If a category's array is empty, the Work page shows a simple "Projects
coming soon" message instead of a blank grid. `graphic` has a single
entry for now - add entries the same way once you have work to show
there.

### Hiding a category tab

A tab button with the `hidden` attribute in `work.html` is skipped
entirely - not shown, and it can't be opened with `?tab=` or by a
remembered choice either. Games is hidden this way until it has
projects; to bring it back, remove `hidden` from its
`data-tab="games"` button.

### What's on the site right now

**3D** has 10 projects (8 visible), with cover images in `images/work/3d/`:

- 001 Tower, 002 Pocket Clock, 003 Star Destroyer, 006 Sand and 007
  Medieval Library Interior have real titles, descriptions and skill
  tags pulled from each Rookies page, and link to it.
- 004 and 005 are **hidden** (`hidden: true`) - their titles and
  descriptions are still placeholders and they have no Rookies link
  yet. Fill those in, then delete the `hidden` line to publish them.
- 008 Exposição - Telefones do Mundo is a university project with a
  4-image set (1 cover + 3 in its gallery) and no outside link.
- 009 Protocol - Marked is your final degree project (Design of
  Communication and Audiovisual, ESART/IPCB) - a solo sci-fi 3D
  cinematic / game teaser submitted to the Casa da Animação competition.
  Cover: a render of the night city. It has a full `caseStudy` in both
  languages, the teaser video (`video: 'I9UdgZKVZ8A'`, played in the
  cover slot), the final report as a PDF (download + view buttons) and
  a 2-image gallery (the rigged character in Blender, and a viewport
  shot of the city scene). It's also the first pick on Best Projects.

**Added from PDFs** (published after Ruben reviewed them). Text, images
and dates were taken from the PDFs Ruben supplied; the PDFs themselves
are not on the site.

| Project | Category | Date | Source / notes |
| --- | --- | --- | --- |
| Themed Scenes - 3ds Max (`3d-010`) | 3D | January 2025 | 6 final renders; final-images PDF created 19 Jan 2025. Made in 3ds Max for a university course |
| Nunca Percas Uma Boa Aposta - Campaign (`graphic-nunca-percas`) | Graphic Design | June 2025 | Group 10 report (Integrated Communication Design). Team of 3; Ruben did the casino-style 3D effects |
| IMPERIUM - Logo & Symbol (`graphic-imperium`) | Graphic Design | November 2024 | Exercise 3 PDF (5 Nov 2024). Logotype + symbol given in the brief; Ruben made the lockups and tests |
| GameStorming - Logo (`graphic-gamestorming`) | Graphic Design | October 2024 | Exercise 2 PDF (28 Oct 2024). Logo, process and tests |

New tags (translated in `TAG_TRANSLATIONS`): `Logo Design`, `Brand
Identity`, `Advertising Campaign`, `3D Effects`; `3ds Max` is a name
and stays as written. Logo covers were rebuilt from the clean logo
artwork inside the PDFs, centred on white; gallery images are PDF pages
trimmed to their content.

**Dates** (`date` field) and where each one came from:

| Project | Date | Source |
| --- | --- | --- |
| 001 Tower | July 2025 | Rookies page: "Made in 21 July 2025" |
| 002 Pocket Clock | August 2025 | Rookies page: "Made in 4 August 2025" |
| 003 Star Destroyer | August 2025 | Rookies page: "Made in 14 Aug 2025" |
| 006 Sand | August 2026 | Rookies page: "Made in 5 August 2026" |
| 007 Medieval Library Interior | August 2026 | Rookies publish date (25 Aug 2026) - the page gives no "made in" date |
| 009 Protocol - Marked | 2025 – April 2026 | Final report: started 1st semester of 3rd year (2025/26), report dated April 2026 |
| Jorge | June 2024 | Micro Jam 017 ran 28-30 June 2024 (descriptive memory) |
| Mystery Box | 2025 – January 2026 | Report: 3rd year, 1st semester 2025/2026; finished January 2026 |
| 008 Exposição - Telefones do Mundo | June 2026 | Given by Ruben |
| Icon Library | July 2026 | Given by Ruben |
| UrbanEyePT (commission + Instagram post) | July 2026 | Given by Ruben |

The UrbanEyePT case-study page is plain HTML, so its date is written
there directly (`urbaneyept.date` in `i18n.js`) - change both it and the
`date` in `PROJECTS.commissions` if it ever needs correcting.

**Graphic Design** has four entries: the GameStorming and IMPERIUM logo
exercises, the "Nunca Percas Uma Boa Aposta" campaign (see the table
below), and the UrbanEyePT Icon Library (linking to Behance) - the same work also appears on the UrbanEyePT commission
page.

**3D Printable** is a new category for physical/3D-printed objects,
separate from the render-only work in **3D**. It has one real entry,
Mystery Box - Mystery Travel, a university project (team: João Teixeira
and Tiago Crispim) - a 3-photo set (1 cover + 2 in its gallery), tagged
"3D Printing" and "University Work", with the project's full PDF report
(in `files/`) attached via `downloadUrl`.

**Contests** has one real entry, Jorge (Micro Jam 017: Islands) - full
width on the grid, tagged "Game Jam!", with a real description already
written from your game jam memory document, linking to `fmag.itch.io/jorge`
plus its descriptive-memory PDF (in `files/`) via `downloadUrl`/`viewUrl`.

## Image lightbox

On a project page, clicking the cover image or any image in a project's
extra gallery (`images` field) opens it larger in a full-screen overlay -
close it by clicking outside the image, the ✕ button, or pressing Esc.
With more than one image it steps through all of them in page order:
the ‹ › buttons, the keyboard's left/right arrows, or a swipe on a
phone, with an "n / total" counter at the bottom. A video cover isn't
part of the set (it plays in place instead).
This is handled once, globally, in `script.js` (`projectLightbox()`)
using event delegation, so it automatically applies to every current and
future project - no per-project setup needed, and it keeps working even
though those images are inserted dynamically after the page loads.

## Multi-tag search

The Work page search box accepts more than one tag at once - separate
them with a comma (e.g. `3D Modelling, Detail`) and it only shows
projects that have **all** of those tags, not just any one of them. This
is implemented in `matchesQuery()` in `script.js`. One small limitation
worth knowing: the tag-suggestion dropdown (native browser autocomplete)
only matches against the very start of what you've typed, so it stops
offering suggestions once you type a comma and start a second tag - you
can still type the rest by hand, it just won't autocomplete.

**Commissions** has one entry, UrbanEyePT (see "Commissions" below).

**Games** is empty, and its tab is hidden (see "Hiding a category tab").

## Homepage: selected work

Below the hero, the homepage shows three projects: the first one large
on the left, the other two stacked beside it (one column on phones).
Each tile shows a number and category, the title and tags, and opens
the project's page - whose "Back to ..." link then returns to Home.

The picks live in `script.js`, just under `BEST_PROJECTS`:

```js
const HOME_FEATURED = ['3d-007', '3d-003', 'graphic-icon-library'];
```

(Medieval Library Interior, Star Destroyer and the Icon Library - an
environment, a procedural animation and a graphic design piece, to
show range.) Order = order on the page, and the first is the big one.
`npm run validate` fails if an id here doesn't exist or is hidden. The
tiles load the small thumbnail or the full image depending on how big
they are on screen.

The hero is 86% of the screen tall so the top of these tiles peeks in
below it.

## Best Projects page

`best-projects.html` is a short, curated shortcut to your strongest work
- no tabs, no search, just two labelled sections (3D, then Graphic
Design) with larger, 2-column tiles so there's more to look at per
project. It's linked from the homepage's "See my best projects" button
and isn't in the main nav - it's meant to feel like a special shortcut,
not another everyday page.

The list lives in `script.js`, just above the `renderProjectDetail`
function:

```js
const BEST_PROJECTS = {
  '3d': ['3d-009', '3d-007', '3d-006', '3d-003'],
  graphic: ['graphic-icon-library'],
};
```

Each entry is just an `id` from `PROJECTS` - nothing is duplicated, so
editing a project's title/image/description once updates it everywhere,
including here. To change the picks, edit these two arrays (order = the
order tiles appear in). Clicking a tile behaves exactly like it does on
the Work page - same link, same destination.

One exception: **`BEST_PROJECTS_EXTRA`**, right below it, is for the
UrbanEyePT Instagram post - it isn't a standalone entry in `PROJECTS`
(it's one of two works shown inside the UrbanEyePT commission page), so
it's listed here directly with its own title/image/link instead of an
`id`. Its link goes straight to Instagram, same as it does on the
commission page - not through `project.html`.

## Image sizes and formats

Every cover and gallery image ships as WebP (smaller than the original JPEG/PNG at
the same visual quality) in two sizes:

- `images/.../project-name.webp` - the full-size version (up to 1400px
  wide), used on the project detail page, and on grid tiles for
  full-width categories (Contests) where tiles can render quite large.
- `images/.../thumbs/project-name.webp` - a small version (up to 640px
  wide) with the exact same filename, used on every other grid tile
  (Work page's 3-column categories, Commissions, and Best Projects) -
  those never render large enough to need the full-size file.
  `toThumbPath()` in `script.js` derives this path automatically from
  `image`, so you never set it separately - just make sure a `thumbs/`
  version with a matching filename exists alongside the full one.

Gallery images on the detail page also use the small version (the
full-size one is only fetched when someone opens it in the lightbox).
`npm run validate` fails if an image is missing its `thumbs/` twin, or
if a full-size image is over 400 KB or a thumbnail over 120 KB (budgets
at the top of `scripts/validate-site.mjs`).

Grid images also load with `loading="lazy"` so they don't download until
they're about to scroll into view. When adding a new project image, run
it through the same resize/compress step (both sizes, WebP) rather than
dropping in an original photo/render straight from Blender or Photoshop -
those are typically many megabytes and will make the site noticeably
heavier, especially on mobile connections.

## "Wave" CTA and the featured button

The homepage's "Explore selected work" button and the "Download CV" link
in the header (on every page) share a `wave-cta` modifier class: fully
rounded corners plus a slow, smooth greyscale/chrome shimmer that eases
back and forth continuously (no jump-cut) via `background-position`. It's
opt-in - add `wave-cta` alongside `button button-dark` or `nav-cv` on any
other link if you want the same effect elsewhere; every other button on
the site is unaffected. Colours and timing are set in `styles.css` under
`.button.wave-cta,.nav-cv.wave-cta` and the `waveFlow` keyframes (currently
a 14s ease-in-out loop). It respects `prefers-reduced-motion`, and
turns into a flat solid button in lite mode.

"See my best projects" uses a different modifier, `button-feature`: a
charcoal/navy glass panel with a slow breathing navy glow (`featurePulse`
in `styles.css`) instead of a moving shimmer - deliberately distinct from
`wave-cta` so it reads as its own, separate kind of call-to-action, while
still using the site's existing palette (charcoal + the navy accent
colour used sparingly elsewhere). Also opt-in, also respects
`prefers-reduced-motion`, and stops pulsing in lite mode.

## "Back" links always return to exactly where you were

Every "← Back to ..." link/button on every detail page (`project.html`,
commission pages, and any future page) returns to whichever list page
the person actually came from - the Work page, with the exact tab they
had open, **or** the Best Projects page, **or** Home if they clicked a
homepage tile - not just "Work" by default. This is handled once,
globally, in `script.js`, and the button's own label updates too ("Back
to Work" / "Back to Best Projects" / "Back to Home").

How it works:

- `work.html` and `best-projects.html` are the two "list" pages. Each one
  saves its own identity to `sessionStorage` as soon as it loads (or a
  tab is switched, on Work) - a page to return to (e.g.
  `work.html?tab=commissions`) and a label to show (e.g. `Work`). The
  homepage does the same, but only when one of its tiles is clicked.
- In Portuguese the label carries its own article ("aos Trabalhos",
  "ao Início") and the template is just "← Voltar {target}", so every
  destination reads correctly.
- Any element marked `data-smart-back` (every existing "← Back to Work"
  link and button already has this) gets its `href` and visible label
  rewritten to match whichever list page was saved most recently.
- The plain "Work" link in the header nav is deliberately **not** marked
  `data-smart-back` - it always goes to the Work page itself (restoring
  its last tab), never to Best Projects, since it's a permanent nav item
  rather than a "return to where I was" action.

Because this is automatic, adding a new detail page just means linking
back with `href="work.html" data-smart-back` (as the existing templates
already do) - no extra setup needed for it to resolve correctly.

## Commissions - adding a case study

Each commission gets its own page on the site (not an outside link), so
people can browse it without leaving your portfolio, and can always get
back to Work/About/Contact from the same header.

Two templates are available:

- **`commission-template.html`** - single work, one cover image.
- **`commission-template-multi.html`** - several works shown on one
  client page, each linking wherever you like (used for UrbanEyePT below).

1. Duplicate whichever template fits, rename it (e.g.
   `commission-acme.html`), and open it.
2. Replace every `[BRACKETED]` placeholder: client name (used in the page
   heading and title only - the badge under it shows just the logo, no
   repeated text), logo, cover image(s), description, and links.
3. Put the client's logo and cover image(s) in
   `images/work/commissions/`.
4. In `script.js`, add **one** entry to `PROJECTS.commissions` for the
   whole page (not one per work, even with the multi template):

```js
commissions: [
  { title: 'Acme Corp', tags: ['3D Modelling'], link: 'commission-acme.html', image: 'images/work/commissions/acme-cover.jpg' },
],
```

Note `link` is just the filename (no `https://`) - that's what makes the
work-page tile open it as an internal page instead of a new tab.

Every commission page keeps the full site header/nav plus an explicit
"← Back to Work" link (both at the top and in the footer), so nobody ends
up stuck on a page with no way back.

**UrbanEyePT** is already set up as a real example
(`commission-urbaneyept.html`) using the multi-work template - it shows
the Icon Library (linking to Behance) and an Instagram post render
(linking to Instagram) side by side under the UrbanEyePT logo. The Icon
Library also appears on its own under **Graphic Design**, using the
same image and link.

## Languages (EN / PT)

Every page carries an **EN / PT** switch in the header. There's no build
step and no second copy of any page: the text is swapped in the browser,
`<html lang>` is updated to match, and the choice is remembered in
`localStorage` for the next visit.

The language is picked in this order: a `?lang=` in the URL, then the
visitor's saved choice, then the browser's own language - so a visitor
whose browser is set to Portuguese lands in Portuguese - then English.
`?lang=pt` is useful for sharing a link that opens in a specific
language: it's saved as the visitor's choice (so the rest of their visit
stays in that language), then removed from the address bar so it doesn't
follow people around (`?id=` and `?tab=` are left alone).

### Where the text lives

**UI copy** - everything that isn't a project - is in `i18n.js`, once per
language:

```js
const TRANSLATIONS = {
  en: { 'about.tools.learning': 'Currently learning', ... },
  pt: { 'about.tools.learning': 'A aprender', ... },
};
```

The markup points at a key instead of repeating the text:

```html
<h4 data-i18n="about.tools.learning">Currently learning</h4>

<!-- attributes: "attribute:key", several separated by ; -->
<meta name="description" data-i18n-attr="content:meta.about.desc" content="...">
<input data-i18n-attr="placeholder:x.placeholder;aria-label:x.aria">
```

The English text stays in the HTML as-is. It's what search engines and
anyone without JavaScript see, and it keeps the file readable - the key
is the pointer, not a replacement for the copy.

Headings that mix styles are split rather than translated as markup, so a
translation is never allowed to contain HTML:

```html
<h2><span data-i18n="about.title.line1">3D thinking.</span><br>
    <em data-i18n="about.title.line2">Graphic discipline.</em></h2>
```

**Project titles, descriptions and case studies** stay next to the
project in `script.js`, so adding a project is still one edit in one
place (`title`, `description` and `caseStudy` are the only translatable
fields):

```js
{
  id: '3d-006',
  title: 'Sand',
  description: 'A close-up, realistic beach sand environment...',
  i18n: {
    pt: {
      title: 'Areia',
      description: 'Um ambiente realista de areia de praia...',
    },
  },
}
```

Anything you leave out falls back to the English field, so a proper noun
("Jorge", "UrbanEyePT") simply doesn't need an entry.

**Tags** are shared by many projects, so they're translated once in
`TAG_TRANSLATIONS` at the bottom of `i18n.js` - not repeated per project.
A tag with no entry is shown as written, which is what you want for
names like "Blender", "Geometry Nodes" or "Game Jam!". Search matches the
tags as they appear on screen, so searching works in either language.

### Adding copy

1. Add the key to **both** `en` and `pt` in `i18n.js`.
2. Point at it from the markup with `data-i18n` (or `data-i18n-attr`), or
   from `script.js` with `I18N.t('your.key')`.
3. Run `npm run validate`.

`npm run validate` fails if a key is used but never defined, if the two
languages don't define exactly the same keys, or if a `{placeholder}`
appears in one language but not the other - so a half-translated string
can't reach the site. It warns about keys that nothing uses, and about a
project that has an English description or case study but no Portuguese
one.

### Adding a language

Add its code to `SUPPORTED_LANGUAGES` in `i18n.js`, add a matching block
to `TRANSLATIONS`, and add a button to the `.lang-switch` in each page's
header. The checks above then apply to it automatically.

## Before publishing

1. `cv.pdf` in this folder is what "Download CV" serves - replace it
   (same name) whenever your CV changes.
2. Add your real projects and images in `script.js` as described above.
3. Double check the social links in `contact.html` (Instagram,
   LinkedIn, ArtStation, Behance, The Rookies, itch.io) match your
   current profiles.
4. Run `npm run validate` and deal with any errors (warnings are
   unfinished content, not breakage).
5. Read each page once in **both languages** using the EN/PT switch.

## Checks, build and deployment

The site itself has no build step, but the repo has a little tooling
(Node 20+; run `npm ci` once):

- `npm run build` - copies everything publishable into `_site/`,
  skipping whatever `.deployignore` lists (tooling, `*.md`, the
  commission templates, ...). `_site/` is exactly what goes live.
- `npm run validate` - builds, then runs `scripts/validate-site.mjs`
  (internal links, `PROJECTS` data, images + thumbnails + size budgets,
  translations, leftover `[PLACEHOLDER]`s) and `html-validate` on every
  page. Errors fail; warnings are just reported.
- `npm run serve` - builds and serves `_site/` at
  `http://localhost:8080`.

GitHub Actions (`.github/workflows/`):

- `site.yml` - runs the same checks on every push and pull request, and
  on `main` deploys the exact `_site/` that passed to GitHub Pages, then
  smoke-tests the live pages.
- `external-links.yml` - weekly (Mondays), checks every outside link
  with lychee (`lychee.toml`; Instagram/LinkedIn are skipped because
  they block bots), so a deleted Rookies post or unpublished Behance
  project doesn't go unnoticed. It never blocks a deploy.
- Dependabot opens one grouped update PR a month for the actions and
  `html-validate`.

## Display mode (full experience / lite)

A gear button sits in the top-right corner of every page's header
(right of EN/PT on desktop, right of the ☰ menu on mobile). It opens a
small "Display" panel with one switch, **Full experience**:

- **On (full)** - everything as designed: the shimmering heading, the
  animated "wave" and "featured" buttons, the noise overlay and the
  blurred header.
- **Off (lite)** - no animations or transitions, and solid colours
  instead of the moving chrome gradients. An idle page in lite mode does
  no work at all.

The choice is remembered (`localStorage`, key `displayMode`) and applies
to every page. Before anyone has chosen, the site starts in **full**,
or in **lite** if the visitor's OS asks for reduced motion.

Where it lives:

- `display-mode.js` - loaded in each page's `<head>`, so the saved mode
  is set on `<html data-mode="full|lite">` before anything is drawn (no
  flash of animation in lite). It also wires up the gear and the
  switch, and fires a `displaymode:change` event when the mode changes
  (nothing needs it today; it's there for any future script).
- `styles.css` - the gear/panel styles are under "Display settings";
  everything lite mode changes is in one block at the very end, under
  `html[data-mode="lite"]`. To make lite switch off something new, add
  a rule there.
- The panel's text is translated like any other copy (`settings.*`
  keys in `i18n.js`).

The gear markup (`.display-settings`) is repeated in each page's header,
like the language switch; the commission templates already include it.
`npm run validate` fails if a page is missing the gear or doesn't load
`display-mode.js` inside `<head>`.

## Page background

Each page includes the same fixed layer behind everything:

```html
<div class="page-bg" aria-hidden="true">
  <div class="page-bg-scrim"></div>
</div>
```

`.page-bg` is flat black; `.page-bg-scrim` adds a soft navy glow at the
top and a gradient that darkens towards the bottom (both in
`styles.css`). It's static, so it costs nothing while the page sits
idle.

The site used to run a live Spline 3D scene here. It was removed
because it kept laptops hot even at a capped frame rate and reduced
resolution, for a picture shown at a fraction of its brightness. If you
ever want motion back here, a short pre-rendered looping video (muted,
`playsinline`, `preload="none"`, paused in lite mode) would be far
cheaper than a live scene.

## Search, sharing and stats

**The live address** is set once, as `"homepage"` in `package.json`
(currently `https://rubenalvesportefolio.github.io/hub-portfolio/`, from
the CV). `npm run build` uses it to:

- make the share-preview image URL absolute (link previews need a full
  URL),
- write **one page per visible project**, `project-<id>.html` - a copy of
  `project.html` with that project's own `<title>`, description and
  share image - and switch every link on the site to them
  (`PRETTY_PROJECT_URLS` in `script.js` is flipped to `true` in the
  built copy only, so the source still works without a build). An old
  `project.html?id=...` link forwards to the new page,
- add a canonical link and `og:url` to every page except `project.html`
  (which now only forwards),
- give `404.html` a `<base href="/hub-portfolio/">`, so its styles and
  links work at any wrong address, however deep,
- write `sitemap.xml`: every page, including each `project-<id>.html`.

If the site moves (e.g. a custom domain), change `"homepage"` and
everything follows.

**Link previews** (LinkedIn, WhatsApp, X, Facebook, Slack...): every
page has Open Graph / Twitter tags and shares `images/og-image.jpg`
(1200x630 - name, headline and three renders). Each project page shows
**its own card** instead: its title, the start of its description and
`images/og/<id>.jpg` (a 1200x630 JPG crop of its cover; UrbanEyePT's
case-study page uses `images/og/urbaneyept.jpg`). When you add a
project, add its `images/og/<id>.jpg` too - without one it falls back to
the site-wide card, and `npm run validate` warns about it. The validator
fails if a page's preview image is missing.

**Headings and descriptions for search engines**: every page has
exactly one `<h1>` (its main title; on Contact, a hidden "Contact" one
via the `.visually-hidden` class, since its two visible titles are
section headings). `project.html` sets its own `<meta name="description">`
for each project - the first ~155 characters of its description, in the
current language.

**robots.txt**: search engines only read it at the root of a domain,
and this site lives in a sub-folder (`/hub-portfolio/`), so the build
only writes one when `"homepage"` is a domain root. Instead, submit the
sitemap once in Google Search Console (add the site as a "URL prefix"
property, then Sitemaps -> `sitemap.xml`).

**404 page**: `404.html` - GitHub Pages serves it automatically for any
address that doesn't exist. It's marked `noindex`.

**Visitor stats (GoatCounter)**: off until you set it up. GoatCounter is
free for personal sites, open-source, uses no cookies and collects no
personal data. To turn it on, sign up at goatcounter.com, pick a code
(e.g. `rubenalves` -> rubenalves.goatcounter.com) and put it in
`GOATCOUNTER_CODE` at the bottom of `script.js`. Each project page is
counted separately, and local copies (localhost, file://) are never
counted. To stop your own visits counting, open the live site once with
`#toggle-goatcounter` at the end of the address.

## Mobile

Every page is responsive: safe-area padding for notched phones,
`dvh`-based sizing so the mobile browser address bar doesn't cut off
content, a full-width tap-friendly nav drawer, and a gallery grid that
drops from 3 → 2 → 1 columns as the screen narrows.

## Publishing

Deployed to GitHub Pages by `site.yml` (see above). It's a plain static
site, so any other host (Netlify, Vercel, Cloudflare Pages, ...) works
too - publish the contents of `_site/` after `npm run build`.
