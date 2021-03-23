import { ApolloClient, gql, InMemoryCache } from '@apollo/client/core';

const client = new ApolloClient({
  uri: `https://${process.env.SHOP_NAME}.myshopify.com/api/2021-01/graphql.json`,
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/graphql',
    'X-Shopify-Storefront-Access-Token': `${process.env.STOREFRONT_ACCESS_TOKEN}`,
  },
});

window.__APOLLO_CLIENT__ = client;

export const GET_PRODUCTS = gql`
  query getProducts(
    $first: Int
    $after: String
    $query: String
    $reverse: Boolean
    $sortKey: ProductSortKeys
  ) {
    products(
      first: $first
      after: $after
      query: $query
      reverse: $reverse
      sortKey: $sortKey
    ) {
      edges {
        cursor
        node {
          id
          onlineStoreUrl
          handle
          title
          availableForSale
          productType
          vendor
          images(first: 2) {
            edges {
              node {
                altText
                originalSrc
                transformedSrc(crop: CENTER, maxWidth: 340, maxHeight: 555)
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          tags
          description
        }
      }
    }
  }
`;

export default { GET_PRODUCTS };
