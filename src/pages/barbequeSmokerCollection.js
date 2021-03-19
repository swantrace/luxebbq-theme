import { html, useEffect, useState } from '@apollo-elements/haunted';
import CollectionBanner from '../components/common/CollectionBanner';
import CollectionProductsCount from '../components/common/CollectionProductsCount';
import CollectionProductsPerPageController from '../components/common/CollectionProductsPerPageController';
import CollectionSortByController from '../components/common/CollectionSortByController';
import CollectionViewModeChanger from '../components/common/CollectionViewModeChanger';

function BarbequeSmokerCollection({
  cookTypesAndBrands,
  priceRangeMinAndMax,
  grillCookingAreaMinAndMax,
  totalProductsCount,
}) {
  const brandInfo = JSON.parse(
    cookTypesAndBrands ??
      '{"Gas Grill":[], "Charcoal Grill":[], "Pellet Grill":[], "Oven":[]}'
  );
  const [minPrice, maxPrice] = JSON.parse(
    priceRangeMinAndMax ?? '[0, 0]'
  ).map((p) => Math.floor(Number(p)));
  const [minGrillCookingArea, maxGrillCookingArea] = JSON.parse(
    grillCookingAreaMinAndMax ?? '[0, 0]'
  ).map((p) => Math.floor(Number(p)));
  const productsCount = Math.floor(Number(totalProductsCount ?? 0));
  const [currentPriceRange, setCurrentPriceRange] = useState([0, 0]);
  const [currentGrillCookingArea, setCurrentGrillCookingArea] = useState([
    0,
    0,
  ]);
  useEffect(() => {
    setCurrentPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  useEffect(() => {
    setCurrentGrillCookingArea([minGrillCookingArea, maxGrillCookingArea]);
  }, [minGrillCookingArea, maxGrillCookingArea]);

  console.log(
    brandInfo,
    productsCount,
    currentPriceRange,
    currentGrillCookingArea
  );
  return html` ${CollectionBanner({ collectionName: 'Barbeques/Smokers' })}
    <hr />
    ${CollectionProductsCount({ productsCount: 28, productTypeName: 'Grills' })}
    <hr />
    ${CollectionViewModeChanger()}
    <hr />
    ${CollectionProductsPerPageController()}
    <hr />
    ${CollectionSortByController()}`;
}

export default {
  tagName: 'barbeque-smoker-collection',
  renderer: BarbequeSmokerCollection,
  options: {
    observedAttributes: [
      'cook-types-and-brands',
      'price-range-min-and-max',
      'grill-cooking-area-min-and-max',
      'total-products-count',
    ],
    useShadowDOM: false,
  },
};
