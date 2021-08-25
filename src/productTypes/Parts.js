import { arrayIncludesItem } from '../shared/helpers';
import ProductType from './ProductType';

class Parts extends ProductType {
  constructor(state) {
    super('Parts', state);
  }

  static reducer(previousState, action) {
    const stateFromSuper = super.reducer(previousState, action);
    switch (action.type) {
      case 'changePartTypes': {
        return {
          ...stateFromSuper,
          selectedPartsType: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeMaterials': {
        return {
          ...stateFromSuper,
          selectedMaterials: action.payload,
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
      selectedPartsType: initialValueFilterKeyPairs?.selectedPartsType ?? [],
      selectedMaterials: initialValueFilterKeyPairs?.selectedMaterial ?? [],
    };
    return { ...stateFromSuper, ...typeState };
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    const otherTag = this.state?.selectedPartsType?.[0]
      ? `dtm_parts-type_${this.state.selectedPartsType[0]}`
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
      partsType:
        product.tags
          ?.find((tag) => tag.includes('dtm_parts-type_'))
          ?.replace('dtm_parts-type_', '') ?? null,
      material:
        product.tags
          ?.find((tag) => tag.includes('dtm_parts-type_'))
          ?.replace('dtm_parts-type_', '') ?? null,
    };
    return transformedProduct;
  }

  transformProductFromThemeQuery(product) {
    const transformedProduct = {
      ...super.transformProductFromThemeQuery(product),
      partsType:
        product.tags
          ?.find((tag) => tag.includes('dtm_parts-type_'))
          ?.replace('dtm_parts-type_', '') ?? null,
      material:
        product.tags
          ?.find((tag) => tag.includes('dtm_parts-type_'))
          ?.replace('dtm_parts-type_', '') ?? null,
    };
    return transformedProduct;
  }

  createFiltersFromState() {
    const { selectedPartsType, selectedMaterials } = this.state;
    const st = this.state.searchString?.trim() ?? '';
    const typeFilters =
      st !== ''
        ? {}
        : {
            partsType: (product) => {
              if (selectedPartsType.length === 0) {
                return true;
              }
              if (!product?.partsType) {
                return false;
              }
              // return !!selectedPartsType.includes(product.partsType);
              return arrayIncludesItem(selectedPartsType, product.partsType);
            },
            material: (product) => {
              if (selectedMaterials.length === 0) {
                return true;
              }
              if (!product?.material) {
                return false;
              }
              // return selectedMaterials.includes(product.material);
              return arrayIncludesItem(selectedMaterials, product.material);
            },
          };

    return {
      ...super.createFiltersFromState(),
      ...typeFilters,
    };
  }
}

export default Parts;
