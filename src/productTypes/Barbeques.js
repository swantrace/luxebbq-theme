import {
  arrayIncludesItem,
  hasIntersectionBetweenTwoRanges,
} from '../shared/helpers';
import ProductType from './ProductType';

class Barbeques extends ProductType {
  constructor(rawInitialState) {
    super('Barbeques', rawInitialState);
  }

  // eslint-disable-next-line class-methods-use-this
  reducer(previousState, action) {
    const stateFromSuper = super.reducer(previousState, action);
    switch (action.type) {
      case 'changeCookTypesAndBrands': {
        return {
          ...stateFromSuper,
          selectedCookTypesAndBrands: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeGrillCookingAreaRange': {
        return {
          ...stateFromSuper,
          currentGrillCookingAreaRange: action.payload,
          pageNumber: 1,
        };
      }
      case 'changePriceRange': {
        return {
          ...previousState,
          currentPriceRange: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeStandTypes': {
        return {
          ...stateFromSuper,
          selectedStandTypes: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeGrillTypes': {
        return {
          ...stateFromSuper,
          selectedGrillTypes: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeSideBurner': {
        return {
          ...stateFromSuper,
          sideBurner: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeSearBurner': {
        return {
          ...stateFromSuper,
          searBurner: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeRearRotisserie': {
        return {
          ...stateFromSuper,
          rearRotisserie: action.payload,
          pageNumber: 1,
        };
      }
      default: {
        return stateFromSuper;
      }
    }
  }

  transformInitialState(raw) {
    const { initialValueFilterKeyPairs, ...stateFromSuper } =
      super.transformInitialState(raw);

    const typeState = {
      selectedCookTypesAndBrands:
        initialValueFilterKeyPairs?.selectedCookTypesAndBrands ?? [],
      selectedStandTypes: initialValueFilterKeyPairs?.selectedStandTypes ?? [],
      selectedGrillTypes: initialValueFilterKeyPairs?.selectedGrillTypes ?? [],
      currentPriceRange: initialValueFilterKeyPairs?.currentPriceRange ?? [
        0, 6500,
      ],
      currentGrillCookingAreaRange:
        initialValueFilterKeyPairs?.currentGrillCookingAreaRange ?? [4, 20],
      sideBurner: initialValueFilterKeyPairs?.sideBurner ?? false,
      searBurner: initialValueFilterKeyPairs?.searBurner ?? false,
      rearRotisserie: initialValueFilterKeyPairs?.rearRotisserie ?? false,
    };
    return { ...stateFromSuper, ...typeState };
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    const tagsAndBrands = this.state?.selectedCookTypesAndBrands.map(
      ([cookType, brands]) => [`dtm_cook-type_${cookType}`, brands]
    );
    const priceRange = this.state?.currentPriceRange;
    // eslint-disable-next-line no-nested-ternary
    const otherTag = this.state?.selectedStandTypes?.[0]
      ? `dtm_stand-type_${this.state.selectedStandTypes[0]}`
      : this.state?.clearance
      ? `dtm_clearance`
      : '';

    return {
      first: this.state?.productsPerPage ?? 24,
      query: `${this.getGraphqlQueryString({
        tagsAndBrands,
        priceRange,
        otherTag,
      })}`,
      reverse: this.state?.sortValue?.includes('DESC') ?? false,
      sortKey: this.state?.sortValue?.replace('_DESC', '').replace('_ASC', ''),
    };
  }

  transformProductFromQuery(product) {
    const transformedProduct = {
      ...super.transformProductFromQuery(product),
      cookTypes:
        product.tags
          ?.filter((tag) => tag.includes('dtm_cook-type_'))
          ?.map((t) => t?.replace('dtm_cook-type_', '')) ?? [],
      grillCookingArea:
        product.tags
          ?.find((tag) => tag.includes('dtm_grill-cooking-area'))
          ?.replace('dtm_grill-cooking-area_', '') ?? null,
      sideBurner: !!product.tags?.includes('dtm_side-burner'),
      searBurner: !!product.tags?.includes('dtm_sear-burner'),
      rearRotisserie: !!product.tags?.includes('dtm_rear-rotisserie'),
      grillType:
        product.tags
          ?.find((tag) => tag.includes('dtm_grill-type'))
          ?.replace('dtm_grill-type_', '') ?? null,
      standType:
        product.tags
          ?.find((tag) => tag.includes('dtm_stand-type'))
          ?.replace('dtm_stand-type_', '') ?? null,
    };
    return transformedProduct;
  }

  createFiltersFromState() {
    const {
      searchString,
      selectedCookTypesAndBrands,
      currentPriceRange,
      currentGrillCookingAreaRange,
      sideBurner,
      searBurner,
      rearRotisserie,
      selectedGrillTypes,
      selectedStandTypes,
    } = this.state;
    const st = searchString?.trim() ?? '';
    const typeFilters =
      st !== ''
        ? {}
        : {
            cookTypesAndBrands: (product) => {
              if (st.length > 0) {
                return true;
              }
              const cookTypes = selectedCookTypesAndBrands.map(
                ([cookType]) => cookType
              );
              if (cookTypes.length === 0) {
                return true;
              }

              if (
                !product?.cookTypes ||
                (product?.cookTypes?.length ?? 0) === 0
              ) {
                return false;
              }
              const currentProductCookTypes = cookTypes.filter((t) =>
                product.cookTypes.includes(t)
              );

              if (!currentProductCookTypes.length === 0) {
                return false;
              }

              const booleanArr = currentProductCookTypes.map(
                (currentProductCookType) => {
                  const brands =
                    selectedCookTypesAndBrands.find(
                      ([cookType]) => cookType === currentProductCookType
                    )?.[1] ?? [];
                  if (brands.length === 0) {
                    return true;
                  }
                  return !!brands.includes(product.vendor);
                }
              );

              if (booleanArr.find((a) => a === true)) {
                return true;
              }
              return false;
            },
            price: (product) => {
              if (st.length > 0) {
                return true;
              }
              const productPriceRange = [
                product.minVariantPrice,
                product.maxVariantPrice,
              ];
              if (
                hasIntersectionBetweenTwoRanges(
                  productPriceRange,
                  currentPriceRange
                )
              ) {
                return true;
              }
              return false;
            },
            grillCookingArea: (product) => {
              if (st.length > 0) {
                return true;
              }
              const [minGrillCookingArea, maxGrillCookingArea] =
                currentGrillCookingAreaRange;
              if (!product?.grillCookingArea) {
                return true;
              }
              if (
                product?.grillCookingArea >= minGrillCookingArea &&
                product?.grillCookingArea <= maxGrillCookingArea
              ) {
                return true;
              }
              return false;
            },
            sideBurner: (product) => {
              if (!sideBurner) {
                return true;
              }
              if (sideBurner === product?.sideBurner) {
                return true;
              }
              return false;
            },
            searBurner: (product) => {
              if (!searBurner) {
                return true;
              }
              if (searBurner === product?.searBurner) {
                return true;
              }
              return false;
            },
            rearRotisserie: (product) => {
              if (!rearRotisserie) {
                return true;
              }
              if (rearRotisserie === product?.rearRotisserie) {
                return true;
              }
              return false;
            },
            grillType: (product) => {
              if ((selectedGrillTypes?.length ?? 0) === 0) {
                return true;
              }
              // return selectedGrillTypes?.includes(product?.grillType);
              return arrayIncludesItem(selectedGrillTypes, product.grillType);
            },
            standType: (product) => {
              if ((selectedStandTypes?.length ?? 0) === 0) {
                return true;
              }
              // return selectedStandTypes?.includes(product?.standType);
              return arrayIncludesItem(selectedStandTypes, product.standType);
            },
          };
    return {
      ...super.createFiltersFromState(),
      ...typeFilters,
    };
  }
}

export default Barbeques;
