/* eslint-disable no-nested-ternary */
import sizeof from 'object-sizeof';
import chunk from 'lodash.chunk';
import { gql } from '@apollo/client/core';
import groupBy from 'lodash.groupby';

export const DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE = [1, 10000];
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

export const addslashes = (str) =>
  `${str}`.replace(/([\\"'])/g, '\\$1').replace(/\0/g, '\\0');

export const removeKey = (obj, propToDelete) => {
  const { [propToDelete]: deleted, ...objectWithoutDeletedProp } = obj;
  return objectWithoutDeletedProp;
};

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

export const query250ProductsCreator = ({
  client = window.__APOLLO_CLIENT__,
  query = GET_PRODUCTS,
  searchString = '',
  productTypes = [],
  transformFunc = (a) => a,
  sortKey = 'BEST_SELLING',
  reverse = false,
} = {}) => {
  let products = [];
  const query250Products = (dataWithLastPageProducts) =>
    client
      .query({
        query,
        variables: {
          first: 250,
          query: `${getQueryString({ searchString, productTypes })}`,
          after:
            dataWithLastPageProducts?.data?.products?.edges?.slice(-1)?.[0]
              ?.cursor ?? null,
          sortKey,
          reverse,
        },
      })
      .then((data) => {
        products = [
          ...products,
          ...(data?.data?.products?.edges?.map(({ node }) => node) ?? []),
        ];
        if ((data?.data?.products?.edges?.length ?? 0) < 250) {
          return Promise.resolve(products.map(transformFunc));
        }
        return query250Products(data);
      });
  return query250Products;
};

export const queryAllProducts = async ({
  client = window.__APOLLO_CLIENT__,
  query = GET_PRODUCTS,
  searchString = '',
  productTypes = [],
  transformFunc = (a) => a,
  sortKey = 'BEST_SELLING',
  reverse = false,
} = {}) => {
  if (searchString.trim() === '') {
    let products = [];
    try {
      productTypes.forEach((productType) => {
        const productsForCurrentProductType = JSON.parse(
          window.sessionStorage.getItem(productType.toLowerCase())
        );
        if (productsForCurrentProductType === null) {
          throw new Error('barbeques has not been stored');
        }
        products = [...products, ...productsForCurrentProductType];
      });
    } catch (err) {
      const query250ProductsOfCurrentProductTypes = query250ProductsCreator({
        client,
        query,
        searchString,
        productTypes,
        transformFunc,
        sortKey,
        reverse,
      });
      products = await query250ProductsOfCurrentProductTypes();
      console.log(
        'products from query250ProductsOfCurrentProductType',
        products
      );
      if (sizeof(JSON.stringify(products)) < 4e6) {
        const productsInGroups = groupBy(
          products,
          (product) => product.productType
        );
        Object.entries(productsInGroups).forEach(
          ([productType, productsOfCurrentPage]) => {
            window.sessionStorage.setItem(
              productType.toLowerCase(),
              JSON.stringify(productsOfCurrentPage)
            );
          }
        );
      }
    }
    return products;
  }
  let products = [];
  const query250ProductsOfCurrentSearchString = query250ProductsCreator({
    client,
    query,
    searchString,
    productTypes,
    transformFunc,
    sortKey,
    reverse,
  });
  products = await query250ProductsOfCurrentSearchString();
  console.log('products from query250ProductsOfCurrentSearchString', products);
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

export const createBarbequesCollectionFilters = ({
  searchString,
  selectedCookTypesAndBrands,
  currentPriceRange,
  currentGrillCookingAreaRange,
  onlineStoreOnly,
  sideBurner,
  searBurner,
  rearRotisserie,
  grillType,
  availability,
}) => {
  const st = searchString?.trim() ?? '';
  return {
    onlineStoreOnly: (product) => {
      if (!onlineStoreOnly) {
        return true;
      }
      return !!product.onlineStoreUrl;
    },
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
    availability: (product) => {
      if (availability?.length === 0) {
        return true;
      }
      if (availability.includes('true') && availability.includes('false')) {
        return true;
      }
      if (availability.includes('true') && product.availableForSale) {
        return true;
      }
      if (availability.includes('false') && !product.availableForSale) {
        return true;
      }
      return false;
    },
  };
};

export const createBarbequesCollectionSorter = (sortValue) => (
  productA,
  productB
) => {
  switch (sortValue) {
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

export const getBarbequesCollectionSearchedProducts = (
  {
    allProducts = [],
    searchString = '',
    selectedCookTypesAndBrands = {},
    currentPriceRange = DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE,
    currentGrillCookingAreaRange = DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE,
    sortValue,
    sideBurner,
    searBurner,
    rearRotisserie,
    grillType,
    availability,
  } = {},
  onlineStoreOnly = false
) => {
  const filters = createBarbequesCollectionFilters({
    searchString,
    selectedCookTypesAndBrands,
    currentPriceRange,
    currentGrillCookingAreaRange,
    onlineStoreOnly,
    sideBurner,
    searBurner,
    rearRotisserie,
    grillType,
    availability,
  });
  const sorter = createBarbequesCollectionSorter(sortValue);
  let products = [...allProducts];
  Object.values(filters).forEach((f) => {
    products = products.filter(f);
  });
  products.sort(sorter);
  return products;
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

export const getPageCount = (state, getPartFunc = (s) => s.allProducts) => {
  const productsPerPage = state?.productsPerPage ?? 24;
  const searchedProducts = getPartFunc(state);
  const productsInChunks = chunk(searchedProducts, productsPerPage);
  return productsInChunks.length ?? 1;
};

export const getBarbequesCollectionSearchedProductsOfCurrentPage = (state) => {
  const pageNumber = state?.pageNumber ?? 1;
  const productsPerPage = state?.productsPerPage ?? 24;
  const searchedProducts = getBarbequesCollectionSearchedProducts(state);
  const productsInChunks = chunk(searchedProducts, productsPerPage);
  const productsOfCurrentPage =
    productsInChunks[pageNumber - 1] ?? productsInChunks[0] ?? [];
  return productsOfCurrentPage;
};

export const getProductsOfCurrentPage = (
  state,
  getAllProducts = (s) => s.allProducts
) => {
  const pageNumber = state?.pageNumber ?? 1;
  const productsPerPage = state?.productsPerPage ?? 24;
  console.log('state:', state);
  const searchedProducts = getAllProducts(state);
  console.log('searchedProducts:', searchedProducts);
  const productsInChunks = chunk(searchedProducts, productsPerPage);
  const productsOfCurrentPage =
    productsInChunks[pageNumber - 1] ?? productsInChunks[0] ?? [];
  return productsOfCurrentPage;
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

export const searchResultTransformFunc = ({
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
}) => {
  const processedProduct = {
    availableForSale,
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
  };
  return processedProduct;
};
// todo: transformFunc and filter for grill cooking area
export const barbequesCollectionTransformFunc = ({
  availableForSale,
  onlineStoreUrl,
  description,
  handle,
  images,
  priceRange,
  tags,
  title,
  vendor,
  productType,
  totalInventory,
}) => {
  const processedProduct = {
    availableForSale,
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
    cookType:
      tags
        ?.find((tag) => tag.includes('dtm_cook-type_'))
        ?.replace('dtm_cook-type_', '') ?? null,
    grillCookingArea:
      tags
        ?.find((tag) => tag.includes('dtm_grill-cooking-area'))
        ?.replace('dtm_grill-cooking-area_', '') ?? null,
    sideBurner: !!tags?.includes('dtm_side-burner'),
    searBurner: !!tags?.includes('dtm_sear-burner'),
    rearRotisserie: !!tags?.includes('dtm_rear-rotisserie'),
    grillType: tags
      ?.filter((tag) => tag.includes('dtm_grill-type'))
      .map((tag) => tag.replace('dtm_grill-type_', '')),
    tags,
    description,
    vendor,
    productType,
    onlineStoreUrl,
  };
  return processedProduct;
};

export default {
  removeKey,
  getQueryString,
  queryAllProducts,
  hasIntersectionBetweenTwoRanges,
  createBarbequesCollectionFilters,
  createBarbequesCollectionSorter,
  getBarbequesCollectionSearchedProducts,
  getSortValueFromDefaultSortBy,
  getPageCount,
  getBarbequesCollectionSearchedProductsOfCurrentPage,
  barbequesCollectionTransformFunc,
  GET_PRODUCTS,
};
