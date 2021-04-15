import { html, useRef } from '@apollo-elements/haunted';
import chunk from 'lodash.chunk';
import { usePageContext } from '../../shared/context';
import Pagination from '../common/Pagination';
import TopControllers from '../common/TopControllers';
import Products from '../common/Products';
import { getDisplayedPageNumbers, productsSorter } from '../../shared/helpers';

function SearchResultMainContent() {
  const {
    productsOfFirstPage,
    state,
    dispatch,
    emptyCollectionImage,
  } = usePageContext();
  const {
    allProducts,
    fetchIsFinished,
    viewMode,
    sortValue,
    productsPerPage,
    pageNumber,
  } = state;
  const searchedProducts = allProducts.sort(productsSorter(state));
  const productsSize = searchedProducts.length;
  let productsOfCurrentPage = [];
  let pageCount = 1;
  let displayedPageNumbers = [1];
  if (!fetchIsFinished) {
    productsOfCurrentPage = productsOfFirstPage ?? [];
  } else {
    const productsInChunk = chunk(searchedProducts, productsPerPage);
    productsOfCurrentPage = productsInChunk?.[pageNumber - 1] ?? [];
    pageCount = productsInChunk?.length ?? 1;
    displayedPageNumbers = getDisplayedPageNumbers(pageCount, pageNumber);
  }

  const thisRef = useRef(this);
  const handleViewModeIconClicked = (newViewMode) => {
    dispatch({ type: 'changeViewMode', payload: newViewMode });
  };
  const handleProductsPerPageChanged = (e) => {
    dispatch({
      type: 'changeProductsPerPage',
      payload: Number(e.target.value),
    });
  };
  const handleSortValueChanged = (e) => {
    dispatch({
      type: 'changeSortValue',
      payload: e.target.value,
    });
  };
  const handlePageLinkClicked = (number) => {
    if (Number.isNaN(Number(number))) {
      return;
    }
    dispatch({ type: 'changePageNumber', payload: number });
  };

  return html`${TopControllers({
    fetchIsFinished,
    productsSize,
    viewMode,
    productsPerPage,
    sortValue,
    handleViewModeIconClicked,
    handleProductsPerPageChanged,
    handleSortValueChanged,
  })}${Products({
    mainContentElement: thisRef.current,
    productsOfCurrentPage,
    viewMode,
    emptyCollectionImage,
    itemClassList: {
      grid: 'col-lg-3 col-md-6 col-grid-box',
      list: 'col-lg-12',
    },
  })}${Pagination({
    fetchIsFinished,
    pageNumber,
    displayedPageNumbers,
    pageCount,
    handlePageLinkClicked,
  })}`;
}

export default {
  tagName: 'search-result-main-content',
  renderer: SearchResultMainContent,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
