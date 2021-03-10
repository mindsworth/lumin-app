import Header from "./components/Header";
import HeroFilter from "./components/HeroFilter";
import ProductListing from "./components/ProductListing";
import Modal from "./components/Modal";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) =>
      alert(`Graphql error ${message}`)
    );
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://pangaea-interviews.now.sh/api/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <HeroFilter />
        <ProductListing />
        <Modal />
      </div>
    </ApolloProvider>
  );
}

export default App;
