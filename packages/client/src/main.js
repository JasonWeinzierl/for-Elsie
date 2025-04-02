// @ts-check
import './styles.css';
import { createIcons, ChevronDown, Menu, X, } from 'lucide';

createIcons({
  icons: {
    Menu,
    X,
  },
});
createIcons({
  icons: {
    ChevronDown,
  },
  attrs: {
    'stroke-width': 1,
  },
});

/** @type {number | null} */
let timeout = null;
/** @param {string} hash */
function debounceReplaceState(hash) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    if (location.hash !== hash) {
      history.replaceState({}, '', hash);
    }
    timeout = null;
  }, 200);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const hash = `#${entry.target.id}`;
      debounceReplaceState(hash);
    }
  });
}, {
  // Relative to the viewport.
  root: null,
  // Shrink the intersection bounds to a vertically centered horizontal line.
  rootMargin: '-50% 0% -50% 0%',
  // Use the default value.
  threshold: 0,
});

// Navigation for these pages.
[
  'welcome',
  'schedule',
  'registry',
  'faq',
  'wedding-party',
  'about',
].forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    intersectionObserver.observe(element);
  }
});

// Smooth scroll when navigating back.
addEventListener('hashchange', e => {
  const element = document.querySelector(location.hash);
  if (element) {
    element.scrollIntoView({
      // Center to avoid conflicting with the intersection observer.
      block: 'center',
    });
  }
  e.preventDefault();
});

/**
* @param {Date} date
*/
function formatDate(date) {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();

  const days = Math.abs(Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const hours = Math.abs(Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.abs(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = Math.abs(Math.floor((diffMs % (1000 * 60)) / 1000));

  return `${days} days ${hours} hours ${minutes} minutes`;
}

const dateCounterElement = /** @type {HTMLTimeElement | null} */ (document.getElementById('event-logistics-date-counter'));
if (dateCounterElement) {
  const weddingDate = new Date('2025-11-07T17:00:00-06:00');
  dateCounterElement.dateTime = weddingDate.toISOString();

  dateCounterElement.textContent = formatDate(weddingDate);
  setInterval(() => {
    dateCounterElement.textContent = formatDate(weddingDate);
  }, 1_000);
}
