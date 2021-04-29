/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { html, useState } from '@apollo-elements/haunted';
import pickBy from 'lodash.pickby';
import { stripHTML } from '../../shared/helpers';
import TitleBanner from './TitleBanner';

function CompareTable() {
  const transformFunc = ({
    available,
    title,
    featured_image,
    vendor,
    description,
    tags,
    price,
    handle,
    variants,
    first_available_variant_id,
  }) => {
    const product = {
      available,
      totalInventory: variants
        .map((variant) => Number(variant.inventory_quantity))
        .reduce((acc, cur) => acc + cur, 0),
      name: title,
      image: featured_image,
      brand: vendor,
      description: stripHTML(description),
      handle,
      variantId: first_available_variant_id,
      price: `$${(price / 100).toFixed(2)}`,
      'cook-type':
        tags
          ?.filter((tag) => tag.includes('dtm_cook-type_'))
          ?.map((t) => t?.replace('dtm_cook-type_', '')) ?? [],
      'total-btu':
        tags
          ?.find((tag) => tag.includes('dtm_total-btu'))
          ?.replace('dtm_total-btu_', '') ?? '',
      'cooking-temperature-range':
        tags
          ?.find((tag) => tag.includes('dtm_cooking-temperature-range'))
          ?.replace('dtm_cooking-temperature-range_', '') ?? '',
      'total-grill-size':
        tags
          ?.find((tag) => tag.includes('dtm_total-grill-size'))
          ?.replace('dtm_total-grill-size_', '') ?? '',
      'primary-cooking-space':
        tags
          ?.find((tag) => tag.includes('dtm_primary-cooking-space'))
          ?.replace('dtm_primary-cooking-space_', '') ?? '',
      'number-of-racks':
        tags
          ?.find((tag) => tag.includes('dtm_number-of-racks'))
          ?.replace('dtm_number-of-racks_', '') ?? '',
      'rear-rotisserie-burner': !!tags?.includes('dtm_rear-rotisserie-burner'),
      'side-burner': !!tags?.includes('dtm_side-burner'),
      'sear-functionality': !!tags?.includes('dtm_sear-functionality'),
    };
    product.stockInfo =
      product.totalInventory > 0
        ? html`<span class="instock-lable"
            ><i class="fa fa-check-circle" aria-hidden="true"></i>INSTOCK</span
          >`
        : product.available
        ? html`<span class="instock-lable"
            ><i class="fa fa-check-circle" aria-hidden="true"></i>PREORDER</span
          >`
        : html`<span class="outofstock-lable"
            ><i class="fa fa-ban" aria-hidden="true"></i>OUT OF STOCK</span
          >`;
    return product;
  };
  const currentCompareProducts = JSON.parse(
    localStorage.getItem('compare') ?? '{}'
  );
  const [products, setProducts] = useState(
    window?.productsToCompare.map((p) => transformFunc(p)) ?? []
  );
  const compareItems = [
    { label: 'Product Name & Image', key: 'name_image' },
    { label: 'Product Description', key: 'description' },
    { label: 'Brand', key: 'brand' },
    { label: 'Availability', key: 'stockInfo' },
    { label: 'Cook Type', key: 'cook-type' },
    { label: 'Total BTU', key: 'total-btu' },
    { label: 'Cooking Temperature Range', key: 'cooking-temperature-range' },
    { label: 'Total Grill Size', key: 'total-grill-size' },
    { label: 'Primary Cooking Space', key: 'primary-cooking-space' },
    { label: 'Number of racks ', key: 'number-of-racks' },
    { label: 'Rear Rotisserie Burner', key: 'rear-rotisserie-burner' },
    { label: 'Side Burner ', key: 'side-burner' },
    { label: 'Sear Functionality', key: 'sear-functionality' },
    { label: 'Action', key: 'action' },
  ];
  const handleRemoveIconClicked = (product) => {
    const newCompareProducts = pickBy(
      currentCompareProducts,
      (value) => value !== product.handle
    );
    console.log('newCompareProducts', newCompareProducts);
    localStorage.setItem('compare', JSON.stringify(newCompareProducts));
    setProducts((previousProducts) =>
      previousProducts.filter((p) => p.handle !== product.handle)
    );
  };
  const getCellContent = (item, product) => {
    switch (item.key) {
      case 'name_image': {
        return html`<div
          class="name-image-price-wrapper w-100"
          style="position: relative;"
        >
          <img
            class="w-100"
            src=${product.image}
            style="max-width: 300px;display: block;margin:0 auto;"
          />
          <h3>${product.name}</h3>
          <h4>${product.price}</h4>
          <i
            class="fa fa-close"
            style="position: absolute; right: 0; top: 0; cursor: pointer;"
            @click=${() => handleRemoveIconClicked(product)}
          ></i>
        </div>`;
      }
      case 'action': {
        return html`${product.variantId
          ? html`<a
              href=${`/cart/add?id=${product.variantId}&quantity=1`}
              class="btn btn-solid${product.available ? '' : ' disabled'}"
            >
              Add to cart >>
            </a>`
          : null}`;
      }
      default: {
        return !product?.[item.key]
          ? ''
          : Array.isArray(product[item.key])
          ? product[item.key].join(', ')
          : product[item.key];
      }
    }
  };
  return html` <div class="modal-header">
      ${TitleBanner({
        title: 'Compare Products',
        classList: [
          'd-flex',
          'justify-content-between',
          'align-items-center',
          'w-100',
        ],
      })}
    </div>
    ${products && (products?.length ?? 0) > 0
      ? html`<div class="modal-body">
          <div class="table-wrapper">
            <table class="table table-responsive border-0">
              <tbody id="table-compare">
                ${compareItems.map(
                  (item) => html`
                    <tr>
                      <th width="10%" class="text-white ${item.key}">
                        ${item.label}
                      </th>
                      ${products.map(
                        (product) => html`
                          <td
                            width="${90 / products.length}%"
                            class="${product.handle}-${item.key}${item.key !==
                              'name-image' && item.key !== 'description'
                              ? ' text-center'
                              : ''}"
                          >
                            ${getCellContent(item, product)}
                          </td>
                        `
                      )}
                    </tr>
                  `
                )}
              </tbody>
            </table>
          </div>
        </div>`
      : html`<div class="modal-body">
          <div class="table-wrapper">
            <table class="table table-responsive">
              <tbody id="table-compare">
                <div class="row cart-buttons compare-grid--empty-list">
                  <div class="col-12">
                    <div class="text-center">
                      <img
                        class=""
                        src="https://picsum.photos/200/300"
                        alt="Compare list loading"
                      />
                      <h5 class="title-font mb-3 empty-list--text ">
                        Your compare list is currently empty.
                      </h5>
                      <a href="/collections/Barbeques" class="btn btn-solid">
                        Start Shopping
                      </a>
                    </div>
                  </div>
                </div>
              </tbody>
            </table>
          </div>
        </div>`}
    <div class="modal-footer">
      <a
        href="javascript:void(0)"
        class="close-modal"
        @click=${() => {
          window?.$('.compare_modal')?.hide();
        }}
      >
        <i class="fa fa-close"></i>
      </a>
    </div>`;
}

export default {
  tagName: 'compare-table',
  renderer: CompareTable,
  options: {
    observedAttributes: ['empty-image'],
    useShadowDOM: false,
  },
};
