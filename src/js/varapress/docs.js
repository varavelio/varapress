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

/**
 * Highlights the active TOC link based on scroll position.
 *
 * Groups all `.toc-link` elements by their target heading so both mobile and
 * desktop duplicates stay in sync. Uses a scroll listener on the main content
 * area with `requestAnimationFrame` throttling.
 */
function initTocHighlight() {
  const scrollRoot = document.querySelector("main");
  if (!scrollRoot) return;

  const allLinks = document.querySelectorAll(".toc-link");
  if (allLinks.length === 0) return;

  const headings = resolveTocHeadings(allLinks);
  if (headings.size === 0) return;

  const links = Array.from(allLinks);
  let active = null;

  function update() {
    const next = scrollRoot.scrollTop <= 0
      ? null
      : findActiveHeading(headings, scrollRoot.getBoundingClientRect().top);

    if (next === active) return;

    active = next;
    links.forEach((link) => link.classList.remove("text-info"));

    if (next) {
      headings.get(next).forEach((link) => link.classList.add("text-info"));
    }
  }

  let ticking = false;
  scrollRoot.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    }
  }, { passive: true });

  update();
}

/**
 * Builds a map from each heading element to all its TOC link elements.
 *
 * @param {NodeListOf<Element>} links - All `.toc-link` elements.
 * @returns {Map<Element, Element[]>} Heading → links mapping.
 */
function resolveTocHeadings(links) {
  const map = new Map();

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const id = href.slice(href.lastIndexOf("#") + 1);
    const heading = document.getElementById(id);
    if (!heading) return;

    if (!map.has(heading)) map.set(heading, []);
    map.get(heading).push(link);
  });

  return map;
}

/**
 * Finds the heading closest to (but above) the current scroll position.
 *
 * @param {Map<Element, Element[]>} headings - Heading → links map.
 * @param {number} rootTop - The scroll container's top offset on screen.
 * @returns {Element | null} The current active heading, or null.
 */
function findActiveHeading(headings, rootTop) {
  const HEADER_OFFSET = 80;
  let current = null;

  for (const heading of headings.keys()) {
    const top = heading.getBoundingClientRect().top - rootTop;
    if (top <= HEADER_OFFSET) {
      current = heading;
    }
  }

  return current;
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

export function initDocs() {
  injectAnchorLinks();
  initTocHighlight();
  document.addEventListener("alpine:init", () => {
    registerAlpineVarapressDocs();
  });
}
