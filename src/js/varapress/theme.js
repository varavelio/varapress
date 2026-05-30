function registerAlpineTheme() {
  Alpine.data("theme", () => ({
    /** @type {"light" | "dark" | "system"} */
    theme: "system",

    /** @type {"light" | "dark"} */
    resolvedTheme: "light",

    init() {
      if (window.__varapressTheme) {
        const state = window.__varapressTheme.get();
        this.theme = state.theme;
        this.resolvedTheme = state.resolved;
      }
      window.addEventListener("varapress-theme-change", (e) => {
        this.theme = e.detail.theme;
        this.resolvedTheme = e.detail.resolved;
      });
    },

    cycleTheme() {
      const cycle = { light: "dark", dark: "system", system: "light" };
      const next = cycle[this.theme] || "system";
      if (window.__varapressTheme) window.__varapressTheme.set(next);
    },

    get themeLabel() {
      return this.theme.charAt(0).toUpperCase() + this.theme.slice(1);
    },
  }));
}

export function initTheme() {
  document.addEventListener("alpine:init", () => {
    registerAlpineTheme();
  });
}
