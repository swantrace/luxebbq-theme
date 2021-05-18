import { arrayIncludesItem } from '../shared/helpers';
import ProductType from './ProductType';

class GrillingAccessories extends ProductType {
  constructor(rawInitialState) {
    super('Grilling Accessories', rawInitialState);
  }

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
      case 'changeGrillingAccessoriesTypes': {
        return {
          ...stateFromSuper,
          selectedGrillingAccessoriesTypes: action.payload,
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
      selectedGrillingAccessoriesTypes:
        initialValueFilterKeyPairs?.selectedGrillingAccessoriesTypes ?? [],
    };
    return { ...stateFromSuper, ...typeState };
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    const tagsAndBrands = this.state?.selectedCookTypesAndBrands.map(
      ([cookType, brands]) => [`dtm_cook-type_${cookType}`, brands]
    );
    const otherTag = this.state?.selectedGrillingAccessoriesTypes?.[0]
      ? `dtm_grilling-accessories-type_${this.state.selectedGrillingAccessoriesTypes[0]}`
      : '';
    return {
      first: this.state?.productsPerPage ?? 24,
      query: `${this.getGraphqlQueryString({ tagsAndBrands, otherTag })}`,
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
      grillingAccessoriesType:
        product.tags
          ?.find((tag) => tag.includes('dtm_grilling-accessories-type_'))
          ?.replace('dtm_grilling-accessories-type_', '') ?? null,
    };
    return transformedProduct;
  }

  createFiltersFromState() {
    console.log(this.state);
    const {
      selectedGrillingAccessoriesTypes,
      selectedCookTypesAndBrands,
    } = this.state;
    const st = this.state.searchString?.trim() ?? '';
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
            grillingAccessoriesType: (product) => {
              if (selectedGrillingAccessoriesTypes.length === 0) {
                return true;
              }
              if (!product?.grillingAccessoriesType) {
                return false;
              }

              // return !!selectedGrillingAccessoriesTypes.includes(
              //   product.grillingAccessoriesType
              // );
              return arrayIncludesItem(
                selectedGrillingAccessoriesTypes,
                product.grillingAccessoriesType
              );
            },
          };
    return {
      ...super.createFiltersFromState(),
      ...typeFilters,
    };
  }
}

export default GrillingAccessories;
