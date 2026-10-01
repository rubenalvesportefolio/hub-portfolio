/* ---------- Display mode: "full experience" / "lite" ----------
   The gear button in the top-right of every header opens a small panel
   with one switch:

     full - everything as designed: shimmering heading, animated "wave"
            and "featured" buttons, noise overlay, blurred header.
     lite - no animations or transitions, solid colours instead of the
            moving chrome gradients, no noise overlay or blur - an idle
            page does no work at all. See the "lite" rules at the bottom
            of styles.css.

   This file is loaded in <head> on purpose: it sets
   <html data-mode="..."> before the page is drawn, so a visitor who
   chose lite never sees a flash of the animated version first.

   Default: lite if the visitor's OS asks for reduced motion, otherwise
   full. Once someone flips the switch, that choice is remembered
   (localStorage) and wins from then on. A "displaymode:change" event
   is fired on every change, for any script that needs to react. */

const DisplayMode = (function initDisplayMode() {
  const STORAGE_KEY = 'displayMode';
  const MODES = ['full', 'lite'];

  function readStored() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }
  function store(mode) {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* choice just won't survive this visit */
    }
  }

  function initialMode() {
    const stored = readStored();
    if (MODES.includes(stored)) return stored;
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reducedMotion ? 'lite' : 'full';
  }

  let current = initialMode();
  document.documentElement.dataset.mode = current;

  function syncSwitches() {
    document.querySelectorAll('.mode-switch').forEach((sw) => {
      sw.setAttribute('aria-checked', String(current === 'full'));
    });
  }

  function set(mode) {
    if (!MODES.includes(mode) || mode === current) return;
    current = mode;
    store(mode);
    document.documentElement.dataset.mode = mode;
    syncSwitches();
    document.dispatchEvent(new CustomEvent('displaymode:change', { detail: { mode } }));
  }

  // Gear button + panel. Markup lives in each page's header
  // (.display-settings); this only wires it up.
  function hydrate() {
    syncSwitches();

    document.querySelectorAll('.display-settings').forEach((wrap) => {
      const toggle = wrap.querySelector('.settings-toggle');
      const panel = wrap.querySelector('.settings-panel');
      const sw = wrap.querySelector('.mode-switch');
      if (!toggle || !panel) return;

      const setOpen = (open) => {
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
      };

      toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        setOpen(panel.hidden);
        if (!panel.hidden && sw) sw.focus();
      });

      // Close on a click anywhere else, or on Esc (focus returns to the gear).
      document.addEventListener('click', (event) => {
        if (!panel.hidden && !wrap.contains(event.target)) setOpen(false);
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !panel.hidden) {
          setOpen(false);
          toggle.focus();
        }
      });

      if (sw) {
        sw.addEventListener('click', () => set(current === 'full' ? 'lite' : 'full'));
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hydrate);
  else hydrate();

  return {
    set,
    get mode() {
      return current;
    },
  };
})();
