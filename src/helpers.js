/* eslint-disable no-nested-ternary */
import chunk from 'lodash.chunk';
import { gql } from '@apollo/client/core';
import groupBy from 'lodash.groupby';

export const DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE = [1, 30000];
export const DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE = [1, 20];

export const GET_PRODUCTS = gql`
  query getProducts(
    $first: Int
    $after: String
    $query: String
    $reverse: Boolean
    $sortKey: ProductSortKeys
  ) {
    products(
      first: $first
      after: $after
      query: $query
      reverse: $reverse
      sortKey: $sortKey
    ) {
      edges {
        cursor
        node {
          id
          onlineStoreUrl
          handle
          title
          availableForSale
          productType
          vendor
          totalInventory
          images(first: 2) {
            edges {
              node {
                altText
                originalSrc
                transformedSrc(crop: CENTER, maxWidth: 340, maxHeight: 555)
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          tags
          description
        }
      }
    }
  }
`;

export const transformFunc = ({
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
}) => ({
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
  tags,
  description,
  vendor,
  productType,
  onlineStoreUrl,
});

// todo: transformFunc and filter for grill cooking area
export const barbequesTransformFunc = (rawProduct) => ({
  ...transformFunc(rawProduct),
  cookType:
    rawProduct.tags
      ?.find((tag) => tag.includes('dtm_cook-type_'))
      ?.replace('dtm_cook-type_', '') ?? null,
  grillCookingArea:
    rawProduct.tags
      ?.find((tag) => tag.includes('dtm_grill-cooking-area'))
      ?.replace('dtm_grill-cooking-area_', '') ?? null,
  sideBurner: !!rawProduct.tags?.includes('dtm_side-burner'),
  searBurner: !!rawProduct.tags?.includes('dtm_sear-burner'),
  rearRotisserie: !!rawProduct.tags?.includes('dtm_rear-rotisserie'),
  grillType: rawProduct.tags
    ?.find((tag) => tag.includes('dtm_grill-type'))
    ?.replace('dtm_grill-type_', ''),
  standType: rawProduct.tags
    ?.find((tag) => tag.includes('dtm_stand-type'))
    ?.replace('dtm_stand-type_', ''),
});

export const transformFuncCreator = (productType) => {
  switch (productType.toLowerCase()) {
    case 'barbeques':
      return barbequesTransformFunc;
    default:
      return transformFunc;
  }
};

