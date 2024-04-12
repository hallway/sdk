import { gql } from "https://deno.land/x/graphql_request/mod.ts";
import { fetchGraphQL } from "./index.ts";

const getApps = gql`
  query AppsTableQuery {
    apps {
      id
      name
      logoUrl
      displayName
      authorizeUrl
      clientId
      refreshUrl
      audience
      isDevelopment
      actions {
        id
        name
        description
        __typename
      }
      __typename
    }
  }
`;

const getAppByName = gql`
  query GetAppByName($name: String!) {
    appByName(name: $name) {
      id
      name
      logoUrl
      displayName
      authorizeUrl
      clientId
      refreshUrl
      audience
      isDevelopment
      actions {
        id
        name
        description
        __typename
      }
      __typename
    }
  }
`;

const appsSdk = {
  apps: {
    get: () => fetchGraphQL(getApps).then((response) => response.apps),
    getByName: (name: string) =>
      fetchGraphQL(getAppByName, { name }).then((response) => response.apps[0]),
  },
};

export default appsSdk;
