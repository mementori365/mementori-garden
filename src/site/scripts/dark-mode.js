/**
 * dark-mode.js — Mementori Garden
 *
 * Toggle dark/light mode. Persists choice in localStorage.
 * Falls back to prefers-color-scheme if no preference saved.
 *
 * Sets data-color-mode="dark"|"light" on <html>.
 * CSS targets [data-color-mode="dark"] for explicit dark mode.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'mementori-color-mode';
  var html = document.documentElement;

  function getPreferred() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(mode) {
    html.setAttribute('data-color-mode', mode);
    var btn = document.getElementById('dark-mode-toggle');
    if (btn) {
      btn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.textContent = mode === 'dark' ? '☀' : '☽';
    }
  }

  function toggle() {
    var current = html.getAttribute('data-color-mode') || getPreferred();
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  }

  // Apply immediately (before page paint) to avoid flash
  apply(getPreferred());

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('dark-mode-toggle');
    if (btn) {
      var mode = html.getAttribute('data-color-mode') || getPreferred();
      btn.textContent = mode === 'dark' ? '☀' : '☽';
      btn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.addEventListener('click', toggle);
    }
  });
})();
