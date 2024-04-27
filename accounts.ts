import { gql } from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";
import { fetchGraphQL } from "./index.ts";

const getAccounts = gql`
  query AccountsQuery {
    accounts {
      id
      name
      displayName
      description
      externalId
      refreshToken
      accessToken
      expiresAt
      authorizationCode
      isEnabled
      status
      createdAt
      updatedAt
      userId
      user {
        id
      }
      integrations {
        id
      }
      app {
        id
        name
      }
      __typename
    }
  }
`;

const getAccountById = gql`
  query GetAccountById($id: String!) {
    account(id: $id) {
      id
      name
      description
      __typename
    }
  }
`;

const getAccountsByName = gql`
  query GetAccountsByName($name: String!) {
    accountsByAppName(appName: $name) {
      id
      name
      displayName
      description
      externalId
      refreshToken
      accessToken
      expiresAt
      authorizationCode
      isEnabled
      status
      createdAt
      updatedAt
      userId
      user {
        id
      }
      integrations {
        id
      }
      app {
        id
        name
      }
      __typename
    }
  }
`;

const accountsSdk = {
  accounts: {
    all: () => fetchGraphQL(getAccounts).then((response) => response.accounts),
    getById: (id: string) =>
      fetchGraphQL(getAccountById, { id }).then((response) => response.account),
    getByName: (name: string) =>
      fetchGraphQL(getAccountsByName, { name }).then(
        (response) => response.accountsByAppName
      ),
  },
};

export default accountsSdk;
