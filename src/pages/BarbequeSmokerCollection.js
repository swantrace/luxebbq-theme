import {
  html,
  useEffect,
  useQuery,
  useReducer,
} from '@apollo-elements/haunted';
import {
  GET_PRODUCTS,
  DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE,
  DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE,
  getQueryString,
  getSortValueFromDefaultSortBy,
  queryAllProducts,
  barbequesTransformFunc,
} from '../helpers';
import { pageWrapper as BarbequeSmokerCollectionWrapper } from '../context';
import CollectionMainContent from '../components/common/CollectionMainContent';
import CollectionSidebar from '../components/common/CollectionSidebar';
import BarbequesSidebarFilter from '../components/barbequeSmokerCollection/BarbequesSidebarFilter';

function BarbequeSmokerCollection({
  cookTypesAndBrands,
  priceRangeMinAndMax,
  grillCookingAreaMinAndMax,
  defaultSortBy,
  collectionHandle,
  collectionMetafields,
  emptyCollectionImage,
}) {
  const params = new URLSearchParams(window.location.search);
  const selectedCookTypesAndBrandsFromQueryString = JSON.parse(
    decodeURI(params.get('selected') ?? '{}')
  );
  const brandInfo = JSON.parse(cookTypesAndBrands);

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
      case 'changeOnlineStoreOnly': {
        return {
          ...previousState,
          onlineStoreOnly: action.payload,
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
    onlineStoreOnly: false,
  });

  const { data: dataWithFirstPageProducts } = useQuery(GET_PRODUCTS, {
    variables: {
      first: state.productsPerPage,
      query: `${getQueryString({
        searchString: '',
        productTypes: ['Barbeques'],
        selectedCookTypesAndBrands: selectedCookTypesAndBrandsFromQueryString,
      })}`,
      reverse: !!getSortValueFromDefaultSortBy(defaultSortBy).includes('DESC'),
      sortKey: getSortValueFromDefaultSortBy(defaultSortBy)
        .replace('_DESC', '')
        .replace('_ASC', ''),
    },
  });
  const productsOfFirstPage =
    dataWithFirstPageProducts?.products?.edges?.map(({ node }) =>
      barbequesTransformFunc(node)
    ) ?? [];

  useEffect(async () => {
    const products = await queryAllProducts({
      productTypes: ['Barbeques'],
    });
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
            ${CollectionSidebar({
              FilterForTheProductType: BarbequesSidebarFilter,
            })}
            ${CollectionMainContent({
              title: 'Grills / Smokers',
              productType: 'Barbeques',
            })}
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
    state,
    dispatch,
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
