import { arrayIncludesItem } from '../shared/helpers';
import ProductType from './ProductType';

class RubsAndSauces extends ProductType {
  constructor(rawInitialState) {
    super('Sauces, Rubs & Spices', rawInitialState);
  }

  reducer(previousState, action) {
    const stateFromSuper = super.reducer(previousState, action);
    switch (action.type) {
      case 'changeFoodTypes': {
        return {
          ...stateFromSuper,
          selectedFoodTypes: action.payload,
        };
      }
      case 'changeSelectedSpecialtyFoods': {
        return {
          ...stateFromSuper,
          selectedSpecialtyFoods: action.payload,
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
      selectedFoodTypes: initialValueFilterKeyPairs?.selectedFoodTypes ?? [],
      selectedSpecialtyFoods:
        initialValueFilterKeyPairs?.selectedSpecialtyFoods ?? [],
    };
    return { ...stateFromSuper, ...typeState };
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    const otherTag = this.state?.selectedFoodTypes?.[0]
      ? `dtm_food-type_${this.state.selectedFoodTypes[0]}`
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
      foodType:
        product.tags
          ?.find((tag) => tag.includes('dtm_food-type_'))
          ?.replace('dtm_food-type_', '') ?? null,
      specialtyFoods:
        product.tags
          ?.find((tag) => tag.includes('dtm_specialty-foods_'))
          ?.replace('dtm_specialty-foods_', '') ?? null,
    };
    return transformedProduct;
  }

  createFiltersFromState() {
    const { selectedFoodTypes, selectedSpecialtyFoods } = this.state;
    const st = this.state.searchString?.trim() ?? '';
    const typeFilters =
      st !== ''
        ? {}
        : {
            foodType: (product) => {
              if (selectedFoodTypes.length === 0) {
                return true;
              }
              if (!product?.foodType) {
                return false;
              }
              // return !!selectedFoodTypes.includes(product.foodType);
              return arrayIncludesItem(selectedFoodTypes, product.foodType);
            },
            specialtyFoods: (product) => {
              if (selectedSpecialtyFoods.length === 0) {
                return true;
              }
              if (!product?.specialtyFoods) {
                return false;
              }
              // return !!selectedSpecialtyFoods.includes(product.specialtyFoods);
              return arrayIncludesItem(
                selectedSpecialtyFoods,
                product.specialtyFoods
              );
            },
          };

    return {
      ...super.createFiltersFromState(),
      ...typeFilters,
    };
  }
}

export default RubsAndSauces;
