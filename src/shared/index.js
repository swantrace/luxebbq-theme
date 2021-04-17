/* eslint-disable import/prefer-default-export */
import 'paper-range-slider';
import './apollo-client';
import CompareTable from '../components/common/CompareTable';

const start = () => {
  // add active class to menu item

  const path = window.location.pathname;
  const navigationElement = document.querySelector('#main-menu');
  const activeLinkElement = navigationElement?.querySelector(
    `[href*="${path}"]`
  );
  const activeParentLinkElement = activeLinkElement?.closest('#main-menu>li>a');
  activeParentLinkElement?.classList?.add('active');
  console.log('move hidden attribute');
  document.body.removeAttribute('hidden');
  document.dispatchEvent(new CustomEvent('customElementsPrepared'));
};

if (/complete|interactive|loaded/.test(document.readyState)) {
  console.log(document.readyState);
  start();
} else {
  document.addEventListener('DOMContentLoaded', start, false);
}

export { CompareTable };
