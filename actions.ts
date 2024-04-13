import { gql } from "https://deno.land/x/graphql_request/mod.ts";

import { fetchGraphQL } from "./index.ts";

const getActions = gql`
  query ActionsQuery {
    actions {
      id
      name
      description
      code
      app {
        id
        name
        __typename
      }
      __typename
    }
  }
`;

const getActionById = gql`
  query GetActionById($id: String!) {
    action(id: $id) {
      id
      name
      description
      code
      app {
        id
        name
        __typename
      }
      __typename
    }
  }
`;

const getActionByName = gql`
  query GetActionByName($appName: String!, $name: String!) {
    actionByName(appName: $appName, name: $name) {
      id
      name
      description
      code
      app {
        id
        name
        __typename
      }
      __typename
    }
  }
`;

const writeCodeToMemoryAndImport = async (action: any) => {
  const initialUrl = `https://deno.land/x/hallway_sdk/actions/${action.app.name}/${action.name}.ts`;

  // Fetch the URL to check for a redirect
  const response = await fetch(initialUrl);
  const finalUrl = response.url; // This will be the redirected URL if there was a redirect

  console.log("Resolved URL for import:", finalUrl);

  // Dynamically import the module from the final URL
  const module = await import(finalUrl);

  // Return the action object with the module
  return { ...action, module };
};

const actionsSdk = {
  actions: {
    get: () => fetchGraphQL(getActions),
    getById: async (id: string) => {
      const response = await fetchGraphQL(getActionById, { id });
      const action = response.action;
      return writeCodeToMemoryAndImport(action);
    },
    getByName: async (appName: string, name: string) => {
      const response = await fetchGraphQL(getActionByName, { appName, name });
      const action = response.actionByName;
      return writeCodeToMemoryAndImport(action);
    },
  },
};

export default actionsSdk;
