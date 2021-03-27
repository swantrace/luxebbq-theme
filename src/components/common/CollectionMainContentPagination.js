import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';
import {
  getBarbequesCollectionSearchedProducts,
  getDisplayedPageNumbers,
  getPageCount,
} from '../../helpers';
import PagePagination from './PagePagination';

function CollectionMainContentPagination() {
  const context = useBarbequeSmokerCollectionContext();
  const dispatch = context?.collectionDispatch ?? (() => {});
  const state = context?.collectionState ?? {};
  const pageCount = getPageCount(state, getBarbequesCollectionSearchedProducts);
  const { pageNumber } = state;
  const displayedPageNumbers = getDisplayedPageNumbers(pageCount, pageNumber);

  const handlePageLinkClicked = (number) => {
    if (Number.isNaN(Number(number))) {
      return;
    }
    dispatch({ type: 'changePageNumber', payload: number });
  };
  return html`<div class="product-pagination">
    <div class="theme-paggination-block">
      <div class="container-fluid p-0">
        <div class="row justify-content-center">
          ${PagePagination({
            pageNumber,
            pageCount,
            displayedPageNumbers,
            handlePageLinkClicked,
          })}
        </div>
      </div>
    </div>
  </div>`;
}

export default {
  tagName: 'collection-main-content-pagination',
  renderer: CollectionMainContentPagination,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
