import { html } from '@apollo-elements/haunted';
import slugify from 'slugify';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';
import { removeKey } from '../../helpers';

function CookTypesAndBrandsFilter() {
  const context = useBarbequeSmokerCollectionContext();
  const brandInfo = context?.brandInfo ?? {};
  const selectedCookTypesAndBrands =
    context?.collectionState?.selectedCookTypesAndBrands ?? {};
  const searchString = context?.collectionState?.searchString ?? '';
  const allProducts = context?.collectionState?.allProducts ?? [];
  const dispatch = context?.collectionDispatch ?? (() => {});
  // console.log('selectedCookTypesAndBrands', selectedCookTypesAndBrands);
  const handleCookTypeChanged = (cookType, e) => {
    const cookTypeInput = e.target;
    if (cookTypeInput.checked) {
      dispatch({
        type: 'changeCookTypesAndBrands',
        payload: {
          ...selectedCookTypesAndBrands,
          [cookType]: [],
        },
      });
    } else {
      dispatch({
        type: 'changeCookTypesAndBrands',
        payload: removeKey(selectedCookTypesAndBrands, [cookType]),
      });
      const brandInputs = cookTypeInput
        .closest('.collection-filter-checkbox')
        .querySelectorAll('ul li input');
      brandInputs.forEach((input) => {
        // eslint-disable-next-line no-param-reassign
        input.checked = false;
      });
    }
  };
  const handleBrandChanged = (cookType, brand, e) => {
    const brandInput = e.target;
    if (brandInput.checked) {
      dispatch({
        type: 'changeCookTypesAndBrands',
        payload: {
          ...selectedCookTypesAndBrands,
          [cookType]: [...selectedCookTypesAndBrands[cookType], brand],
        },
      });
    } else {
      dispatch({
        type: 'changeCookTypesAndBrands',
        payload: {
          ...selectedCookTypesAndBrands,
          [cookType]: selectedCookTypesAndBrands[cookType].filter(
            (b) => b !== brand
          ),
        },
      });
    }
  };
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
                    ?disabled=${allProducts.length === 0 ||
                    searchString.trim().length > 0}
                    type="checkbox"
                    class="form-control-input"
                    id=${slugify(cookType)}
                    ?checked=${!!selectedCookTypesAndBrands?.[cookType]}
                    @change=${(e) => handleCookTypeChanged(cookType, e)}
                  />
                  <label class="form-control-label" for=${slugify(cookType)}
                    >${cookType}</label
                  >
                  <ul
                    class="sidebar_filter_cls sidebar_brands${selectedCookTypesAndBrands?.[
                      cookType
                    ]
                      ? ''
                      : ' hidden'}"
                    id="brands_filter"
                  >
                    ${brands.map(
                      (brand) => html`
                        <li>
                          <div
                            class="form-control custom-checkbox collection-filter-checkbox"
                          >
                            <input
                              ?disabled=${allProducts.length === 0 ||
                              searchString.trim().length > 0}
                              type="checkbox"
                              class="custom-checkbox collection-filter-checkbox"
                              id=${slugify(brand)}
                              ?checked=${!!selectedCookTypesAndBrands?.[
                                cookType
                              ]?.includes(brand)}
                              @change=${(e) =>
                                handleBrandChanged(cookType, brand, e)}
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
