import { gql } from '@apollo/client/core';
import { useQuery, component, html } from '@apollo-elements/haunted';

const GET_PRODUCTS = gql`
  query getProducts {
    products(first: 50) {
      edges {
        node {
          id
          handle
        }
      }
    }
  }
`;

function productList() {
  const { loading, data, refetch, error } = useQuery(GET_PRODUCTS);
  console.log(loading, data, refetch, error);
  return html`<h1>hello world</h1>`;
}

customElements.define('product-list', component(productList));
