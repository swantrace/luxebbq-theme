import { html } from '@apollo-elements/haunted';
import { usePerfectGrillContext } from '../../context/perfectGrill';
import { getDisplayedPageNumbers, getPageCount } from '../../helpers';
import PagePagination from '../common/PagePagination';

function PerfectGrillPagination() {
  const context = usePerfectGrillContext();
  const dispatch = context?.dispatch ?? (() => {});
  const state = context?.state ?? {};
  const pageCount = getPageCount(state, 'Barbeques');
  const { pageNumber } = state;
  const displayedPageNumbers = getDisplayedPageNumbers(pageCount, pageNumber);

  // console.log('state', state, '\n', 'pageCount: ', pageCount, pageNumber);
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
  tagName: 'perfect-grill-pagination',
  renderer: PerfectGrillPagination,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
