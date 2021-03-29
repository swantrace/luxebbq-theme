import { html } from '@apollo-elements/haunted';
import { usePageContext as useBarbequeSmokerCollectionContext } from '../../context';
import { DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE } from '../../helpers';

function PriceRangeFilter() {
  const context = useBarbequeSmokerCollectionContext();
  const [min, max] =
    context?.priceRangeMinAndMax ?? DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE;
  const [valueMin, valueMax] =
    context?.state?.currentPriceRange ??
    DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE;
  const allProducts = context?.state?.allProducts ?? [];
  const dispatch = context?.dispatch ?? (() => {});
  return html`<div class="collection-collapse-block">
    <h3 class="collapse-block-title">Price Range</h3>
    <div class="collection-collapse-block-content">
      <div class="collection-price-filter">
        <paper-range-slider
          id="price-range-slider"
          ?disabled=${allProducts?.length === 0}
          min=${min}
          max=${max}
          value-min=${valueMin}
          value-max=${valueMax}
          @updateValues=${(customEvent) => {
            dispatch({
              type: 'changePriceRange',
              payload: [
                customEvent.target.valueMin,
                customEvent.target.valueMax,
              ],
            });
          }}
        ></paper-range-slider>
      </div>
    </div>
  </div>`;
}

export default {
  tagName: 'price-range-filter',
  renderer: PriceRangeFilter,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
