import { html, useRef } from '@apollo-elements/haunted';
import { usePageContext } from '../../context';
import Pagination from '../common/Pagination';
import TitleBanner from '../common/TitleBanner';
import TopControllers from '../common/TopControllers';
import Products from '../common/Products';

function ProductTypeMainContent() {
  const {
    collectionTitle,
    emptyCollectionImage,
    getFilteredSortedProducts,
    getFilteredSortedProductsOfCurrentPage,
    getPageCount,
    getDisplayedPageNumbers,
    productsOfFirstPage,
    state,
    dispatch,
  } = usePageContext();
  const {
    fetchIsFinished,
    viewMode,
    sortValue,
    productsPerPage,
    pageNumber,
  } = state;
  const searchedProducts = getFilteredSortedProducts();
  const productsSize = searchedProducts.length;
  let productsOfCurrentPage = [];
  if (!fetchIsFinished) {
    productsOfCurrentPage = productsOfFirstPage ?? [];
  } else {
    productsOfCurrentPage = getFilteredSortedProductsOfCurrentPage();
  }

  console.log('productsOfFirstPage', productsOfFirstPage);
  const pageCount = getPageCount();
  const displayedPageNumbers = getDisplayedPageNumbers();
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
  console.log('collectionTitle', collectionTitle);
  return html`${TitleBanner({
    title: collectionTitle,
  })}${TopControllers({
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
  })}${Pagination({
    fetchIsFinished,
    pageNumber,
    displayedPageNumbers,
    pageCount,
    handlePageLinkClicked,
  })}`;
}

export default {
  tagName: 'product-type-main-content',
  renderer: ProductTypeMainContent,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
