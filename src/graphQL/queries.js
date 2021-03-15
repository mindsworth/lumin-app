import { gql } from "@apollo/client";

export const FETCH_PRODUCTS = gql`
  query Products($currency: Currency) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;
export const FETCH_CURRENCY = gql`
  query {
    currency
  }
`;
