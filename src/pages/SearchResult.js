import {
  html,
  useEffect,
  useQuery,
  useReducer,
  component,
} from '@apollo-elements/haunted';
import { CompareTable, MegaMenu } from '../shared/index';
import SearchBar from '../components/searchResult/SearchBar';
import TitleBanner from '../components/common/TitleBanner';
import { pageWrapper as SearchResultWrapper } from '../shared/context';
import {
  getQueryString,
  getSortValueFromDefaultSortBy,
  queryAllProductsFromSearchTerm,
  GET_PRODUCTS,
  transformFunc,
} from '../shared/helpers';
import SearchResultMainContent from '../components/searchResult/SearchResultMainContent';

function SearchResult({ defaultSortBy, emptyCollectionImage }) {
  const params = new URLSearchParams(window.location.search);
  const searchString = decodeURI(params.get('q')?.trim() ?? '');

  const searchResultReducer = (previousState, action) => {
    switch (action.type) {
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
    fetchIsFinished: false,
    searchString: '',
    productsPerPage: 24,
    pageNumber: 1,
    viewMode: 'grid',
    sortValue: 'BEST_SELLING_ASC',
    onlineStoreOnly: false,
  });

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
    const products = await queryAllProductsFromSearchTerm(searchString);
    // console.log('allProducts:', products);
    dispatch({ type: 'setAllProducts', payload: products });
    dispatch({ type: 'setFetchIsFinished', payload: true });
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
            ${searchString
              ? html` <div class="row">
                  <div class="col-lg-10 offset-lg-1">
                    <search-result-main-content></search-result-main-content>
                  </div>
                </div>`
              : null}
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

[
  SearchResultMainContent,
  CompareTable,
  MegaMenu,
  {
    tagName: 'search-result',
    renderer: SearchResult,
    options: {
      observedAttributes: ['default-sort-by', 'empty-collection-image'],
      useShadowDOM: false,
    },
  },
].forEach((pComponent) => {
  customElements.define(
    pComponent.tagName,
    component(pComponent.renderer, pComponent.options),
    pComponent?.elementOptions
  );
});
