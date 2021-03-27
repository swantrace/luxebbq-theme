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
