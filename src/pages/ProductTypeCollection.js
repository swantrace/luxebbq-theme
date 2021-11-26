import {
  html,
  useEffect,
  useState,
  component,
  useLayoutEffect,
  useMemo,
  useReducer,
} from '@apollo-elements/haunted';
import slugify from 'slugify';
import { CompareTable, MegaMenu, setupStart } from '../shared/index';
import { pageWrapper } from '../shared/context';
import useProductType from '../productTypes';
import ProductTypeSidebar from '../components/productTypeCollection/ProductTypeSidebar';
import ProductTypeMainContent from '../components/productTypeCollection/ProductTypeMainContent';

function ProductTypeCollection({
  productType,
  allFilters,
  defaultSortBy,
  collectionTitle,
  collectionMetafield,
  emptyCollectionImage,
}) {
  const CurrentProductTypeClass = useMemo(() =>
    useProductType(slugify(productType, { lower: true }), [productType])
  );

  const arrayOfFilters = useMemo(
    () =>
      JSON.parse(allFilters)
        .map((filter) => {
          const { selected, ...rest } = filter;
          return rest;
        })
        .filter((filter) => filter.stateKey),
    [allFilters]
  );

  const initialValueFilterKeyPairs = useMemo(
    () =>
      JSON.parse(allFilters).reduce((acc, cur) => {
        acc[cur.stateKey] = cur.selected;
        return acc;
      }, {}),
    [allFilters]
  );

  const collectionImages =
    JSON.parse(collectionMetafield ?? '{}')?.images ?? [];

  const initialState = CurrentProductTypeClass.transformInitialState({
    defaultSortBy,
    initialValueFilterKeyPairs,
  });

  console.log(
    'initialState: ',
    initialState,
    '\ninitialValueFilterKeyPairs: ',
    initialValueFilterKeyPairs
  );

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
    state,
    CurrentProductTypeClass,
  ]);

  const [productsOfFirstPage, setProductsOfFirstPage] = useState([]);

  useEffect(async () => {
    const products = await queryFirstPageProducts();
    setProductsOfFirstPage(products);
  }, []);

  useEffect(async () => {
    const products = await queryAllProducts();
    dispatch({ type: 'setAllProducts', payload: products });
    dispatch({ type: 'setFetchIsFinished', payload: true });
  }, []);

  // useEffect(() => {
  //   console.log(initialValueFilterKeyPairs);
  //   if (initialValueFilterKeyPairs.selectedCookTypesAndBrands) {
  //     dispatch({
  //       type: 'changeCookTypesAndBrands',
  //       payload: initialValueFilterKeyPairs.selectedCookTypesAndBrands,
  //     });
  //   }
  // }, [initialValueFilterKeyPairs]);

  useLayoutEffect(() => {
    document.dispatchEvent(
      new CustomEvent('stateChanged', { detail: { state } })
    );
  }, [state]);

  return html`${pageWrapper({
    children: html` <section class="section-b-space">
      <div class="collection-wrapper">
        <div class="container">
          <div class="row">
            <product-type-sidebar
              class="collection-filter col-sm-3"
            ></product-type-sidebar>
            <div class="collection-content col">
              <div class="page-main-content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-sm-12">
                      <product-type-main-content></product-type-main-content>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    productType,
    productsOfFirstPage,
    collectionImages,
    collectionTitle,
    arrayOfFilters,
    emptyCollectionImage,
    getFilteredSortedProducts,
    getFilteredSortedProductsOfCurrentPage,
    getPageCount,
    getDisplayedPageNumbers,
    state,
    dispatch,
  })}`;
}

[
  ProductTypeSidebar,
  ProductTypeMainContent,
  CompareTable,
  MegaMenu,
  {
    tagName: 'product-type-collection',
    renderer: ProductTypeCollection,
    options: {
      observedAttributes: [
        'product-type',
        'all-filters',
        'default-sort-by',
        'collection-title',
        'collection-metafield',
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
