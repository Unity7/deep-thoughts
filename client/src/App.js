import React from "react";
//create a middleware function that will retrieve the token for us and combine it with the existing httpLink
import { setContext } from "@apollo/client/link/context";

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

//import BrowserRouter as Router and Route from React-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import the other page components
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

//establish a new link to the GraphQL server at its /graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//instantiate the Apollo Client instance and create the connection to the API endpoint.
const client = new ApolloClient({
  link: authLink.concat(httpLink),

  //instantiate a new cache object
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
