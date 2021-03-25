import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';
import { DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE } from '../../helpers';

function GrillCookingAreaFilter() {
  const context = useBarbequeSmokerCollectionContext();
  const [min, max] =
    context?.grillCookingAreaMinAndMax ??
    DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE;
  const [valueMin, valueMax] =
    context?.collectionState?.currentGrillCookingAreaRange ??
    DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE;
  const allProducts = context?.collectionState?.allProducts ?? [];
  const dispatch = context?.collectionDispatch ?? (() => {});
  return html`<div class="collection-collapse-block">
    <h3 class="collapse-block-title">Grill Cooking Area</h3>
    <div class="collection-collapse-block-content">
      <div class="collection-grill-cooking-filter">
        <paper-range-slider
          id="grill-cooking-area-range-slider"
          ?disabled=${allProducts?.length === 0}
          min=${min}
          max=${max}
          value-min=${valueMin}
          value-max=${valueMax}
          @updateValues=${(customEvent) => {
            dispatch({
              type: 'changeGrillCookingAreaRange',
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
  tagName: 'grill-cooking-area-filter',
  renderer: GrillCookingAreaFilter,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};