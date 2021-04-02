import { html, useEffect } from '@apollo-elements/haunted';
import { usePageContext as usePerfectGrillContext } from '../../context';
import {
  DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE,
  DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE,
} from '../../helpers';
import PerfectGrillAvailabilitySelector from './PerfectGrillAvailabilitySelector';
import PerfectGrillBrandSelector from './PerfectGrillBrandSelector';
import PerfectGrillCookTypeSelector from './PerfectGrillCookTypeSelector';
import PerfectGrillGrillCookingAreaSelector from './PerfectGrillGrillCookingAreaSelector';
import PerfectGrillKeyFeaturesSelector from './PerfectGrillKeyFeaturesSelector';
import PerfectGrillPriceRangeSelector from './PerfectGrillPriceRangeSelector';

function PerfectGrillSelectors() {
  const context = usePerfectGrillContext();
  const dispatch = context?.dispatch ?? (() => {});
  const state = context?.state ?? {};
  const cookTypeLogos = context?.cookTypeLogos ?? {};
  const brandInfo = context?.brandInfo ?? {};
  const priceRangeMinAndMax = context?.priceRangeMinAndMax;
  const grillCookingAreaMinAndMax = context?.grillCookingAreaMinAndMax;
  const selectedCookTypesAndBrands = state?.selectedCookTypesAndBrands ?? {};
  const availability = state?.availability ?? [];
  const currentPriceRange =
    state?.currentPriceRange ?? DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE;
  const currentGrillCookingAreaRange =
    state?.currentGrillCookingAreaRange ??
    DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE;
  const sideBurner = state?.sideBurner ?? false;
  const searBurner = state?.searBurner ?? false;
  const rearRotisserie = state?.rearRotisserie ?? false;
  const grillType = state?.grillType ?? [];
  const standType = state?.standType ?? [];
  useEffect(() => {
    dispatch({
      type: 'changeCookTypesAndBrands',
      payload: { 'Gas Grill': [] },
    });
  }, []);
  const handleSelectedCookTypesAndBrandsChanged = (newCookTypesAndBrands) => {
    dispatch({
      type: 'changeCookTypesAndBrands',
      payload: newCookTypesAndBrands,
    });
  };
  const handlePriceRangeChanged = (newPriceRange) => {
    // console.log(e);
    dispatch({
      type: 'changePriceRange',
      payload: newPriceRange,
    });
  };
  const handleGrillCookingAreaRangeChanged = (newGrillCookingAreaRange) => {
    // console.log(e);
    dispatch({
      type: 'changeGrillCookingAreaRange',
      payload: newGrillCookingAreaRange,
    });
  };
  const handleAvailabilityChanged = (newAvailability) => {
    // debugger;
    console.log('new', newAvailability);
    // console.log(e);
    dispatch({
      type: 'changeAvailability',
      payload: newAvailability,
    });
  };
  const handleSideBurnerChanged = (newSideBurner) => {
    // console.log(e);
    dispatch({
      type: 'changeSideBurner',
      payload: newSideBurner,
    });
  };
  const handleSearBurnerChanged = (newSearBurner) => {
    // console.log(e);
    dispatch({
      type: 'changeSearBurner',
      payload: newSearBurner,
    });
  };
  const handleRearRotisserieChanged = (newRearRotisserie) => {
    dispatch({
      type: 'changeRearRotisserie',
      payload: newRearRotisserie,
    });
  };
  const handleGrillTypeChanged = (newGrillType) => {
    dispatch({
      type: 'changeGrillType',
      payload: newGrillType,
    });
  };
  const handleStandTypeChanged = (newStandType) => {
    dispatch({
      type: 'changeStandType',
      payload: newStandType,
    });
  };
  return html`<div
      class="d-flex justify-content-between align-items-center label-input-wrapper py-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label">Cook Type</h3>
      <div
        class="d-flex text-right justify-content-end perfect-grill-selector-input"
      >
        ${PerfectGrillCookTypeSelector({
          cookTypeLogos,
          selectedCookTypesAndBrands,
          handleSelectedCookTypesAndBrandsChanged,
        })}
      </div>
    </div>
    <div
      class="d-flex justify-content-between align-items-center label-input-wrapper py-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label">Brand</h3>
      <div
        class="d-flex text-right justify-content-end perfect-grill-selector-input"
      >
        ${PerfectGrillBrandSelector({
          brandInfo,
          selectedCookTypesAndBrands,
          handleSelectedCookTypesAndBrandsChanged,
        })}
      </div>
    </div>
    <div
      class="d-flex justify-content-between align-items-center label-input-wrapper py-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label">Price Range</h3>
      <div
        class="d-flex text-right justify-content-end perfect-grill-selector-input"
      >
        ${PerfectGrillPriceRangeSelector({
          currentPriceRange,
          priceRangeMinAndMax,
          handlePriceRangeChanged,
        })}
      </div>
    </div>
    <div class="price-range-values text-right">
      min: ${currentPriceRange[0]}, max: ${currentPriceRange[1]}
    </div>
    <div
      class="d-flex justify-content-between align-items-center label-input-wrapper py-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label">
        Grill Cooking Area
      </h3>
      <div
        class="d-flex text-right justify-content-end perfect-grill-selector-input"
      >
        ${PerfectGrillGrillCookingAreaSelector({
          currentGrillCookingAreaRange,
          grillCookingAreaMinAndMax,
          handleGrillCookingAreaRangeChanged,
        })}
      </div>
    </div>
    <div class="price-range-values text-right">
      min: ${currentGrillCookingAreaRange[0]}, max:
      ${currentGrillCookingAreaRange[1]}
    </div>
    <div
      class="d-flex justify-content-between align-items-center label-input-wrapper py-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label">Availability</h3>
      <div
        class="d-flex text-right justify-content-start perfect-grill-selector-input flex-wrap"
      >
        ${PerfectGrillAvailabilitySelector({
          availability,
          handleAvailabilityChanged,
        })}
      </div>
    </div>
    <div
      class="d-flex justify-content-between align-items-center label-input-wrapper py-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label">Key Features</h3>
      <div
        class="d-flex text-right justify-content-start perfect-grill-selector-input flex-wrap"
      >
        ${PerfectGrillKeyFeaturesSelector({
          sideBurner,
          searBurner,
          rearRotisserie,
          grillType,
          standType,
          handleSideBurnerChanged,
          handleSearBurnerChanged,
          handleRearRotisserieChanged,
          handleGrillTypeChanged,
          handleStandTypeChanged,
        })}
      </div>
    </div>`;
}

export default {
  tagName: 'perfect-grill-selectors',
  renderer: PerfectGrillSelectors,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
