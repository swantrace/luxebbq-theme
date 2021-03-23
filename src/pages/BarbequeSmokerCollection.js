import {
  html,
  useEffect,
  useQuery,
  useReducer,
} from '@apollo-elements/haunted';
import { GET_PRODUCTS } from '../apollo-client';
import { BarbequeSmokerCollectionWrapper } from '../context/barbequeSmokerCollection';
import {
  DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE,
  DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE,
  getQueryString,
  getSortValueFromDefaultSortBy,
  queryAllProducts,
  transformFunc,
} from '../helpers';

function BarbequeSmokerCollection({
  cookTypesAndBrands,
  priceRangeMinAndMax,
  grillCookingAreaMinAndMax,
  defaultSortBy,
  collectionHandle,
  collectionMetafields,
  emptyCollectionImage,
}) {
  const client = window.__APOLLO_CLIENT__;
  const params = new URLSearchParams(window.location.search);
  const selectedCookTypesAndBrandsFromQueryString = JSON.parse(
    decodeURI(params.get('selected') ?? '{}')
  );
  const brandInfo = JSON.parse(
    cookTypesAndBrands ??
      '{"Gas Grill":[], "Charcoal Grill":[], "Pellet Grill":[], "Oven":[]}'
  );
  const collectionImages =
    JSON.parse(collectionMetafields ?? '{}')?.images ?? [];

  const barbequesCollectionReducer = (previousState, action) => {
    switch (action.type) {
      case 'setAllProducts': {
        return {
          ...previousState,
          allProducts: action.payload,
          searchString: '',
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
      case 'changeCookTypesAndBrands': {
        return {
          ...previousState,
          selectedCookTypesAndBrands: action.payload,
          pageNumber: 1,
        };
      }
      case 'changePriceRange': {
        return {
          ...previousState,
          currentPriceRange: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeGrillCookingAreaRange': {
        return {
          ...previousState,
          currentGrillCookingAreaRange: action.payload,
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
      default:
        return { ...previousState };
    }
  };
  const [state, dispatch] = useReducer(barbequesCollectionReducer, {
    allProducts: [],
    searchString: '',
    selectedCookTypesAndBrands: selectedCookTypesAndBrandsFromQueryString ?? {},
    currentPriceRange: DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE,
    currentGrillCookingAreaRange: DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE,
    productsPerPage: 24,
    pageNumber: 1,
    viewMode: 'grid',
    sortValue: 'BEST_SELLING_ASC',
  });

  const { data: dataWithFirstPageProducts } = useQuery(GET_PRODUCTS, {
    variables: {
      first: state.productsPerPage,
      query: `${getQueryString(
        ['Barbeques'],
        selectedCookTypesAndBrandsFromQueryString
      )}`,
      reverse: !!getSortValueFromDefaultSortBy(defaultSortBy).includes('DESC'),
      sortKey: getSortValueFromDefaultSortBy(defaultSortBy)
        .replace('_DESC', '')
        .replace('_ASC', ''),
    },
  });
  const productsOfFirstPage =
    dataWithFirstPageProducts?.products?.edges?.map(({ node }) =>
      transformFunc(node)
    ) ?? [];

  useEffect(async () => {
    const products = await queryAllProducts(
      client,
      GET_PRODUCTS,
      ['Barbeques'],
      transformFunc
    );
    console.log('allProducts:', products);
    dispatch({ type: 'setAllProducts', payload: products });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'changeSortValue',
      payload: getSortValueFromDefaultSortBy(defaultSortBy),
    });
  }, [defaultSortBy]);
  useEffect(() => {
    dispatch({
      type: 'changePriceRange',
      payload: JSON.parse(
        priceRangeMinAndMax ??
          `[${DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE.join(',')}]`
      ).map((p) => Math.floor(Number(p))),
    });
  }, [priceRangeMinAndMax]);
  useEffect(() => {
    dispatch({
      type: 'changeGrillCookingAreaRange',
      payload: JSON.parse(
        grillCookingAreaMinAndMax ??
          `[${DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE.join(',')}]`
      ).map((p) => Math.floor(Number(p))),
    });
  }, [grillCookingAreaMinAndMax]);

  return html`${BarbequeSmokerCollectionWrapper({
    children: html`<section class="section-b-space">
      <div class="collection-wrapper">
        <div class="container">
          <div class="row">
            <collection-sidebar
              class="collection-filter col-sm-3"
            ></collection-sidebar>
            <collection-main-content
              class="collection-content col"
            ></collection-main-content>
          </div>
        </div>
      </div>
    </section>`,
    brandInfo,
    priceRangeMinAndMax: JSON.parse(
      priceRangeMinAndMax ??
        `[${DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE.join(',')}]`
    ).map((p) => Math.floor(Number(p))),
    grillCookingAreaMinAndMax: JSON.parse(
      grillCookingAreaMinAndMax ??
        `[${DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE.join(',')}]`
    ).map((p) => Math.floor(Number(p))),
    productsOfFirstPage,
    collectionHandle,
    collectionImages,
    collectionState: state,
    collectionDispatch: dispatch,
    emptyCollectionImage,
  })}`;
}

export default {
  tagName: 'barbeque-smoker-collection',
  renderer: BarbequeSmokerCollection,
  options: {
    observedAttributes: [
      'cook-types-and-brands',
      'price-range-min-and-max',
      'grill-cooking-area-min-and-max',
      'default-sort-by',
      'collection-handle',
      'collection-metafields',
      'empty-collection-image',
    ],
    useShadowDOM: false,
  },
};
