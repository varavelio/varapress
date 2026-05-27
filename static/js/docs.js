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
