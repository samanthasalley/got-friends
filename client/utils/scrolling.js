/**
 * ************************************
 *
 * @module  scrolling
 * @author  boilerplate
 * @date    boilerplate
 * @description Reusable utilities for scrolling
 *
 * ************************************
 */

/**
 * @name scrollIt
 * @param {DOM Element} destination element to scroll to
 * @param {number} duration representing the duration of the transition
 * @param {string} easing should match a method in easings object
 * @param {number} fixedTopOffset (ex. to account for fixed navbar height)
 * @param {function} callback if provided, is invoked upon reaching destination
 * @description vanilla js function enabling smooth scrolling
 * NOTE: an updated version of the function in this article:
 *       (https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/)
 */
export function scrollIt(destination, duration = 200, easing = 'linear', fixedTopOffset = 0, callback) {

  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  // current scroll position when clicked
  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  // find height of the document overall
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  // find height of the window overall
  const windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.getElementsByTagName('body')[0].clientHeight;

  const destRect = destination.getBoundingClientRect();

  // find distance between top of window and dest el
  const destinationOffset = start + destRect.top;

  // round how far to scroll, accounting for bottom of document and any fixed top elements
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : (destinationOffset - fixedTopOffset) >= 0
        ? (destinationOffset - fixedTopOffset)
        : 0
  );

  // start ugly scroll if we don't have access to requestAnimationFrame
  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) callback();
    return;
  }

  // recursive helper function enabling smooth scrolling
  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);

    // determine scroll position accounting for easy transition
    const currentScroll = Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start);

    // scroll
    window.scroll(0, currentScroll);

    /** 
     * The fix to support scrolling up/down on any zoom (Google Chrome)
     * @see http://disq.us/p/1u9vja8
     */
    const stopResult = (window.pageYOffset / destinationOffsetToScroll).toFixed(2);
    if (stopResult === '1.00' || stopResult === '0.99') {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  // start smooth scrolling
  scroll();
}

/**
   * @name checkHashAndscrollToAnchor
   * @description decodes hash in window location, if decoded hash exists
   *  scrolls DOM element into view based on hash in window location (url)
   * TODO: pass in fixed navbar offset here instead of relying on default
   */
export const checkHashAndscrollToAnchor = (topOffset = 100) => {
  // Decode entities in the URL
  // Sometimes a URL like #/foo#bar will be encoded as #/foo%23bar
  window.location.hash = window.decodeURIComponent(window.location.hash);

  if (window.location.hash) {
    // find dom element to scroll to (if exists)
    const scrollEl = document.querySelector(window.location.hash);

    // scroll to element (if exists)
    scrollEl ? scrollIt(scrollEl, 200, 'linear', topOffset) : null;
  }
}