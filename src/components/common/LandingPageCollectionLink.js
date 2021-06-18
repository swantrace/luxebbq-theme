/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { html } from '@apollo-elements/haunted';

function LandingPageCollectionLink({ cookType, standType, bbqBrand, title }) {
  const urlBase = `/collections/barbeques?`;

  const rules = cookType
    ? {
        selectedCookTypesAndBrands: [[cookType, [bbqBrand]]],
      }
    : standType
    ? {
        selectedStandTypes: [standType],
        selectedCookTypesAndBrands: [
          ['Gas Grill', [bbqBrand]],
          ['Charcoal Grill', [bbqBrand]],
          ['Pellet Grill', [bbqBrand]],
          ['Electric Grill', [bbqBrand]],
          ['Offset Smoker', [bbqBrand]],
          ['Pizza Oven', [bbqBrand]],
        ],
      }
    : {};

  return html`<a
    href=${window.encodeURI(
      `${urlBase}${Object.entries(rules)
        .map(
          ([ruleKey, ruleValue]) => `${ruleKey}=${JSON.stringify(ruleValue)}`
        )
        .join('&')}`
    )}
  >
    <h6>${title}</h6>
  </a>`;
}

export default {
  tagName: 'landing-page-collection-link',
  renderer: LandingPageCollectionLink,
  options: {
    observedAttributes: ['cook-type', 'stand-type', 'bbq-brand'],
    useShadowDOM: false,
    baseElement: HTMLDivElement,
  },
  elementOptions: { extends: 'div' },
};
