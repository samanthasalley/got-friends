/**
 * ************************************
 *
 * @module  compatibility
 * @author  boilerplate
 * @date    boilerplate
 * @description Reusable utility for checking browser compatibility
 *
 * ************************************
 */

const isMobile = (ua) => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(ua));
const isIE11 = (ua) => (/Trident/.test(ua));
const isSafari = (ua) => (/^((?!chrome|android).)*safari/i.test(ua));
const isChrome = (ua) => (/^((?!safari|android).)*chrome/i.test(ua));

export const checkCompatibility = (options, userAgent) => {
  const passAll = options.reduce((passing, opt) => {
    if (passing) {
      switch (opt) {
        case 'mobile':
          return !isMobile(userAgent);
          break;
        case 'ie11':
          return !isIE11(userAgent);
          break;
        case 'safari':
          return !isSafari(userAgent);
          break;
        case 'chrome':
          return !isChrome(userAgent);
          break;
      }
    }
    return passing;
  }, true);
  return !passAll;
};