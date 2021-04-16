import ProductType from './ProductType';

class GrillingAccessories extends ProductType {
  constructor(rawInitialState) {
    super('Grilling Accessories', rawInitialState);
  }

  reducer(previousState, action) {
    const stateFromSuper = super.reducer(previousState, action);
    switch (action.type) {
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
      selectedGrillingAccessoriesTypes:
        initialValueFilterKeyPairs?.selectedGrillingAccessoriesTypes ?? [],
    };
    return { ...stateFromSuper, ...typeState };
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    const otherTag = this.state?.selectedGrillingAccessoriesTypes?.[0]
      ? `dtm_grilling-accessories-type_${this.state.selectedGrillingAccessoriesTypes[0]}`
      : '';
    return {
      first: this.state?.productsPerPage ?? 24,
      query: `${this.getGraphqlQueryString({ otherTag })}`,
      reverse: this.state?.sortValue?.includes('DESC') ?? false,
      sortKey: this.state?.sortValue?.replace('_DESC', '').replace('_ASC', ''),
    };
  }

  transformProductFromQuery(product) {
    const transformedProduct = {
      ...super.transformProductFromQuery(product),
      grillingAccessoriesType:
        product.tags
          ?.find((tag) => tag.includes('placeholder'))
          ?.replace('placeholder', '') ?? null,
    };
    return transformedProduct;
  }

  createFiltersFromState() {
    console.log(this.state);
    const { selectedGrillingAccessoriesTypes } = this.state;
    const st = this.state.searchString?.trim() ?? '';
    const typeFilters =
      st !== ''
        ? {}
        : {
            grillingAccessoriesType: (product) => {
              if (selectedGrillingAccessoriesTypes.length === 0) {
                return true;
              }
              if (!product?.grillingAccessoriesType) {
                return false;
              }

              return !!selectedGrillingAccessoriesTypes.includes(
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
