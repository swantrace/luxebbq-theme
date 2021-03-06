import { html, virtual } from '@apollo-elements/haunted';
import { DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE } from '../../shared/helpers';

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
        .cooking-area-paper-range-slider {
          width: 100%;
          --paper-range-slider-width: 100%;
          --primary-color: #fb711c;
          --paper-single-range-slider-height: 4px;
        }
      </style>
      <paper-range-slider
        class="cooking-area-paper-range-slider price-paper-range-slider"
        id="price-range-slider"
        step="5"
        always-show-pin
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
