import { html, virtual } from '@apollo-elements/haunted';
import { DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE } from '../../helpers';

const PerfectGrillGrillCookingAreaSelector = virtual(
  ({
    currentGrillCookingAreaRange,
    grillCookingAreaMinAndMax,
    handleGrillCookingAreaRangeChanged,
  }) => {
    const [min, max] =
      grillCookingAreaMinAndMax ??
      DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE;
    const [valueMin, valueMax] =
      currentGrillCookingAreaRange ??
      DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE;
    return html`<style is="custom-style">
        .price-paper-range-slider {
          --paper-range-slider-width: 610px;
          max-width: 100%;
          --primary-color: #fb711c;
        }</style
      ><paper-range-slider
        class="price-paper-range-slider"
        id="price-range-slider"
        step="1"
        min=${min}
        max=${max}
        value-min=${valueMin}
        value-max=${valueMax}
        @updateValues=${(e) => {
          handleGrillCookingAreaRangeChanged([
            e.target.valueMin,
            e.target.valueMax,
          ]);
        }}
      ></paper-range-slider>`;
  }
);

export default PerfectGrillGrillCookingAreaSelector;
