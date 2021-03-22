import { html } from '@apollo-elements/haunted';
import slugify from 'slugify';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';

function CookTypesAndBrandsFilter() {
  const context = useBarbequeSmokerCollectionContext();
  const brandInfo = context?.brandInfo ?? {};
  const selectedCookTypesAndBrands =
    context?.collectionState?.selectedCookTypesAndBrands ?? {};
  return html` <div class="collection-collapse-block">
    <h3 class="collapse-block-title">Cook Type / Brands</h3>
    <div class="collection-collapse-block-content">
      <div class="collection-brand-filter">
        <ul
          class="sidebar_filter_cls sidebar_cook_types"
          id="cook_types_filter"
        >
          ${Object.entries(brandInfo).map(
            ([cookType, brands]) => html`
              <li>
                <div
                  class="form-control custom-checkbox collection-filter-checkbox"
                >
                  <input
                    type="checkbox"
                    class="form-control-input"
                    id=${slugify(cookType)}
                    ?checked=${!!selectedCookTypesAndBrands?.[cookType]}
                  />
                  <label class="form-control-label" for=${slugify(cookType)}
                    >${cookType}</label
                  >
                  <ul
                    class="sidebar_filter_cls sidebar_brands"
                    id="brands_filter"
                  >
                    ${brands.map(
                      (brand) => html`
                        <li>
                          <div
                            class="form-control custom-checkbox collection-filter-checkbox"
                          >
                            <input
                              type="checkbox"
                              class="custom-checkbox collection-filter-checkbox"
                              id=${slugify(brand)}
                              ?checked=${!!selectedCookTypesAndBrands?.[
                                cookType
                              ]?.includes(brand)}
                            />
                            <label
                              class="form-control-label"
                              for=${slugify(brand)}
                              >${brand}</label
                            >
                          </div>
                        </li>
                      `
                    )}
                  </ul>
                </div>
              </li>
            `
          )}
        </ul>
      </div>
    </div>
  </div>`;
}

export default {
  tagName: 'cook-types-and-brands-filter',
  renderer: CookTypesAndBrandsFilter,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
