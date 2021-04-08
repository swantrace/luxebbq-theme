import { component } from '@apollo-elements/haunted';
import 'paper-range-slider';
import './apollo-client';
import partComponents from './components';
import pageComponents from './pages';
import './styles.scss';

const start = () => {
  // add active class to menu item
  const path = window.location.pathname;
  const navigationElement = document.querySelector('#main-menu');
  const activeLinkElement = navigationElement?.querySelector(
    `[href*="${path}"]`
  );
  const activeParentLinkElement = activeLinkElement?.closest('#main-menu>li>a');
  activeParentLinkElement?.classList?.add('active');

  // create custom elements

  Object.values({ ...partComponents, ...pageComponents }).forEach(
    (pComponent) => {
      customElements.define(
        pComponent.tagName,
        component(pComponent.renderer, pComponent.options)
      );
    }
  );
  document.body.removeAttribute('hidden');
};

if (/complete|interactive|loaded/.test(document.readyState)) {
  console.log(document.readyState);
  start();
} else {
  document.addEventListener('DOMContentLoaded', start, false);
}
