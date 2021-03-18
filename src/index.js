import './apollo-client';
import './components/index';

document.addEventListener('DOMContentLoaded', () => {
  // add active class to menu item
  const path = window.location.pathname;
  const navigationElement = document.querySelector('#main-menu');
  const activeLinkElement = navigationElement?.querySelector(
    `[href*="${path}"]`
  );
  const activeParentLinkElement = activeLinkElement?.closest('#main-menu>li>a');
  activeParentLinkElement?.classList?.add('active');
});
