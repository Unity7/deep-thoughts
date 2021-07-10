import React from "react";

import {
  //ApolloProvider is a special type of React component that we'll use to provide data to all of the other components.
  ApolloProvider,

  //ApolloClient is a constructor function that will help initialize the connection to the GraphQL API server.
  ApolloClient,

  //InMemoryCache enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.
  InMemoryCache,

  //createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
  createHttpLink,
} from "@apollo/client";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

//establish a new link to the GraphQL server at its /graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

//instantiate the Apollo Client instance and create the connection to the API endpoint.
const client = new ApolloClient({
  link: httpLink,

  //instantiate a new cache object
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
