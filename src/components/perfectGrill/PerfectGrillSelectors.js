import { html, useEffect } from '@apollo-elements/haunted';
import { usePageContext } from '../../shared/context';
import PerfectGrillAvailabilitySelector from './PerfectGrillAvailabilitySelector';
import PerfectGrillBrandSelector from './PerfectGrillBrandSelector';
import PerfectGrillCookTypeSelector from './PerfectGrillCookTypeSelector';
import PerfectGrillGrillCookingAreaSelector from './PerfectGrillGrillCookingAreaSelector';
import PerfectGrillKeyFeaturesSelector from './PerfectGrillKeyFeaturesSelector';
import PerfectGrillPriceRangeSelector from './PerfectGrillPriceRangeSelector';

function PerfectGrillSelectors() {
  const {
    state,
    dispatch,
    cookTypeLogos,
    brandInfo,
    priceRangeMinAndMax,
    grillCookingAreaMinAndMax,
  } = usePageContext();

  const {
    selectedCookTypesAndBrands,
    availability,
    currentPriceRange,
    currentGrillCookingAreaRange,
    sideBurner,
    searBurner,
    rearRotisserie,
    selectedStandTypes,
    selectedGrillTypes,
  } = state;

  useEffect(() => {
    dispatch({
      type: 'changeCookTypesAndBrands',
      payload: [['Gas Grill', []]],
    });
  }, []);
  const handleSelectedCookTypesAndBrandsChanged = (newCookTypesAndBrands) => {
    // console.log('newCookTypesAndBrands', newCookTypesAndBrands);
    dispatch({
      type: 'changeCookTypesAndBrands',
      payload: newCookTypesAndBrands,
    });
  };
  const handlePriceRangeChanged = (newPriceRange) => {
    dispatch({
      type: 'changePriceRange',
      payload: newPriceRange,
    });
  };
  const handleGrillCookingAreaRangeChanged = (newGrillCookingAreaRange) => {
    dispatch({
      type: 'changeGrillCookingAreaRange',
      payload: newGrillCookingAreaRange,
    });
  };
  const handleAvailabilityChanged = (newAvailability) => {
    dispatch({
      type: 'changeAvailability',
      payload: newAvailability,
    });
  };
  const handleSideBurnerChanged = (newSideBurner) => {
    dispatch({
      type: 'changeSideBurner',
      payload: newSideBurner,
    });
  };
  const handleSearBurnerChanged = (newSearBurner) => {
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
      type: 'changeGrillTypes',
      payload: newGrillType,
    });
  };

  const handleStandTypeChanged = (newStandType) => {
    dispatch({
      type: 'changeStandTypes',
      payload: newStandType,
    });
  };
  return html`<div
      class="d-flex justify-content-between align-items-center label-input-wrapper py-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label mb-3">
        Grill Type
      </h3>
      <div
        class="d-flex text-sm-left text-xl-right justify-content-center justify-content-lg-between perfect-grill-selector-input flex-wrap"
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
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label mb-3">
        Brand
      </h3>
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
      class="d-flex justify-content-between align-items-center label-input-wrapper pt-5 pb-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label mb-5">
        Price Range
      </h3>
      <div
        class="d-flex flex-wrap text-right justify-content-end perfect-grill-selector-input"
      >
        ${PerfectGrillPriceRangeSelector({
          currentPriceRange,
          priceRangeMinAndMax,
          handlePriceRangeChanged,
        })}
      </div>
    </div>
    <div
      class="d-flex justify-content-between align-items-center label-input-wrapper py-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label mb-5">
        Grill Cooking Area <br />
        <small>(# of Burgers)</small>
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
    <div
      class="d-flex justify-content-between align-items-center label-input-wrapper py-3"
    >
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label mb-3">
        Availability
      </h3>
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
      <h3 class="text-sm-left text-xl-right perfect-grill-selector-label mb-3">
        Key Features
      </h3>
      <div
        class="d-flex text-right justify-content-start perfect-grill-selector-input flex-wrap"
      >
        ${PerfectGrillKeyFeaturesSelector({
          sideBurner,
          searBurner,
          rearRotisserie,
          selectedGrillTypes,
          selectedStandTypes,
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
