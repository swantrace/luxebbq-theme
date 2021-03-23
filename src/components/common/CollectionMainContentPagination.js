import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';
import { getDisplayedPageNumbers, getPageCount } from '../../helpers';

function CollectionMainContentPagination() {
  const context = useBarbequeSmokerCollectionContext();
  const dispatch = context?.collectionDispatch ?? (() => {});
  const state = context?.collectionState ?? {};
  const pageCount = getPageCount(state);
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
          <nav aria-label="Page navigation">
            <ul class="pagination">
              ${pageNumber > 1
                ? html`<li class="page-item">
                    <a
                      class="page-link paginate_btn_cls"
                      href="javascript:void(0)"
                      aria-label="Previous"
                      @click=${(e) => handlePageLinkClicked(pageNumber - 1, e)}
                    >
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>`
                : null}
              ${displayedPageNumbers.map(
                (number) => html`
                  <li
                    class=${`page-item${
                      number === pageNumber ? ' active' : ''
                    }`}
                  >
                    <a
                      class=${`page-link${
                        number === pageNumber ? '' : ' paginate_btn_cls'
                      }`}
                      href="javascript:void(0)"
                      @click=${(e) => handlePageLinkClicked(number, e)}
                      >${number}</a
                    >
                  </li>
                `
              )}
              ${pageNumber < pageCount
                ? html`<li class="page-item">
                    <a
                      class="page-link paginate_btn_cls"
                      href="javascript:void(0)"
                      aria-label="Next"
                      @click=${(e) => handlePageLinkClicked(pageNumber + 1, e)}
                    >
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>`
                : null}
            </ul>
          </nav>
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
