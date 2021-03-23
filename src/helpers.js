import sizeof from 'object-sizeof';
import chunk from 'lodash.chunk';

export const DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE = [1, 10000];
export const DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE = [1, 100];
export const addslashes = (str) =>
  `${str}`.replace(/([\\"'])/g, '\\$1').replace(/\0/g, '\\0');

export const removeKey = (obj, propToDelete) => {
  const { [propToDelete]: deleted, ...objectWithoutDeletedProp } = obj;
  return objectWithoutDeletedProp;
};

export const getQueryString = (productTypes, selectedCookTypesAndBrands) => {
  const productTypePart = `(${productTypes
    .map((type) => `product_type:"${addslashes(type)}"`)
    .join(' OR ')})`;

  const cookTypeAndBrandsPart = Object.keys(selectedCookTypesAndBrands ?? {})
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

  if (cookTypeAndBrandsPart.length > 0) {
    return `${productTypePart} AND (${cookTypeAndBrandsPart})`;
  }
  return productTypePart;
};

export const query250ProductsCreator = (
  client,
  query,
  productTypes,
  transformFunc = (a) => a,
  sortKey = 'BEST_SELLING',
  reverse = false
) => {
  let products = [];
  const query250Products = (dataWithLastPageProducts) =>
    client
      .query({
        query,
        variables: {
          first: 250,
          query: `${getQueryString(productTypes)}`,
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

export const queryAllProducts = async (
  client,
  query,
  productTypes,
  transformFunc,
  sortKey,
  reverse
) => {
  let products = [];
  try {
    products = JSON.parse(window.sessionStorage.getItem('barbeques'));
    if (products === null) {
      throw new Error('barbeques has not been stored');
    }
  } catch (err) {
    const query250ProductsOfBarbeques = query250ProductsCreator(
      client,
      query,
      productTypes,
      transformFunc,
      sortKey,
      reverse
    );
    products = await query250ProductsOfBarbeques();
    if (sizeof(JSON.stringify(products)) < 4e6) {
      window.sessionStorage.setItem('barbeques', JSON.stringify(products));
    }
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

export const createBarbequesCollectionFilters = (
  searchString,
  selectedCookTypesAndBrands,
  currentPriceRange,
  currentGrillCookingAreaRange,
  onlineStoreOnly
) => {
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
  } = {},
  onlineStoreOnly = false
) => {
  const filters = createBarbequesCollectionFilters(
    searchString,
    selectedCookTypesAndBrands,
    currentPriceRange,
    currentGrillCookingAreaRange,
    onlineStoreOnly
  );
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

export const getPageCount = (state) => {
  const productsPerPage = state?.productsPerPage ?? 24;
  const searchedProducts = getBarbequesCollectionSearchedProducts(state);
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
    .filter((item, pos, a) => a.indexOf(item) === pos && item >= 1)
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
  createBarbequesCollectionFilters,
  createBarbequesCollectionSorter,
  getBarbequesCollectionSearchedProducts,
  getSortValueFromDefaultSortBy,
  getPageCount,
  getBarbequesCollectionSearchedProductsOfCurrentPage,
};
