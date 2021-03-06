/* eslint-disable no-unused-vars */
import { html, useEffect, useRef } from '@apollo-elements/haunted';
import { usePageContext } from '../../shared/context';
import Pagination from '../common/Pagination';
import TitleBanner from '../common/TitleBanner';
import TopControllers from '../common/TopControllers';
import Products from '../common/Products';

function ProductTypeMainContent({ displaySidebarToggler = true }) {
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
  const { fetchIsFinished, viewMode, sortValue, productsPerPage, pageNumber } =
    state;
  const searchedProducts = getFilteredSortedProducts();
  const productsSize = searchedProducts.length;
  let productsOfCurrentPage = [];
  if (!fetchIsFinished) {
    productsOfCurrentPage = productsOfFirstPage ?? [];
  } else {
    productsOfCurrentPage = getFilteredSortedProductsOfCurrentPage();
  }

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // console.log('collectionTitle', collectionTitle);

  return html`${TitleBanner({
    title: collectionTitle,
  })}${TopControllers({
    displaySidebarToggler,
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
