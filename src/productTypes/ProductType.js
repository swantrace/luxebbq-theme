import slugify from 'slugify';
import chunk from 'lodash.chunk';
import { useReducer } from '@apollo-elements/haunted';
import {
  addQuotesIfNecessary,
  addslashes,
  getDisplayedPageNumbers,
  getSortValueFromDefaultSortBy,
  GET_PRODUCTS,
  productsSorter,
  queryAllProductsThroughGraphqlCreator,
} from '../shared/helpers';

class ProductType {
  constructor(name, rawInitialState) {
    if (new.target === ProductType) {
      throw new Error('You cannot initiated an abstract class');
    }
    const initialState = this.transformInitialState(rawInitialState);
    const [state, dispatch] = useReducer(this.reducer, initialState);
    this.name = name;
    this.state = state;
    this.dispatch = dispatch;
    this.queryAllProducts = this.queryAllProducts.bind(this);
    this.queryFirstPageProducts = this.queryFirstPageProducts.bind(this);
    this.getFilteredSortedProducts = this.getFilteredSortedProducts.bind(this);
    this.getFilteredSortedProductsOfCurrentPage =
      this.getFilteredSortedProductsOfCurrentPage.bind(this);
    this.getPageCount = this.getPageCount.bind(this);
    this.getDisplayedPageNumbers = this.getDisplayedPageNumbers.bind(this);
  }

