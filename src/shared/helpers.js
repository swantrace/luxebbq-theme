/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import { gql } from '@apollo/client/core';

// const { pluralize } = require('pluralize');

export const DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE = [0, 6500];
export const DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE = [0, 75];

export const GET_PRODUCT_BY_HANDLE = gql`
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      onlineStoreUrl
      availableForSale
      handle
      title
      totalInventory
      tags
      vendor
      productType
      variants(first: 2) {
        edges {
          node {
            id
            image {
              altText
              originalSrc
              transformedSrc(crop: CENTER, maxWidth: 600, maxHeight: 600)
            }
            priceV2 {
              amount
              currencyCode
            }
            quantityAvailable
            availableForSale
          }
        }
      }
    }
  }
`;

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
                transformedSrc(crop: CENTER, maxWidth: 340, maxHeight: 340)
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

export const createFragmentFromString = (str) =>
  document.createRange().createContextualFragment(str);

export const stripHTML = (str) => str.replace(/(<([^>]+)>)/gi, '');

export const addslashes = (str) =>
  `${str}`.replace(/([\\"'])/g, '\\$1').replace(/\0/g, '\\0');

export const addQuotesIfNecessary = (cur) =>
  cur.split(/\s+/).length > 1 ? `"${cur}"` : cur;

export const removeKey = (obj, propToDelete) => {
  const { [propToDelete]: deleted, ...objectWithoutDeletedProp } = obj;
  return objectWithoutDeletedProp;
};
// used to generate query string which to be used in graphql request
export const getQueryString = ({
  searchString = '',
  productTypes = [],
} = {}) => {
  let searchStringPart = '';
  const queryValueString =
    searchString.trim() === ''
      ? `*`
      : searchString.trim().split(' ').length > 1
      ? `"${addslashes(
          searchString.trim().split(' ').slice(0, -1).join(' ')
        )}*"`
      : `${addslashes(searchString.trim())}*`;

  if (searchString.trim() !== '') {
    searchStringPart = ` AND (title:${queryValueString} OR description:${queryValueString} OR tags:${queryValueString})`;
  }

  let productTypesPart = `${productTypes
    .map((type) => `product_type:"${addslashes(type)}"`)
    .join(' OR ')}`;

  if (productTypesPart !== '') {
    productTypesPart = ` AND (${productTypesPart})`;
  }

  return `${searchStringPart}${productTypesPart}`;
};

export const queryAllProductsThroughGraphqlCreator = ({
  searchString = '',
  productTypes = [],
} = {}) => {
  let products = [];
  const query250Products = (dataWithLastPageProducts) => {
    console.log('dataWithLastPageProducts: ', dataWithLastPageProducts);
    return window.__APOLLO_CLIENT__
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
  };
  return query250Products;
};

export const queryAllProductsFromSearchTerm = async (searchString = '') => {
  const rawProducts = await queryAllProductsThroughGraphqlCreator({
    searchString,
  })();

  return rawProducts.map(transformFunc);
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

export const arrayIncludesItem = (arr, item) =>
  !!arr.find((i) =>
    // console.log(
    //   pluralize.singular,
    //   i.replace(/\s/g, '').toLowerCase(),
    //   item.replace(/\s/g, '').toLowerCase()
    // );
    i
      .replace(/\s/g, '')
      .toLowerCase()
      .includes(item?.replace(/\s/g, '')?.toLowerCase())
  );

export const compareTwoStringsOrArrays = (a, b) =>
  a.length === b.length &&
  Array.from(a).every((e) => Array.from(b).includes(e)) &&
  Array.from(b).every((e) => Array.from(a).includes(e));

export const getTypeUsedInRelatedProductsFromProductType = (type) => {
  switch (type) {
    case 'Barbeques':
      return 'cookTypes';
    case 'Grilling Accessories':
      return 'grillingAccessoriesType';
    case 'Lifestyle Accessories':
      return 'lifestyleAccessoriesType';
    case 'Drinkware & Coolers':
      return 'drinkwareAndCoolersType';
    case 'Fuel':
      return 'fuelType';
    case 'Parts':
      return 'partsType';
    case 'Sauces, Rubs & Spices':
      return 'foodType';
    case 'Furniture':
      return 'furnitureType';
    default:
      return 'cookType';
  }
};
