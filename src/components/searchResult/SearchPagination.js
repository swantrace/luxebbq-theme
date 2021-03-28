import { html } from '@apollo-elements/haunted';
import { usePageContext as useSearchResultContext } from '../../context';
import { getDisplayedPageNumbers, getPageCount } from '../../helpers';
import PagePagination from '../common/PagePagination';

function SearchPagination() {
  const context = useSearchResultContext();
  const dispatch = context?.searchResultDispatch ?? (() => {});
  const state = context?.searchResultState ?? {};
  const pageCount = getPageCount(state);
  const { pageNumber } = state;
  const displayedPageNumbers = getDisplayedPageNumbers(pageCount, pageNumber);

  // console.log('displayedPageNumbers: ', displayedPageNumbers);
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
  tagName: 'search-pagination',
  renderer: SearchPagination,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
