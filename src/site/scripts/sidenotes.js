/**
 * sidenotes.js — Mementori Garden
 *
 * On wide screens (≥ 1280px): move footnote content into right-margin sidenotes.
 * On narrow screens (< 1280px): make footnote markers toggleable inline.
 *
 * Expects standard markdown-it-footnote output:
 *   Marker: <sup class="footnote-ref"><a href="#fn1" id="fnref1">1</a></sup>
 *   Content: <section class="footnotes"><ol><li id="fn1">…</li></ol></section>
 */

(function () {
  'use strict';

  function initSidenotes() {
    const article = document.querySelector('main.content');
    if (!article) return;

    const markers = article.querySelectorAll('sup.footnote-ref');
    if (!markers.length) return;

    const footnoteSection = article.querySelector('section.footnotes');
    const isWide = window.innerWidth >= 1280;

    markers.forEach(function (sup) {
      const anchor = sup.querySelector('a[href^="#fn"]');
      if (!anchor) return;

      const fnId = anchor.getAttribute('href').slice(1); // e.g. "fn1"
      const fnItem = document.getElementById(fnId);
      if (!fnItem) return;

      // Clone content (strip the back-reference arrow)
      const clone = fnItem.cloneNode(true);
      const backref = clone.querySelector('a.footnote-backref');
      if (backref) backref.remove();

      if (isWide) {
        // Wide: insert absolute sidenote next to the marker
        const sidenote = document.createElement('aside');
        sidenote.className = 'sidenote';
        sidenote.setAttribute('data-fn', fnId);
        sidenote.innerHTML = clone.innerHTML;
        sup.parentNode.insertBefore(sidenote, sup.nextSibling);
      } else {
        // Narrow: make marker a toggle button for inline sidenote
        anchor.setAttribute('role', 'button');
        anchor.setAttribute('aria-expanded', 'false');
        anchor.setAttribute('href', '#');
        anchor.style.cursor = 'pointer';

        const inlineNote = document.createElement('div');
        inlineNote.className = 'sidenote-inline';
        inlineNote.setAttribute('hidden', '');
        inlineNote.innerHTML = clone.innerHTML;

        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const expanded = inlineNote.hasAttribute('hidden') === false;
          if (expanded) {
            inlineNote.setAttribute('hidden', '');
            anchor.setAttribute('aria-expanded', 'false');
          } else {
            inlineNote.removeAttribute('hidden');
            anchor.setAttribute('aria-expanded', 'true');
          }
        });

        // Insert after the parent paragraph
        const parentPara = sup.closest('p') || sup.parentNode;
        parentPara.parentNode.insertBefore(inlineNote, parentPara.nextSibling);
      }
    });

    // On wide: hide the bottom footnotes section
    if (isWide && footnoteSection) {
      footnoteSection.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidenotes);
  } else {
    initSidenotes();
  }
})();
