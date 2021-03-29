import {
  html,
  useEffect,
  useQuery,
  useReducer,
} from '@apollo-elements/haunted';
import SearchBar from '../components/searchResult/SearchBar';
import TitleBanner from '../components/common/TitleBanner';
import { pageWrapper as SearchResultWrapper } from '../context';
import {
  getQueryString,
  getSortValueFromDefaultSortBy,
  queryAllProducts,
  GET_PRODUCTS,
  transformFunc,
} from '../helpers';

function SearchResult({ defaultSortBy, emptyCollectionImage }) {
  const params = new URLSearchParams(window.location.search);
  const searchString = decodeURI(params.get('q') ?? '');

  const searchResultReducer = (previousState, action) => {
    switch (action.type) {
      case 'setAllProducts': {
        return {
          ...previousState,
          allProducts: action.payload,
          searchString: '',
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

  const [state, dispatch] = useReducer(searchResultReducer, {
    allProducts: [],
    searchString: '',
    productsPerPage: 24,
    pageNumber: 1,
    viewMode: 'grid',
    sortValue: 'BEST_SELLING_ASC',
    onlineStoreOnly: false,
  });

  window.state = state;

  const { data: dataWithFirstPageProducts } = useQuery(GET_PRODUCTS, {
    variables: {
      first: state.productsPerPage,
      query: `${getQueryString({ searchString })}`,
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
    const products = await queryAllProducts({
      searchString,
    });
    // console.log('allProducts:', products);
    dispatch({ type: 'setAllProducts', payload: products });
  }, []);

  return html`${SearchResultWrapper({
    children: html` <section class="authentication-page section-b-space">
      <div class="container">
        <section class="p-0">
          <div class="container">
            ${SearchBar({ searchString })}
            <div class="row search-title-banner-row">
              <div class="col-lg-10 offset-lg-1">
                ${TitleBanner({ title: 'SEARCH RESULTS' })}
              </div>
            </div>
            <product-list-top-controllers></product-list-top-controllers>
            <search-product-list></search-product-list>
            <product-list-pagination></product-list-pagination>
          </div>
        </section>
      </div>
    </section>`,
    productsOfFirstPage,
    state,
    dispatch,
    emptyCollectionImage,
  })}`;
}

export default {
  tagName: 'search-result',
  renderer: SearchResult,
  options: {
    observedAttributes: ['default-sort-by', 'empty-collection-image'],
    useShadowDOM: false,
  },
};
