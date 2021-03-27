import { html, virtual } from '@apollo-elements/haunted';

const PagePagination = virtual(
  ({
    pageNumber,
    pageCount,
    displayedPageNumbers,
    handlePageLinkClicked,
  }) => html`<nav aria-label="Page navigation">
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
          <li class=${`page-item${number === pageNumber ? ' active' : ''}`}>
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
  </nav>`
);

export default PagePagination;
