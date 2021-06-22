import { html, virtual } from '@apollo-elements/haunted';
import { DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE } from '../../shared/helpers';

const PerfectGrillPriceRangeSelector = virtual(
  ({ currentPriceRange, priceRangeMinAndMax, handlePriceRangeChanged }) => {
    const [min, max] =
      priceRangeMinAndMax ?? DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE;
    const [valueMin, valueMax] =
      currentPriceRange ?? DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE;

    const handleOver6500Checkbox = (e) => {
      if (e.target.checked) {
        handlePriceRangeChanged([6500, Infinity]);
      } else {
        handlePriceRangeChanged([0, 6500]);
      }
    };
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
        step="250"
        always-show-pin
        min=${min}
        max=${max}
        value-min=${valueMin}
        value-max=${valueMax}
        @updateValues=${(e) => {
          handlePriceRangeChanged([e.target.valueMin, e.target.valueMax]);
        }}
      ></paper-range-slider>
      <div style="flex-basis: 100%; height: 0;"></div>
      <div class="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="show-over-6500"
          @change=${handleOver6500Checkbox}
        />
        <label class="form-check-label" for="show-over-6500"
          >Show Grills Over $6500</label
        >
      </div>`;
  }
);

export default PerfectGrillPriceRangeSelector;