export const addslashes = (str) =>
  `${str}`.replace(/([\\"'])/g, '\\$1').replace(/\0/g, '\\0');

export const removeKey = (obj, propToDelete) => {
  const { [propToDelete]: deleted, ...objectWithoutDeletedProp } = obj;
  return objectWithoutDeletedProp;
};
// used to generate query string which to be used in graphql request
export const getQueryString = ({
  searchString = '',
  productTypes = [],
  selectedCookTypesAndBrands = {},
} = {}) => {
  const queryValueString =
    searchString.trim() === ''
      ? `*`
      : searchString.trim().split(' ').length > 1
      ? `"${addslashes(
          searchString.trim().split(' ').slice(0, -1).join(' ')
        )}*"`
      : `${addslashes(searchString.trim())}*`;

  const searchStringPart = `(title:${queryValueString} OR description:${queryValueString} OR tags:${queryValueString})`;

  let productTypesPart = `${productTypes
    .map((type) => `product_type:"${addslashes(type)}"`)
    .join(' OR ')}`;

  if (productTypesPart !== '') {
    productTypesPart = ` AND (${productTypesPart})`;
  }

  let cookTypeAndBrandsPart = Object.keys(selectedCookTypesAndBrands ?? {})
    .map((cookType) => {
      const brands = selectedCookTypesAndBrands[cookType];
      const productBrandPart = `(${brands
        .map((brand) => `vendor:"${brand}"`)
        .join(' OR ')})`;
      if (productBrandPart === '') {
        return `tag:"dtm_cook-type_${cookType}"`;
      }
      return `(tag:"dtm_cook-type_${cookType}" AND ${productBrandPart})`;
    })
    .join(' OR ');

  if (cookTypeAndBrandsPart !== '') {
    cookTypeAndBrandsPart = ` AND (${cookTypeAndBrandsPart})`;
  }
  return `${searchStringPart}${productTypesPart}${cookTypeAndBrandsPart}`;
};

export const queryAllProductsThroughGraphqlCreator = ({
  searchString = '',
  productTypes = [],
} = {}) => {
  let products = [];
  const query250Products = (dataWithLastPageProducts) =>
    window.__APOLLO_CLIENT__
      .query({
        query: GET_PRODUCTS,
        variables: {
          first: 250,
          query: `${getQueryString({ searchString, productTypes })}`,
          after:
            dataWithLastPageProducts?.data?.products?.edges?.slice(-1)?.[0]
              ?.cursor ?? null,
          sortKey: 'BEST_SELLING',
        },
      })
      .then((data) => {
        products = [
          ...products,
          ...(data?.data?.products?.edges?.map(({ node }) => node) ?? []),
        ];
        if ((data?.data?.products?.edges?.length ?? 0) < 250) {
          return Promise.resolve(products);
        }
        return query250Products(data);
      });
  return query250Products;
};

export const queryAllProducts = async ({
  searchString = '',
  productTypes = [],
} = {}) => {
  let products = [];

  try {
    if (searchString?.trim() !== '') {
      throw new Error(
        'when searchString is not empty, we should send a new graphql request'
      );
    }
    productTypes.forEach((productType) => {
      const productsForCurrentProductType = JSON.parse(
        window.sessionStorage.getItem(productType.toLowerCase())
      );
      if (productsForCurrentProductType === null) {
        throw new Error(`${productType} has not been stored`);
      }
      products = [...products, ...productsForCurrentProductType];
    });
  } catch (err) {
    const rawProducts = await queryAllProductsThroughGraphqlCreator({
      searchString,
      productTypes,
    })();
    const productsInGroups = groupBy(
      rawProducts,
      (product) => product.productType
    );
    Object.entries(productsInGroups).forEach(
      ([productType, rawProductsOfCurrentProductType]) => {
        const productsOfCurrentProductType = rawProductsOfCurrentProductType.map(
          transformFuncCreator(productType)
        );
        products = [...products, ...productsOfCurrentProductType];
        console.log(
          'size',
          JSON.stringify(productsOfCurrentProductType).length +
            JSON.stringify(window.sessionStorage).length
        );
        if (
          JSON.stringify(productsOfCurrentProductType).length +
            JSON.stringify(window.sessionStorage).length <
          2500000
        ) {
          window.sessionStorage.setItem(
            productType.toLowerCase(),
            JSON.stringify(productsOfCurrentProductType)
          );
        }
      }
    );
  }
  return products;
};

export const hasIntersectionBetweenTwoRanges = (arr1 = [], arr2 = []) => {
  const [el11, el12] = arr1;
  const [el21, el22] = arr2;
  const leftLimit = Math.max(el11, el21);
  const rightLimit = Math.min(el12, el22);
  if (rightLimit >= leftLimit) {
    return true;
  }
  return false;
};

export const productsFilters = (state) => ({
  onlineStoreOnly: (product) => {
    if (!state.onlineStoreOnly) {
      return true;
    }
    return !!product.onlineStoreUrl;
  },
});

export const barbequesProductsFilters = (state) => {
  const {
    searchString,
    selectedCookTypesAndBrands,
    currentPriceRange,
    currentGrillCookingAreaRange,
    sideBurner,
    searBurner,
    rearRotisserie,
    grillType,
    standType,
    availability,
  } = state;
  const st = searchString?.trim() ?? '';
  return {
    ...productsFilters(state),
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
      const cookTypes = Object.keys(selectedCookTypesAndBrands);
      if (cookTypes.length === 0) {
        return true;
      }
      if (!product?.cookType) {
        return true;
      }
      const currentProductCookType = cookTypes.find(
        (t) => product.cookType === t
      );
      if (!currentProductCookType) {
        return false;
      }
      const brands = selectedCookTypesAndBrands[currentProductCookType];
      if (brands.length === 0) {
        return true;
      }
      if (brands.includes(product.vendor)) {
        return true;
      }
      return false;
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
      if (
        (product?.grillCookingArea ??
          DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE[0]) >=
          minGrillCookingArea &&
        (product?.grillCookingArea ??
          DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE[1]) <=
          maxGrillCookingArea
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
      if ((grillType?.length ?? 0) === 0) {
        return true;
      }
      return grillType?.includes(product?.grillType);
    },
    standType: (product) => {
      if ((standType?.length ?? 0) === 0) {
        return true;
      }
      return standType?.includes(product?.standType);
    },
    availability: (product) => {
      if (!availability || availability?.length === 0) {
        return true;
      }
      if (availability?.includes('true') && availability?.includes('false')) {
        return true;
      }
      if (availability?.includes('true') && product?.inStock) {
        return true;
      }
      if (availability?.includes('false') && !product?.inStock) {
        return true;
      }
      return false;
    },
  };
};

export const productsSorter = (state) => (productA, productB) => {
  switch (state.sortValue) {
    case 'TITLE_ASC': {
      return productA?.title?.localeCompare(productB?.title, undefined, {
        base: true,
      });
    }
    case 'TITLE_DESC': {
      return productB?.title?.localeCompare(productA?.title, undefined, {
        base: true,
      });
    }
    case 'PRICE_ASC': {
      return productA.minVariantPrice - productB.maxVariantPrice;
    }
    case 'PRICE_DESC': {
      return productB.minVariantPrice - productA.maxVariantPrice;
    }
    default: {
      return 0;
    }
  }
};

export const productsFiltersCreator = (productType) => {
  switch (productType.toLowerCase()) {
    case 'barbeques':
      return barbequesProductsFilters;
    default:
      return productsFilters;
  }
};

export const productsSorterCreator = (productType) => {
  switch (productType.toLowerCase()) {
    default:
      return productsSorter;
  }
};

export const getFilteredSortedProducts = (state, productType) => {
  const filters = productsFiltersCreator(productType)(state);
  const sorter = productsSorterCreator(productType)(state);
  let products = [...state.allProducts];
  Object.values(filters).forEach((f) => {
    products = products.filter(f);
  });
  products.sort(sorter);
  return products;
};

export const getFilteredSortedProductsOfCurrentPage = (state, productType) => {
  const { pageNumber, productsPerPage } = state;
  const allProducts = getFilteredSortedProducts(state, productType);
  const productsInChunks = chunk(allProducts, productsPerPage);
  return productsInChunks[pageNumber - 1];
};

export const getSortValueFromDefaultSortBy = (defaultSortBy) => {
  switch (defaultSortBy) {
    case 'best-selling': {
      return 'BEST_SELLING_ASC';
    }
    case 'title-ascending': {
      return 'TITLE_ASC';
    }
    case 'title-descending': {
      return 'TITLE_DESC';
    }
    case 'price-ascending': {
      return 'PRICE_ASC';
    }
    case 'price-descending': {
      return 'PRICE_DESC';
    }
    default: {
      return 'BEST_SELLING_ASC';
    }
  }
};

export const getPageCount = (state, productType) => {
  const { productsPerPage } = state;
  const allProducts = getFilteredSortedProducts(state, productType);
  const productsInChunks = chunk(allProducts, productsPerPage);
  return productsInChunks.length;
};

export const getDisplayedPageNumbers = (pageCount, pageNumber) => {
  const displayedPageNumbers = [
    1,
    pageCount,
    pageNumber - 2,
    pageNumber - 1,
    pageNumber,
    pageNumber + 1,
    pageNumber + 2,
  ]
    .filter(
      (item, pos, a) =>
        a.indexOf(item) === pos && item >= 1 && item <= pageCount
    )
    .sort((a, b) => a - b)
    .reduce((acc, cur, idx) => {
      let accCopy = [...acc];
      if (idx === 0) {
        accCopy = [cur];
      } else if (cur - acc[acc.length - 1] > 1) {
        accCopy = [...acc, '...', cur];
      } else {
        accCopy = [...acc, cur];
      }
      return accCopy;
    }, []);
  return displayedPageNumbers;
};

export default {
  removeKey,
  getQueryString,
  queryAllProducts,
  hasIntersectionBetweenTwoRanges,
  barbequesProductsFilters,
  productsSorter,
  getSortValueFromDefaultSortBy,
  getPageCount,
  transformFunc,
  barbequesTransformFunc,
  GET_PRODUCTS,
};
