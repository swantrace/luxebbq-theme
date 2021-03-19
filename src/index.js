import { component } from '@apollo-elements/haunted';
import './apollo-client';
import './components/index';
import pageComponents from './pages';
import './styles.scss';

console.log(pageComponents);
document.addEventListener('DOMContentLoaded', () => {
  // add active class to menu item
  const path = window.location.pathname;
  const navigationElement = document.querySelector('#main-menu');
  const activeLinkElement = navigationElement?.querySelector(
    `[href*="${path}"]`
  );
  const activeParentLinkElement = activeLinkElement?.closest('#main-menu>li>a');
  activeParentLinkElement?.classList?.add('active');

  // create custom elements
  Object.values(pageComponents).forEach((pageComponent) => {
    customElements.define(
      pageComponent.tagName,
      component(pageComponent.renderer, pageComponent.options)
    );
  });
});
