/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { html } from '@apollo-elements/haunted';

function LandingPageCollectionLink({ cookType, standType, bbqBrand, title }) {
  // console.log('bbqBrand: ', bbqBrand);
  const urlBase = `/collections/barbeques?`;

  const rules = cookType
    ? {
        selectedCookTypesAndBrands: [
          [cookType, bbqBrand === 'View All' ? [] : [bbqBrand]],
        ],
      }
    : standType
    ? {
        selectedStandTypes: [standType],
        selectedCookTypesAndBrands: [
          ['Gas Grill', bbqBrand === 'View All' ? [] : [bbqBrand]],
          ['Charcoal Grill', bbqBrand === 'View All' ? [] : [bbqBrand]],
          ['Pellet Grill', bbqBrand === 'View All' ? [] : [bbqBrand]],
          ['Electric Grill', bbqBrand === 'View All' ? [] : [bbqBrand]],
          ['Offset Smoker', bbqBrand === 'View All' ? [] : [bbqBrand]],
          ['Pizza Oven', bbqBrand === 'View All' ? [] : [bbqBrand]],
        ],
      }
    : {};

  return html`<a
    href=${`${urlBase}${Object.entries(rules)
      .map(
        ([ruleKey, ruleValue]) =>
          `${ruleKey}=${encodeURIComponent(JSON.stringify(ruleValue))}`
      )
      .join('&')}`}
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
