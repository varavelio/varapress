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

## Testing strategy

- **Linting**: `npm run lint` runs `dprint check` and `zola check`
- **Build**: `npm run build` compiles CSS then runs Zola build
- **Local verification**: `npm run dev` starts the dev server with hot-reload for CSS and Zola, this blocks terminal until the server is manually killed

## Commands

Always read `package.json` to see which commands are available.

## General instructions

1. **Always read the brand documents first** before proposing design changes.
2. **Use `tailwind.css` tokens** — it is the source of truth for the design system.
3. **Run `npm run lint` before finalizing** any task.
4. **Run `npm run build` to ensure** the project compiles correctly.
5. **Compiled CSS lives at `static/css/varapress.css`** — do not edit it directly.
6. **Geist fonts are downloaded** with the `static/fonts/download.sh` script and used in `tailwind.css`.
7. **Context7 MCP** — If the Context7 MCP server is available, use it at any time to look up up-to-date documentation and information about Zola or any other tool in the stack (TailwindCSS, Alpine.js, etc.).
