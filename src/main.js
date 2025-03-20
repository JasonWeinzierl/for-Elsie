// @ts-check
import './styles.css';

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
      behavior: 'smooth',
      // Center to avoid conflicting with the intersection observer.
      block: 'center',
    });
  }
  e.preventDefault();
});
