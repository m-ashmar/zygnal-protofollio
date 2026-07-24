"use client";

import { useEffect } from "react";

/**
 * Ensures the page always opens at the hero, not wherever the browser
 * last left the scroll position. Browsers default to
 * `history.scrollRestoration = "auto"`, which restores the previous
 * scroll offset on reload — on this long single-page site that can drop
 * the visitor at the footer with the 3D hero far above the viewport.
 */
export default function ScrollManager() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Respect deep links to a section (#services etc.); otherwise start at top.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
