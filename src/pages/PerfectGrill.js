import {
  html,
  useEffect,
  component,
  useMemo,
  useReducer,
} from '@apollo-elements/haunted';
import slugify from 'slugify';
import { CompareTable, MegaMenu, MegaMenu2, setupStart } from '../shared/index';
import { pageWrapper as perfectGrillWrapper } from '../shared/context';
import TitleBanner from '../components/common/TitleBanner';
import useProductType from '../productTypes';
import PerfectGrillSelectors from '../components/perfectGrill/PerfectGrillSelectors';
import ProductTypeMainContent from '../components/productTypeCollection/ProductTypeMainContent';

function PerfectGrill({
  cookTypesAndBrands,
  cookTypeLogos,
  priceRangeMinAndMax,
  grillCookingAreaMinAndMax,
  defaultSortBy,
  emptyCollectionImage,
}) {
  const CurrentProductTypeClass = useMemo(() =>
    useProductType(slugify('Barbeques', { lower: true }), [])
  );

  const initialState = CurrentProductTypeClass.transformInitialState({
    defaultSortBy,
    initiaValueFilterKeyPairs: {},
  });

  const [state, dispatch] = useReducer(
    CurrentProductTypeClass.reducer,
    initialState
  );

  const {
    queryAllProducts,
    queryFirstPageProducts,
    getFilteredSortedProducts,
    getFilteredSortedProductsOfCurrentPage,
    getPageCount,
    getDisplayedPageNumbers,
  } = useMemo(() => new CurrentProductTypeClass(state), [
    CurrentProductTypeClass,
    state,
  ]);

  useEffect(async () => {
    const products = await queryAllProducts();
    dispatch({ type: 'setAllProducts', payload: products });
    dispatch({ type: 'setFetchIsFinished', payload: true });
  }, []);

  return html`${perfectGrillWrapper({
    children: html`<section class="section-b-space pt-0">
      <div class="collection-wrapper">
        <div class="container dtm">
          <div class="row">
            <div
              class="col-lg-10 mx-auto perfect-grill-selectors-wrapper pt-5 px-md-5 pb-md-5"
            >
              ${TitleBanner({ title: "WHAT'S YOUR PERFECT GRILL?" })}
              <perfect-grill-selectors></perfect-grill-selectors>
            </div>
          </div>
          <div class="row pt-5">
            <div
              class="col-lg-10 mx-auto perfect-grill-product-list-wrapper pt-md-5"
            >
              <product-type-main-content
                .displaySidebarToggler=${false}
              ></product-type-main-content>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    brandInfo: JSON.parse(
      cookTypesAndBrands ??
        '[["Gas Grill",[]], ["Charcoal Grill",[]], ["Electric Grill",[]],["Offset Smoker",[]], ["Pellet Grill",[]], ["Pizza Oven",[]]}'
    ),
    cookTypeLogos: JSON.parse(
      cookTypeLogos ??
        '{"Gas Grill":"", "Charcoal Grill":"", "Electric Grill":"","Offset Smoker":"", "Pellet Grill":"", "Pizza Oven":""}'
    ),
    currentPriceRange: JSON.parse(priceRangeMinAndMax),
    currentGrillCookingAreaRange: JSON.parse(grillCookingAreaMinAndMax),
    collectionTitle: 'Matching Grills',
    queryFirstPageProducts,
    getFilteredSortedProducts,
    getFilteredSortedProductsOfCurrentPage,
    getPageCount,
    getDisplayedPageNumbers,
    state,
    dispatch,
    emptyCollectionImage,
  })}`;
}

[
  PerfectGrillSelectors,
  ProductTypeMainContent,
  CompareTable,
  MegaMenu,
  MegaMenu2,
  {
    tagName: 'perfect-grill',
    renderer: PerfectGrill,
    options: {
      observedAttributes: [
        'cook-types-and-brands',
        'cook-type-logos',
        'price-range-min-and-max',
        'grill-cooking-area-min-and-max',
        'default-sort-by',
        'empty-collection-image',
      ],
      useShadowDOM: false,
    },
  },
].forEach((pComponent) => {
  customElements.define(
    pComponent.tagName,
    component(pComponent.renderer, pComponent.options),
    pComponent?.elementOptions
  );
});

setupStart();
