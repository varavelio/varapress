/**
 * @fileoverview VaraPress documentation runtime.
 *
 * Single entry point for all JavaScript needed by the docs layout. Registers
 * two Alpine.js data components on `alpine:init`:
 *
 * ## `varapressDocs` — Shared UI state
 *
 * Declared on `<body>` via `x-data="varapressDocs"`. Manages:
 *
 * - **Sidebar drawer** — `sidebarOpen`, `toggleSidebar()`, `closeSidebar()`.
 * - **TOC panel** — `tocOpen`, `toggleToc()` for the floating mobile TOC.
 * - **Theme** — `theme`, `resolvedTheme`, `cycleTheme()`. Synchronizes with
 *   `window.__varapressTheme` from the theme bootstrapper.
 *
 * ## `tocScroll` — Heading scroll-spy
 *
 * Declared on `<main>` via `x-data="tocScroll"`. Watches prose headings
 * with an `IntersectionObserver` and highlights the corresponding entry in
 * the desktop TOC sidebar and the mobile TOC panel.
 *
 * This file is loaded via Zola's `load_data` and inlined in
 * `docs/body-extra.html`. It is only delivered when the docs layout template
 * is used — blog and landing pages do not load it.
 *
 * @see static/js/theme-init.js — Theme bootstrapper (runs before first paint)
 * @see templates/docs/toc.html     — TOC sidebar with .toc-link entries
 * @see templates/docs/content.html — Main content area with x-data binding
 */

/**
 * Injects anchor links into prose headings that have an id attribute.
 * Each anchor link is placed as the last child of the heading element
 * and becomes visible on heading hover.
 */
function injectAnchorLinks() {
  // Icon by Lucide Icons
  const LINK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

  document
    .querySelectorAll(".prose :is(h1, h2, h3, h4, h5, h6)")
    .forEach((heading) => {
      if (heading.id && !heading.querySelector("a.anchor-link")) {
        const anchor = document.createElement("a");
        anchor.className = "anchor-link";
        anchor.href = `#${heading.id}`;
        anchor.setAttribute("aria-hidden", "true");
        anchor.tabIndex = -1;
        anchor.innerHTML = LINK_SVG;
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const url = new URL(window.location.href);
          url.hash = heading.id;
          history.pushState(null, "", url);
          heading.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        heading.append(anchor);
      }
    });
}

document.addEventListener("alpine:init", () => {
  Alpine.data("varapressDocs", () => ({
    /** @type {boolean} Whether the mobile sidebar drawer is open. */
    sidebarOpen: false,

    /** @type {boolean} Whether the mobile TOC panel is open. */
    tocOpen: false,

    /**
     * The saved theme preference: `"light"`, `"dark"`, or `"system"` (reactive).
     * @type {"light" | "dark" | "system"}
     */
    theme: "system",

    /**
     * The concrete theme applied to the document: `"light"` or `"dark"` (reactive).
     * @type {"light" | "dark"}
     */
    resolvedTheme: "light",

    init() {
      if (window.__varapressTheme) {
        const state = window.__varapressTheme.get();
        this.theme = state.theme;
        this.resolvedTheme = state.resolved;
      }
      window.addEventListener("varapress-theme-change", (e) => {
        this.resolvedTheme = e.detail.resolved;
        this.theme = e.detail.theme;
      });
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    toggleToc() {
      this.tocOpen = !this.tocOpen;
    },

    cycleTheme() {
      const cycle = {
        light: "dark",
        dark: "system",
        system: "light",
      };
      const next = cycle[this.theme] || "system";
      if (window.__varapressTheme) window.__varapressTheme.set(next);
    },

    get themeLabel() {
      return this.theme.charAt(0).toUpperCase() + this.theme.slice(1);
    },
  }));

  Alpine.data("tocScroll", () => ({
    /** @type {string | null} The id of the currently active heading. */
    activeId: null,

    /** @type {IntersectionObserver | null} */
    observer: null,

    init() {
      const links = document.querySelectorAll(".toc-link");
      const headings = [];

      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        const id = href.slice(1);
        const heading = document.getElementById(id);
        if (heading) headings.push({ link, heading });
      });

      if (headings.length === 0) return;

      this.observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length > 0) {
            headings.forEach(({ link }) => {
              link.classList.remove("text-info", "font-medium");
            });
            const active = headings.find(
              (h) => h.heading === visible[0].target,
            );
            if (active) {
              active.link.classList.add("text-info", "font-medium");
            }
          }
        },
        {
          rootMargin: "-80px 0px -70% 0px",
        },
      );

      headings.forEach(({ heading }) => {
        this.observer.observe(heading);
      });
    },
  }));
});

// Inject anchor links into prose headings after DOM is ready
injectAnchorLinks();
