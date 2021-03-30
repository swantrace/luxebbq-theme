import { html } from '@apollo-elements/haunted';
import { usePageContext } from '../../context';
import {
  getDisplayedPageNumbers,
  getFilteredSortedProducts,
  getPageCount,
} from '../../helpers';
import ProductListLoading from './ProductListLoading';

function ProductListPagination({ productType }) {
  const context = usePageContext();
  const state = context?.state ?? {};
  const dispatch = context?.dispatch ?? (() => {});
  const searchedProducts = getFilteredSortedProducts(state, productType);
  const pageCount = getPageCount(state, productType);
  const { pageNumber } = state;
  const displayedPageNumbers = getDisplayedPageNumbers(pageCount, pageNumber);

  const handlePageLinkClicked = (number) => {
    if (Number.isNaN(Number(number))) {
      return;
    }
    dispatch({ type: 'changePageNumber', payload: number });
  };

  const productsSize = searchedProducts.length;

  return html`<div class="product-pagination">
    <div class="theme-paggination-block">
      <div class="container-fluid p-0">
        <div class="row justify-content-center">
          <nav aria-label="Page navigation">
            ${productsSize > 0
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
  </div>`;
}

export default {
  tagName: 'product-list-pagination',
  renderer: ProductListPagination,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
