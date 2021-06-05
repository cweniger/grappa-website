// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const spaceId = process.env.CONTENTFUL_SPACE;
const environmentId = process.env.CONTENTFUL_ENV;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environmentId}`,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
});

export default client;

//   const contentType = "textBlock";

//   const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
//   const response = await fetch(URL);
//   const textBlock = await response.json();
