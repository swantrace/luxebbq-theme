import { arrayIncludesItem } from '../shared/helpers';
import ProductType from './ProductType';

class Fuel extends ProductType {
  constructor(state) {
    super('Fuel', state);
  }

  static reducer(previousState, action) {
    const stateFromSuper = super.reducer(previousState, action);
    switch (action.type) {
      case 'changeFuelTypes': {
        return {
          ...stateFromSuper,
          selectedFuelTypes: action.payload,
          pageNumber: 1,
        };
      }
      default: {
        return stateFromSuper;
      }
    }
  }

  static transformInitialState(raw) {
    const {
      initialValueFilterKeyPairs,
      ...stateFromSuper
    } = super.transformInitialState(raw);

    const typeState = {
      selectedFuelTypes: initialValueFilterKeyPairs?.selectedFuelTypes ?? [],
    };
    return { ...stateFromSuper, ...typeState };
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    const otherTag = this.state?.selectedFuelTypes?.[0]
      ? `dtm_fuel-type_${this.state.selectedFuelTypes[0]}`
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
      fuelType:
        product.tags
          ?.find((tag) => tag.includes('dtm_fuel-type_'))
          ?.replace('dtm_fuel-type_', '') ?? null,
    };
    return transformedProduct;
  }

  transformProductFromThemeQuery(product) {
    const transformedProduct = {
      ...super.transformProductFromThemeQuery(product),
      fuelType:
        product.tags
          ?.find((tag) => tag.includes('dtm_fuel-type_'))
          ?.replace('dtm_fuel-type_', '') ?? null,
    };
    return transformedProduct;
  }

  createFiltersFromState() {
    const { selectedFuelTypes } = this.state;
    const st = this.state.searchString?.trim() ?? '';
    const typeFilters =
      st !== ''
        ? {}
        : {
            fuelType: (product) => {
              if (selectedFuelTypes.length === 0) {
                return true;
              }
              if (!product?.fuelType) {
                return false;
              }
              // return !!selectedFuelTypes.includes(product.fuelType);
              return arrayIncludesItem(selectedFuelTypes, product.fuelType);
            },
          };
    return {
      ...super.createFiltersFromState(),
      ...typeFilters,
    };
  }
}

export default Fuel;
