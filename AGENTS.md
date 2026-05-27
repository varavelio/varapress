# Agent Context — VaraPress

## Summary

**VaraPress** is the official Zola theme for Varavel, designed to build landing pages, blogs, and documentation sites. It is a Zola theme (not a standalone site), built with TailwindCSS v4 and self-hosted Geist typography. It follows the Varavel design system to the letter.

- **Core stack**: Zola 0.22.1+, TailwindCSS v4, Alpine.js, Geist Sans / Geist Mono
- **Purpose**: All-in-one theme for Varavel projects

## Maintaining this document

After completing any task, review this file and update it if you made structural changes or discovered patterns worth documenting. Only add information that helps understand how to work with the project. Avoid implementation details, file listings, or trivial changes. This is a general guide, not a changelog nor a journal.

When updating this document, keep the full document context in mind; do not simply append new sections at the end, but place them where they make the most sense within the document.

## Mandatory reading before any change

**Before making ANY changes to this project**, agents MUST read and understand these two documents:

1. **Brand guidelines**: https://raw.githubusercontent.com/varavelio/brand/refs/heads/main/README.md
2. **Design system**: https://raw.githubusercontent.com/varavelio/brand/refs/heads/main/DESIGN.md

These documents contain the Varavel brand guidelines and design system. Every visual and design decision must align with them.

## Tech stack

| Layer                 | Technology                                 | Version/Detail                       |
| --------------------- | ------------------------------------------ | ------------------------------------ |
| Static Site Generator | **Zola**                                   | `>= 0.22.1`                          |
| CSS                   | **TailwindCSS**                            | `4.3.0`                              |
| CSS Plugin            | **@tailwindcss/typography**                | `0.5.19`                             |
| Interactivity         | **Alpine.js**                              | `3.15.12` (CDN)                      |
| Formatting            | **dprint**                                 | `0.54.0`                             |
| Typography            | **Geist Sans** / **Geist Mono**            | Self-hosted at `static/fonts/geist/` |
| Syntax highlighting   | github-light-default / github-dark-default | With extra VDL grammar               |

## Project conventions

### Design & CSS

1. **Use `tailwind.css` tokens** — Do not hardcode arbitrary values. Use Tailwind utility classes that reference the defined CSS variables (e.g., `bg-base-100`, `text-content`, `rounded-md`, `font-medium`).
2. **Follow Varavel's design guide** — The brand/design documents are binding. Any new interface must comply with those guidelines.
3. **Dark mode** — Use `dark:` prefix or variant. The project supports both class and attribute (`dark:` variant in Tailwind is already configured).
4. **Responsive** — Mobile-first with a single breakpoint: `desk` at `64rem`. Use `desk:` prefix.
5. **Prose** — The `@tailwindcss/typography` plugin is available for rich text surfaces. Use the `prose` class where appropriate.

### Code

1. **No Sass** — `compile_sass = false` in `zola.toml`. Do not use `.scss`/`.sass` files.

### Template organization

Root templates are thin delegators that extend `base/main.html` and fill blocks via `{% include %}`. Actual content lives in subdirectories:

```
templates/
  base/main.html           → Base HTML shell, blocks, script loading
  docs.html               → Delegator (extends base, includes docs/ blocks)
  docs/
    head.html              → SEO head extra
    header.html            → Header (logo, theme toggle, hamburger)
    sidebar.html           → Desktop + mobile sidebar nav
    content.html           → Breadcrumbs, prose content, prev/next
    toc.html               → Desktop + mobile TOC
    body-extra.html        → TOC scroll-spy script
  section.html             → Delegator
  section/
    head.html, content.html
  page.html                → Delegator
  page/
    head.html
```

### Script loading

JavaScript files in `static/js/` are inlined directly into templates using Zola's `load_data` function instead of `<script src="...">`. This avoids extra HTTP requests and ensures scripts are available immediately:

```tera
{# theme-init.js runs synchronously in <head> for FOUC prevention #}
<script>{{ load_data(path="js/theme-init.js") | safe }}</script>

{# Alpine.js store inlined after layout markup #}
<script>{{ load_data(path="js/alpine/varapress.js") | safe }}</script>
```

The `static/js/` files serve as the canonical, documented source. They are never loaded directly, `load_data` reads and inlines them at build time.

Use as little JavaScript as possible, limit it to when it's really necessary, and prioritize keeping it short and focused.

Try to load JavaScript only where it's used; don't load JavaScript in places where it's not used.

### Theme initialization

1. **FOUC prevention** — `static/js/theme-init.js` is inlined in `<head>` (separate file kept as canonical source). It runs synchronously before the first paint.
2. **Runtime API** — Exposes `window.__varapressTheme` with `.get()` and `.set(theme)` methods. Alpine.js store syncs with it via `varapress-theme-change` custom event.

### Icons

Icons come from two sources:

- **Lucide** — general-purpose line icons (e.g., `house`, `bell`, `search`)
- **Simple Icons** — brand/platform logos (e.g., `github`, `x`, `discord`)

They are downloaded to `static/icons/` by `scripts/download-icons.sh` and rendered through two entry points:

| Context             | Usage                                              | File                             |
| ------------------- | -------------------------------------------------- | -------------------------------- |
| Templates (`.html`) | `{{ icons::render(name="bell", class="size-5") }}` | `templates/macros/icons.html`    |
| Markdown content    | `{{ icon(name="github") }}`                        | `templates/shortcodes/icon.html` |

**IMPERATIVE rules for working with icons:**

1. **Only use icons already included in the project.** Never download, import, create new or reference external icons. The project ships with thousands of icons — if the one you need isn't there, ask first.
2. **To find an icon**, search inside `static/icons/`. With 5000+ files, browsing is impractical — use your search tools (grep/glob by name) to locate the exact `.svg` file.
3. **The icon name** is the filename without the `.svg` extension. For example, `static/icons/github.svg` becomes `name="github"`.
4. **The macro auto-detects** whether an icon is a Lucide line icon (`fill="none"`) or a Simple Icons solid icon, and applies the correct `fill`/`stroke` attributes automatically.

## Testing strategy

- **Linting**: `npm run lint` runs `dprint check` and `zola check`
- **Build**: `npm run build` compiles CSS then runs Zola build
- **Local verification**: `npm run dev` starts the dev server with hot-reload for CSS and Zola, this blocks terminal until the server is manually killed

## Commands

Always read `package.json` to see which commands are available.

## General instructions

It's imperative that you follow the following instructions

1. **Always read the brand documents first** before proposing design changes.
2. **Use `tailwind.css` tokens** — it is the source of truth for the design system.
3. **Run `npm run lint` before finalizing** any task.
4. **Run `npm run build` to ensure** the project compiles correctly.
5. **Compiled CSS lives at `static/css/varapress.css`** — do not edit it directly.
6. **Geist fonts are downloaded** with the `static/fonts/download.sh` script and used in `tailwind.css`.
7. **Context7 MCP** — If the Context7 MCP server is available, use it at any time to look up up-to-date documentation and information about Zola or any other tool in the stack (TailwindCSS, Alpine.js, etc.).
8. **Run `npm run ci` after changes** — After making any changes, always run `npm run ci` to verify all checks pass. If there are errors, fix them before finishing the task.
9. **Complete tasks 100%** — When assigned a task, complete it 100%. Do not stop until the task is fully finished.
