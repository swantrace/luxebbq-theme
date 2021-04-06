import { html, useEffect, useState } from '@apollo-elements/haunted';
import slugify from 'slugify';
import { pageWrapper } from '../context';
import useProductType from '../productTypes';

function ProductTypeCollection({
  productType,
  allFilters,
  defaultSortBy,
  collectionTitle,
  collectionMetafield,
  emptyCollectionImage,
}) {
  const arrayOfFilters = JSON.parse(allFilters)
    .map((filter) => {
      const { selected, ...rest } = filter;
      return rest;
    })
    .filter((filter) => filter.stateKey);
  const initialValueFilterKeyPairs = JSON.parse(allFilters).reduce(
    (acc, cur) => {
      acc[cur.stateKey] = cur.selected;
      return acc;
    },
    {}
  );

  const collectionImages =
    JSON.parse(collectionMetafield ?? '{}')?.images ?? [];

  const {
    state,
    dispatch,
    queryAllProducts,
    queryFirstPageProducts,
    getFilteredSortedProducts,
    getFilteredSortedProductsOfCurrentPage,
    getPageCount,
    getDisplayedPageNumbers,
  } = new (useProductType(slugify(productType, { lower: true })))({
    defaultSortBy,
    initialValueFilterKeyPairs,
  });

  const [productsOfFirstPage, setProductsOfFirstPage] = useState([]);

  useEffect(async () => {
    const products = await queryFirstPageProducts();
    setProductsOfFirstPage(products);
  }, []);

  useEffect(async () => {
    const products = await queryAllProducts();
    console.log('products from queryAllProducts', products);
    dispatch({ type: 'setAllProducts', payload: products });
    dispatch({ type: 'setFetchIsFinished', payload: true });
  }, []);

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

export default {
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
};
