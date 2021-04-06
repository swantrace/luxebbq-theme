import ProductType from './ProductType';

class Furniture extends ProductType {
  constructor(rawInitialState) {
    super('Furniture', rawInitialState);
  }

  reducer(previousState, action) {
    const stateFromSuper = super.reducer(previousState, action);
    switch (action.type) {
      case 'changeFurnitureTypes': {
        return {
          ...stateFromSuper,
          selectedFurnitureTypes: action.payload,
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
      selectedFurnitureTypes:
        initialValueFilterKeyPairs?.selectedFurnitureTypes ?? [],
    };
    return { ...stateFromSuper, ...typeState };
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    const otherTag = this.state?.selectedFurnitureTypes?.[0]
      ? `dtm_furniture-type_${this.state.selectedFurnitureTypes[0]}`
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
      furnitureType:
        product.tags
          ?.find((tag) => tag.includes('dtm_furniture-type_'))
          ?.replace('dtm_furniture-type_', '') ?? null,
    };
    return transformedProduct;
  }

  createFiltersFromState() {
    const { selectedFurnitureTypes } = this.state;
    return {
      ...super.createFiltersFromState(),
      furnitureType: (product) => {
        if (selectedFurnitureTypes.length === 0) {
          return true;
        }
        if (!product?.furnitureType) {
          return false;
        }
        return !!selectedFurnitureTypes.includes(product.furnitureType);
      },
    };
  }
}

export default Furniture;
