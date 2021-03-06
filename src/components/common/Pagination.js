import { html, virtual } from '@apollo-elements/haunted';
import ProductListLoading from './ProductListLoading';

const Pagination = virtual(
  ({
    fetchIsFinished,
    pageNumber,
    displayedPageNumbers,
    pageCount,
    handlePageLinkClicked,
  }) =>
    // const context = usePageContext();
    // const state = context?.state ?? {};
    // const dispatch = context?.dispatch ?? (() => {});
    // const fetchIsFinished = state?.fetchIsFinished ?? false;
    // const pageCount = getPageCount(state, productType);
    // const { pageNumber } = state;
    // const displayedPageNumbers = getDisplayedPageNumbers(pageCount, pageNumber);

    // const handlePageLinkClicked = (number) => {
    //   if (Number.isNaN(Number(number))) {
    //     return;
    //   }
    //   dispatch({ type: 'changePageNumber', payload: number });
    // };

    html`<div class="product-pagination">
      <div class="theme-paggination-block">
        <div class="container-fluid p-0">
          <div class="row justify-content-center">
            <nav aria-label="Page navigation">
              ${fetchIsFinished
                ? html`<ul class="pagination">
                    ${pageNumber > 1
                      ? html`<li class="page-item">
                          <a
                            class="page-link paginate_btn_cls"
                            href="javascript:void(0)"
                            aria-label="Previous"
                            @click=${(e) =>
                              handlePageLinkClicked(pageNumber - 1, e)}
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
                            @click=${(e) =>
                              handlePageLinkClicked(pageNumber + 1, e)}
                          >
                            <span aria-hidden="true">»</span>
                          </a>
                        </li>`
                      : null}
                  </ul>`
                : html`${ProductListLoading({
                    height: '50px',
                    marginBottom: '0',
                    customClass: 'pagination-loading',
                  })}`}
            </nav>
          </div>
        </div>
      </div>
    </div>`
);

export default Pagination;
