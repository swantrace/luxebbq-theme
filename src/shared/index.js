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
      console.log(
        'testComponent2',
        document.getElementsByTagName('paper-range-slider')[0].shadowRoot
          .firstChild
      );
      Array.from(document.getElementsByTagName('paper-range-slider')).forEach(
        (sliderElement) => {
          Array.from(
            sliderElement.shadowRoot.querySelectorAll('[role="slider"]')
          ).forEach((singleSliderElement) => {
            const styleElement = singleSliderElement.shadowRoot.firstChild;
            console.log('styleElement', styleElement);
            const newStyles = `.pin > .slider-knob > .slider-knob-inner::before {
              transform: none !important;
              border-radius: unset !important;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA6CAYAAADcKStOAAAD7UlEQVRoQ82ZT1bbMBDGPzmwi3nhBgHTdeEEJScoOUHhBsF0X7ovTjgBuUG5AfQEpOsSyA3g1dmRWH2yLUfyH0k2dhOv8l7k8U8z0sw3EsGGPmRDuVAbmO8eXAL0o+1N+3VMthawuevcUOAUICPbezzfCLAVFACL9Owfj/drB/Mv9h9AySEHsb1pLRFg9iobkjwVWqIT++rpqA5vVQbz3YMhQAcSBMW9PZz21gbmfz04RkDvMgAFYMyzbW96Vha4VChfBt3OttV6oEA386GcUPJJUOBsx5uOy8CVAotz1beiD6QXv+86PwGcoEKYS4I5LwA6RWAksI7aoz8T/r/vOpT/Tv+n854x2N8L54RQMA8UPgT0vO09jfLAAPLd9h4vdUDJREwH6sIY2kmtMzmlrBMMwCJY7u2OZjPGOR98OKRW8BDlJdmbOocYh9LIY5HbpHoZr7PXGPhVB9RMKCOrEoR/7tyBkF98fbG1ygbtXE1v1evVcArmHgu9lix09h6HYnlwy2o9wyJ9XbFvIJRZrwm7NMxrJsW+KTDJa+mNUCvYX9c5JcCNYeT5WjviO1SssYtgubs7mik3grnHioq3MuFizAu4mDpMaqcxGPu+76pLUh6jWIp4iSLA7C1YMm8Wek0LxrY339pJUS4RT7GAR6kDx9Hr6v5AC8aMUQvXDM6kXuYyx71AWvWqCrsRGCza4bJZVAzGjotlTyYXKuSQHixuOPgWl8NhjMaaizGNJFOY+ZOnoLNSgsWZmmkwcLfn6n1zvryRt3lNshJMyl3xzMqVJjNiUZEYFfG56zwn+r5BsDwRWeixTKbnYKkm18wn6lEsr7W96Z44KhcsUQGivrdIjwTBIQUZ1gGTtpFOHblguYmU0Il4HFA/nJxwM2CVk+g7SdPhlMBeBt3ultViGr2wRXvn95Wvi+GUwCrVwlpJV+FMwArPJGr9sMaY0P6twHg7/z9Bcr7FS18IJpaeNXOxvjRUtyHYunaiSiKFYE3Uv6qelzy2SWDSGtsYsPSu3BQwJiZ5VxWtsQqtWdU1pHpPbOs2CkxshMUEmxxLNuENA5uSxF6BST2fgZmah6S78wRs7u4PmhKBujkoFWyuatVZrOl/StBPH+SlZE9451h4jl8Th2RGTBFKzZ++UWsCJrFJ6GSxDHp5hysZaR2GtGXdNavvAXbYsqDLftGJT2GXtG21htGtbROP/iZY3YlfOCcWBQPMXmpV4GW7j1rkTHcwzExrD1Wi3bo1IKBf3gH4CpDrRq5sQkEZncN+BsLDN20nxTwE0Ou3IBjrzlzTAdB6rChirPBHnbnVAaWf+DhCQpjfCFr34k1c2cj/A7DnOln4E8OfAAAAAElFTkSuQmCC) !important;
              display: block !important;
              background-repeat: no-repeat !important;
              position: relative !important;
              background-size: cover !important;
              background-position: center !important;
              background-color: transparent !important;
              width: 30px !important;
              height: 45.8px !important;
              top: -54px !important;
              margin-left: -15px !important;
            }
            #sliderContainer {
              margin-left: 0!important;
              margin-right: 0!important;
            }
            .pin > .slider-knob > .slider-knob-inner::after {
              top: 1px !important;
            }`;
            styleElement.appendChild(document.createTextNode(newStyles));
          });
        }
      );

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
