import { component, html } from '@apollo-elements/haunted';
import './apollo-client';
import partComponents from './components';
import pageComponents from './pages';
import './styles.scss';

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

  // Object.values({ ...partComponents, ...pageComponents }).forEach(
  //   (pComponent) => {
  //     customElements.define(
  //       pComponent.tagName,
  //       component(pComponent.renderer, pComponent.options)
  //     );
  //   }
  // );
  const {
    renderer,
    tagName,
    options,
  } = partComponents.CookTypesAndBrandsFilter;
  customElements.define(tagName, component(renderer(html), options));
});
