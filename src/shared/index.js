/* eslint-disable import/prefer-default-export */
import 'paper-range-slider';
import './apollo-client';
import CompareTable from '../components/common/CompareTable';
import MegaMenu from '../components/common/MegaMenu';

const setupStart = () => {
  const start = () => {
    // add active class to menu item
    const path = window.location.pathname;
    if (path !== '/') {
      const navigationElement = document.querySelector('#main-menu');
      const activeLinkElement = navigationElement?.querySelector(
        `[href*="${path}"]`
      );
      const activeParentLinkElement = activeLinkElement?.closest(
        '#main-menu>li>a'
      );
      activeParentLinkElement?.classList?.add('active');
    }
    document.body.removeAttribute('hidden');
    document.dispatchEvent(new CustomEvent('customElementsPrepared'));

    document.addEventListener('scriptJSLoaded', () => {
      if (window.$ && window.$.fn && window.$.fn.slick) {
        window.$('.slick_carousel').slick();
      }
      document.addEventListener('allProductsPreparedForRelatedProducts', () => {
        if (window.$ && window.$.fn && window.$.fn.slick) {
          setTimeout(() => {
            window.$('.slick_carousel').slick();
          }, 500);
        }
      });
    });
  };

  if (/complete|interactive|loaded/.test(document.readyState)) {
    start();
  } else {
    document.addEventListener('DOMContentLoaded', start, false);
  }
};

export { CompareTable, MegaMenu, setupStart };
