import ProductType from './ProductType';

class DrinkwareAndCoolers extends ProductType {
  constructor(rawInitialState) {
    super('Drinkware & Coolers', rawInitialState);
  }

  reducer(previousState, action) {
    const stateFromSuper = super.reducer(previousState, action);
    switch (action.type) {
      case 'changeDrinkwareAndCoolersTypes': {
        return {
          ...stateFromSuper,
          selectedDrinkwareAndCoolersTypes: action.payload,
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
      selectedDrinkwareAndCoolersTypes:
        initialValueFilterKeyPairs?.selectedDrinkwareAndCoolersTypes ?? [],
    };
    return { ...stateFromSuper, ...typeState };
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    const otherTag = this.state?.selectedDrinkwareAndCoolersTypes?.[0]
      ? `dtm_drinkware-coolers-type_${this.state.selectedDrinkwareAndCoolersTypes[0]}`
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
      drinkwareAndCoolersType:
        product.tags
          ?.find((tag) => tag.includes('dtm_drinkware-coolers-type_'))
          ?.replace('dtm_drinkware-coolers-type_', '') ?? null,
    };
    return transformedProduct;
  }

  createFiltersFromState() {
    const { selectedDrinkwareAndCoolersTypes } = this.state;
    const st = this.state.searchString?.trim() ?? '';
    const typeFilters =
      st !== ''
        ? {}
        : {
            drinkwareAndCoolersType: (product) => {
              if (selectedDrinkwareAndCoolersTypes.length === 0) {
                return true;
              }
              if (!product?.drinkwareAndCoolersType) {
                return false;
              }
              return !!selectedDrinkwareAndCoolersTypes.includes(
                product.drinkwareAndCoolersType
              );
            },
          };
    return {
      ...super.createFiltersFromState(),
      ...typeFilters,
    };
  }
}

export default DrinkwareAndCoolers;