  reducer(previousState, action) {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function: reducer directly in ${this}`
      );
    }
    switch (action.type) {
      case 'changeBrands': {
        return {
          ...previousState,
          selectedBrands: action.payload,
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
      case 'changeColours': {
        return {
          ...previousState,
          selectedColours: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeSortValue': {
        return {
          ...previousState,
          sortValue: action.payload,
          pageNumber: 1,
        };
      }
      case 'setAllProducts': {
        return {
          ...previousState,
          allProducts: action.payload,
        };
      }
      case 'setFetchIsFinished': {
        return {
          ...previousState,
          fetchIsFinished: action.payload,
        };
      }
      case 'changeProductsPerPage': {
        return {
          ...previousState,
          productsPerPage: action.payload,
          pageNumber: 1,
        };
      }
      case 'changePageNumber': {
        return {
          ...previousState,
          pageNumber: action.payload,
        };
      }
      case 'changeViewMode': {
        return {
          ...previousState,
          viewMode: action.payload,
        };
      }
      case 'changeOnlineStoreOnly': {
        return {
          ...previousState,
          onlineStoreOnly: action.payload,
        };
      }
      case 'changeClearance': {
        return {
          ...previousState,
          clearance: action.payload,
        };
      }
      case 'changeAvailability': {
        return {
          ...previousState,
          availability: action.payload,
        };
      }
      default:
        return { ...previousState };
    }
  }

  transformInitialState(raw) {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function: tranformInitialState directly in ${this}`
      );
    }
    const { defaultSortBy, initialValueFilterKeyPairs, ...rest } = raw;
    return {
      allProducts: [],
      sortValue: getSortValueFromDefaultSortBy(defaultSortBy),
      fetchIsFinished: false,
      productsPerPage: 24,
      pageNumber: 1,
      viewMode: 'grid',
      onlineStoreOnly: false,
      availability: ['true', 'false'],
      searchString: initialValueFilterKeyPairs?.searchString ?? '',
      selectedBrands: initialValueFilterKeyPairs?.selectedBrands ?? [],
      selectedColours: initialValueFilterKeyPairs?.selectedColours ?? [],
      clearance: false,
      initialValueFilterKeyPairs,
      ...rest,
    };
  }

  async queryAllProducts() {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    let products = [];
    try {
      const productsForCurrentProductType = JSON.parse(
        window.sessionStorage.getItem(slugify(this.name, { lower: true }))
      );
      products = [...productsForCurrentProductType];
    } catch (err) {
      const rawProducts = await queryAllProductsThroughGraphqlCreator({
        searchString: '',
        productTypes: [this.name],
      })();
      products = rawProducts.map(this.transformProductFromQuery);
      if (
        JSON.stringify(products).length +
          JSON.stringify(window.sessionStorage).length <
        5000000
      ) {
        window.sessionStorage.setItem(
          slugify(this.name, { lower: true }),
          JSON.stringify(products)
        );
      }
    }
    // console.log(
    //   'this.transformProductFromQuery',
    //   this.transformProductFromQuery
    // );
    return products;
  }

  async queryFirstPageProducts() {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    const variables = this.transformStateToFirstPageGraphqlRequestVariables();
    const rawProducts = await window.__APOLLO_CLIENT__.query({
      query: GET_PRODUCTS,
      variables,
    });
    return (
      rawProducts?.data?.products?.edges?.map(({ node }) =>
        this.transformProductFromQuery(node)
      ) ?? []
    );
  }

  getGraphqlQueryString({
    tagsAndBrands = [],
    priceRange = [0, 100000],
    otherTag = '',
  } = {}) {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    const productTypePart = `product_type:${addslashes(
      addQuotesIfNecessary(this.name)
    )}`;
    const tagsAndBrandsPart = tagsAndBrands
      .map(([tag, brands]) => {
        const productBrandPart = `${brands
          .map((brand) => `vendor:${addslashes(addQuotesIfNecessary(brand))}`)
          .join(' OR ')}`;
        if (productBrandPart === '') {
          return `tag:${addslashes(addQuotesIfNecessary(tag))}`;
        }
        return `(tag:${addslashes(
          addQuotesIfNecessary(tag)
        )} AND ${productBrandPart})`;
      })
      .join(' OR ');
    const pricePart = `(variants.price:>${priceRange[0]} AND variants.price:<${priceRange[1]})`;
    let otherTagPart = '';
    if (typeof otherTag === 'string') {
      otherTagPart =
        otherTag === ''
          ? ''
          : `(tag:${addslashes(addQuotesIfNecessary(otherTag))})`;
    } else if (Array.isArray(otherTag)) {
      otherTagPart = `${otherTag
        .map((tag) => `tag:${addslashes(addQuotesIfNecessary(tag))}`)
        .join(' OR ')}`;
    }

    return `${productTypePart} ${tagsAndBrandsPart} ${pricePart} ${otherTagPart}`;
  }

  transformStateToFirstPageGraphqlRequestVariables() {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    return {};
  }

  transformProductFromQuery(product) {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    const {
      availableForSale,
      totalInventory,
      onlineStoreUrl,
      description,
      handle,
      images,
      priceRange,
      tags,
      title,
      vendor,
      productType,
    } = product;

    return {
      availableForSale,
      inStock: totalInventory > 0,
      totalInventory,
      title,
      handle,
      images:
        images?.edges?.map(({ node: image }) => ({
          imageAltText: image?.altText ?? null,
          imageOriginalSrc: image?.originalSrc ?? null,
          imageTransformedSrc: image?.transformedSrc ?? null,
        })) ?? [],
      maxVariantPrice: Number(priceRange?.maxVariantPrice?.amount),
      minVariantPrice: Number(priceRange?.minVariantPrice?.amount),
      clearance: !!tags?.includes('dtm_clearance'),
      tags,
      description,
      vendor,
      brand: vendor,
      productType,
      onlineStoreUrl,
      colour:
        tags
          ?.find((tag) => tag.includes('dtm_product-colour_'))
          ?.replace('dtm_product-colour_', '') ?? null,
    };
  }

  createFiltersFromState() {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }

    return {
      brand: (product) => {
        if (!(this.state?.selectedBrands ?? false)) {
          return true;
        }
        if (this.state.selectedBrands.length === 0) {
          return true;
        }
        return !!this.state.selectedBrands.includes(product.brand);
      },
      searchString: (product) => {
        if (this.state.searchString.length === 0) {
          return true;
        }
        if (
          this.state.searchString.length > 0 &&
          (product.title
            .toLowerCase()
            .includes(this.state.searchString.toLowerCase()) ||
            product.tags
              .join(' ')
              .toLowerCase()
              .includes(this.state.searchString.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(this.state.searchString.toLowerCase()))
        ) {
          return true;
        }
        return false;
      },
      colour: (product) => {
        if (!(this.state?.selectedColours ?? false)) {
          return true;
        }
        if (this.state.selectedColours.length === 0) {
          return true;
        }
        return !!this.state.selectedColours.includes(product.colour);
      },
      onlineStoreOnly: (product) => {
        if (!(this.state?.onlineStoreOnly ?? false)) {
          return true;
        }
        return !!product.onlineStoreUrl;
      },
      clearance: (product) => {
        if (!(this.state?.clearance ?? false)) {
          return true;
        }
        return !!product.clearance;
      },
      availability: (product) => {
        if (
          !this.state?.availability ||
          this.state?.availability?.length === 0
        ) {
          return true;
        }
        if (
          this.state?.availability?.includes('true') &&
          this.state?.availability?.includes('false')
        ) {
          return true;
        }
        if (this.state?.availability?.includes('true') && product?.inStock) {
          return true;
        }
        if (this.state?.availability?.includes('false') && !product?.inStock) {
          return true;
        }
        return false;
      },
    };
  }

  createSorterFromState() {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    return productsSorter(this.state);
  }

  getFilteredSortedProducts() {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    const filters = this.createFiltersFromState();
    const sorter = this.createSorterFromState();
    let products = [...(this.state?.allProducts ?? [])];
    Object.values(filters).forEach((f) => {
      products = products.filter(f);
    });
    products.sort(sorter);
    return products;
  }

  getFilteredSortedProductsOfCurrentPage() {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    const pageNumber = this.state?.pageNumber ?? 1;
    const productsPerPage = this.state?.productsPerPage ?? 24;
    const allProducts = this.getFilteredSortedProducts();
    const productsInChunks = chunk(allProducts, productsPerPage);
    return productsInChunks[pageNumber - 1] ?? [];
  }

  getPageCount() {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    const productsPerPage = this.state?.productsPerPage ?? 24;
    const allProducts = this.getFilteredSortedProducts();
    const productsInChunks = chunk(allProducts, productsPerPage);
    return productsInChunks.length;
  }

  getDisplayedPageNumbers() {
    if (
      this instanceof ProductType &&
      this.constructor.name === 'ProductType'
    ) {
      return new Error(
        `You cannot use an abstract function directly in ${this}`
      );
    }
    const pageCount = this.getPageCount();
    const pageNumber = this.state?.pageNumber ?? 1;
    return getDisplayedPageNumbers(pageCount, pageNumber);
  }
}

export default ProductType;
