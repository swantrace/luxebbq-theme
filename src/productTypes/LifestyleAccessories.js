import ProductType from './ProductType';

class LifestyleAccessories extends ProductType {
  constructor(rawInitialState) {
    super('Lifestyle Accessories', rawInitialState);
  }

  reducer(previousState, action) {
    const stateFromSuper = super.reducer(previousState, action);
    switch (action.type) {
      case 'changeLifestyleAccessoriesTypes': {
        return {
          ...stateFromSuper,
          selectedLifestyleAccessoriesTypes: action.payload,
        };
      }
      case 'changeColours': {
        return {
          ...stateFromSuper,
          selectedColours: action.payload,
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
      selectedLifestyleAccessoriesTypes:
        initialValueFilterKeyPairs?.selectedLifestyleAccessoriesTypes ?? [],
      selectedColours: initialValueFilterKeyPairs?.selectedColours ?? [],
    };
    return { ...stateFromSuper, ...typeState };
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    const otherTag = this.state
      ?.SelectedlifestyleAccessoriesTypesAndBrands?.[0]?.[0]
      ? `dtm_lifestyle-accessories_${this.state?.SelectedlifestyleAccessoriesTypesAndBrands?.[0]?.[0]}`
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
      lifestyleAccessoriesType:
        product.tags
          ?.find((tag) => tag.includes('dtm_lifestyle-accessories-type_'))
          ?.replace('dtm_lifestyle-accessories-type_', '') ?? null,
      colour: product.tags
        ?.find((tag) => tag.includes('dtm_product-colour_'))
        ?.replace('dtm_product-colour_', ''),
    };
    return transformedProduct;
  }

  createFiltersFromState() {
    const { selectedLifestyleAccessoriesTypes, selectedColours } = this.state;
    return {
      ...super.createFiltersFromState(),
      lifestyleAccessoriesType: (product) => {
        if (selectedLifestyleAccessoriesTypes.length === 0) {
          return true;
        }
        if (!product?.lifestyleAccessoriesType) {
          return false;
        }
        return !!selectedLifestyleAccessoriesTypes?.includes(
          product.lifestyleAccessoriesType
        );
      },
      colour: (product) => {
        if (selectedColours.length === 0) {
          return true;
        }
        if (!product?.colour) {
          return false;
        }
        return !!selectedColours?.includes(product.colour);
      },
    };
  }
}

export default LifestyleAccessories;
