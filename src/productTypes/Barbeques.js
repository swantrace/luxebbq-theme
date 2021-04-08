import { hasIntersectionBetweenTwoRanges } from '../helpers';
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
      case 'changeSearchString': {
        return {
          ...previousState,
          searchString: action.payload,
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
    const {
      initialValueFilterKeyPairs,
      ...stateFromSuper
    } = super.transformInitialState(raw);

    const typeState = {
      selectedCookTypesAndBrands:
        initialValueFilterKeyPairs?.selectedCookTypesAndBrands ?? [],
      selectedStandTypes: initialValueFilterKeyPairs?.selectedStandTypes ?? [],
      selectedGrillTypes: initialValueFilterKeyPairs?.selectedGrillTypes ?? [],
      currentPriceRange: initialValueFilterKeyPairs?.currentPriceRange ?? [
        1000,
        5000,
      ],
      currentGrillCookingAreaRange: initialValueFilterKeyPairs?.currentGrillCookingAreaRange ?? [
        4,
        6,
      ],
      searchString: initialValueFilterKeyPairs?.searchString ?? '',
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
      cookType:
        product.tags
          ?.find((tag) => tag.includes('dtm_cook-type_'))
          ?.replace('dtm_cook-type_', '') ?? null,
      grillCookingArea:
        product.tags
          ?.find((tag) => tag.includes('dtm_grill-cooking-area'))
          ?.replace('dtm_grill-cooking-area_', '') ?? null,
      sideBurner: !!product.tags?.includes('dtm_side-burner'),
      searBurner: !!product.tags?.includes('dtm_sear-burner'),
      rearRotisserie: !!product.tags?.includes('dtm_rear-rotisserie'),
      grillType: product.tags
        ?.find((tag) => tag.includes('dtm_grill-type'))
        ?.replace('dtm_grill-type_', ''),
      standType: product.tags
        ?.find((tag) => tag.includes('dtm_stand-type'))
        ?.replace('dtm_stand-type_', ''),
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
    return {
      ...super.createFiltersFromState(),
      searchString: (product) => {
        if (st.length === 0) {
          return true;
        }
        if (
          st.length > 0 &&
          (product.title.toLowerCase().includes(st.toLowerCase()) ||
            product.tags.join(' ').toLowerCase().includes(st.toLowerCase()) ||
            product.description.toLowerCase().includes(st.toLowerCase()))
        ) {
          return true;
        }
        return false;
      },
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

        if (!product?.cookType) {
          return false;
        }
        const currentProductCookType = cookTypes.find(
          (t) => product.cookType === t
        );
        if (!currentProductCookType) {
          return false;
        }

        const brands =
          selectedCookTypesAndBrands.find(
            ([cookType]) => cookType === currentProductCookType
          )?.[1] ?? [];

        if (brands.length === 0) {
          return true;
        }
        return !!brands.includes(product.vendor);
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
          hasIntersectionBetweenTwoRanges(productPriceRange, currentPriceRange)
        ) {
          return true;
        }
        return false;
      },
      grillCookingArea: (product) => {
        if (st.length > 0) {
          return true;
        }
        const [
          minGrillCookingArea,
          maxGrillCookingArea,
        ] = currentGrillCookingAreaRange;
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
        return selectedGrillTypes?.includes(product?.grillType);
      },
      standType: (product) => {
        if ((selectedStandTypes?.length ?? 0) === 0) {
          return true;
        }
        return selectedStandTypes?.includes(product?.standType);
      },
    };
  }
}

export default Barbeques;