import { html, virtual } from '@apollo-elements/haunted';
import { DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE } from '../../shared/helpers';

const PerfectGrillPriceRangeSelector = virtual(
  ({ currentPriceRange, priceRangeMinAndMax, handlePriceRangeChanged }) => {
    const [min, max] =
      priceRangeMinAndMax ?? DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE;
    const [valueMin, valueMax] =
      currentPriceRange ?? DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE;
    return html`<style is="custom-style">
        .price-paper-range-slider {
          width: 100%;
          --paper-range-slider-width: 100%;
          --primary-color: #fb711c;
          --paper-single-range-slider-height: 4px;
        }
      </style>
      <paper-range-slider
        class="price-paper-range-slider"
        id="price-range-slider"
        step="1"
        always-show-pin
        min=${min}
        max=${max}
        value-min=${valueMin}
        value-max=${valueMax}
        @updateValues=${(e) => {
          handlePriceRangeChanged([e.target.valueMin, e.target.valueMax]);
        }}
      ></paper-range-slider>`;
  }
);

export default PerfectGrillPriceRangeSelector;
