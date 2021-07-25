/* eslint-disable no-nested-ternary */
import {
  html,
  useEffect,
  component,
  useMemo,
  useReducer,
} from '@apollo-elements/haunted';
import slugify from 'slugify';
import { capitalCase } from 'capital-case';
import { CompareTable, MegaMenu, setupStart } from '../shared/index';
import RelatedProducts from '../components/productPage/RelatedProducts';
import Specifications from '../components/productPage/Specifications';
import useProductType from '../productTypes';

function ProductPage({
  productJson,
  similarMetafield,
  productMetafield,
  productTotalInventory,
}) {
  const product = JSON.parse(productJson);
  product.totalInventory = Number(productTotalInventory);
  const metafield = JSON.parse(productMetafield);
  // console.log('product', product);

  const specificationList = [
    { Brand: product.vendor },
    {
      Availability:
        product.totalInventory > 0
          ? html`<span class="instock-lable"
              ><i class="fa fa-check-circle" aria-hidden="true"></i>IN
              STOCK</span
            >`
          : product.available
          ? html`<span class="instock-lable"
              ><i class="fa fa-check-circle" aria-hidden="true"></i>PRE
              ORDER</span
            >`
          : html`<span class="outofstock-lable">OUT OF STOCK</span>`,
    },
    ...product.tags
      .filter((t) => t.startsWith('dtm_'))
      .map((tag) => ({
        [capitalCase(tag.split('_')[1])]: tag.split('_')?.[2] ?? true,
      })),
    ...Object.entries(metafield ?? {}).map(([key, value]) => ({
      [capitalCase(key)]: value,
    })),
  ].reduce((acc, cur) => {
    const [value] = Object.values(cur);
    const [key] = Object.keys(cur);
    acc[key] = value;
    return acc;
  }, {});

  // console.log(specificationList);

  const similar = JSON.parse(similarMetafield);

  const CurrentProductTypeClass = useMemo(() =>
    useProductType(slugify(product.type, { lower: true }), [product.type])
  );

  const initialState = CurrentProductTypeClass.transformInitialState({
    defaultSortBy: 'best-selling',
    initialValueFilterKeyPairs: {},
  });

  const [state, dispatch] = useReducer(
    CurrentProductTypeClass.reducer,
    initialState
  );

  const { queryAllProducts } = useMemo(
    () => new CurrentProductTypeClass(state),
    [CurrentProductTypeClass, state]
  );

  const { allProducts, fetchIsFinished } = state;

  useEffect(async () => {
    if (product.type !== 'Barbeques') {
      const videoWrapper = document.querySelector('#video-wrapper');
      videoWrapper?.remove();
    }
  }, []);

  useEffect(async () => {
    const products = await queryAllProducts();
    // console.log('allProducts:', products);
    dispatch({ type: 'setAllProducts', payload: products });
    dispatch({ type: 'setFetchIsFinished', payload: true });
    document.dispatchEvent(
      new CustomEvent('allProductsPreparedForRelatedProducts')
    );
  }, []);

  const sorter = (a, b) => {
    let compareResult = 0;
    similar.forEach((t, idx) => {
      switch (t) {
        case 'collection': {
          compareResult += (10 - idx) * 0;
          break;
        }
        case 'type': {
          compareResult += (10 - idx) * 0;
          break;
        }
        case 'price50': {
          compareResult +=
            (10 - idx) *
            (Math.abs(product.price / 100 - a.minVariantPrice) -
              Math.abs(product.price / 100 - b.minVariantPrice));
          break;
        }
        case 'brand': {
          compareResult +=
            (10 - idx) *
            (Math.abs(product.vendor.localeCompare(a.brand)) -
              Math.abs(product.vendor.localeCompare(b.brand))) *
            100;
          break;
        }
        default:
          break;
      }
    });
    return compareResult;
  };

  const filterFunc = (p) =>
    p.title !== product.title &&
    ((p.productType !== 'Barbeques' &&
      Math.abs(p.minVariantPrice - product.price / 100) /
        (product.price / 100) <=
        0.3) ||
      (p.productType === 'Barbeques' &&
        Math.abs(p.minVariantPrice - product.price / 100) <= 600));

  const relatedProducts = allProducts
    .sort(sorter)
    .filter(filterFunc)
    .slice(0, 10);

  return html`${product.type === 'Barbeques'
      ? html`<section
          class="specifications-wrapper ratio_square product-specifications"
        >
          ${Specifications({
            specificationList,
            description: product.description,
          })}
        </section>`
      : null}
    <section
      class="related-products-wrapper section-b-space ratio_square product-related equal_height"
    >
      ${RelatedProducts({ relatedProducts, fetchIsFinished })}
    </section>`;
}

[
  CompareTable,
  MegaMenu,
  {
    tagName: 'product-page',
    renderer: ProductPage,
    options: {
      observedAttributes: [
        'product-json',
        'product-total-inventory',
        'similar-metafield',
        'product-metafield',
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
