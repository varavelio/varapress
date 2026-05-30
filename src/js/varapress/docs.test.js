import assert from "node:assert/strict";
import test from "node:test";

import { resolveBackToTopState } from "./docs.js";

test("keeps back-to-top hidden for short upward scrolls", () => {
  const state = resolveBackToTopState({
    currentScrollTop: 450,
    previousScrollTop: 700,
    upwardScrollDistance: 0,
  });

  assert.equal(state.showBackToTop, false);
  assert.equal(state.upwardScrollDistance, 250);
  assert.equal(state.previousScrollTop, 450);
});

test("shows back-to-top after scrolling upward by at least 300px", () => {
  const state = resolveBackToTopState({
    currentScrollTop: 400,
    previousScrollTop: 700,
    upwardScrollDistance: 0,
  });

  assert.equal(state.showBackToTop, true);
  assert.equal(state.upwardScrollDistance, 300);
  assert.equal(state.previousScrollTop, 400);
});

test("resets back-to-top visibility when scrolling down", () => {
  const state = resolveBackToTopState({
    currentScrollTop: 430,
    previousScrollTop: 400,
    upwardScrollDistance: 320,
  });

  assert.equal(state.showBackToTop, false);
  assert.equal(state.upwardScrollDistance, 0);
  assert.equal(state.previousScrollTop, 430);
});

test("hides back-to-top at the top of the main scroll container", () => {
  const state = resolveBackToTopState({
    currentScrollTop: 0,
    previousScrollTop: 120,
    upwardScrollDistance: 320,
  });

  assert.equal(state.showBackToTop, false);
  assert.equal(state.upwardScrollDistance, 0);
  assert.equal(state.previousScrollTop, 0);
});
