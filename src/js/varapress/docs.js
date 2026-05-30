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

function registerAlpineVarapressDocs() {
  Alpine.data("varapressDocs", () => ({
    /** @type {boolean} Whether the mobile sidebar drawer is open. */
    sidebarOpen: false,

    /** @type {boolean} Whether the mobile TOC panel is open. */
    tocOpen: false,

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    toggleToc() {
      this.tocOpen = !this.tocOpen;
    },
  }));
}

function registerAlpineTocScroll() {
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
}

export function initDocs() {
  injectAnchorLinks();
  document.addEventListener("alpine:init", () => {
    registerAlpineVarapressDocs();
    registerAlpineTocScroll();
  });
}
