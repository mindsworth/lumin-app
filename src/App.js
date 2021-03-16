import Header from "./components/Header";
import HeroFilter from "./components/HeroFilter";
import ProductListing from "./components/ProductListing";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import CartsContextProvider from "./contexts/CartsContext";
import ModalContextProvider from "./contexts/ModalContext";

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
      <CartsContextProvider>
        <ModalContextProvider>
          <div className="App">
            <Header />
            <HeroFilter />
            <ProductListing />
          </div>
        </ModalContextProvider>
      </CartsContextProvider>
    </ApolloProvider>
  );
}

export default App;
