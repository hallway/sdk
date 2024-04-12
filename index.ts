import {
  request,
  GraphQLClient,
} from 'https://deno.land/x/graphql_request/mod.ts'

import accountsSdk from './sdk/accounts.ts'
import actionsSdk from './sdk/actions.ts'
import appsSdk from './sdk/apps.ts'
import sandboxesSdk from './sdk/sandboxes.ts'

export const graphqlEndpoint =
  Deno.env.get('GRAPHQL_ENDPOINT') || 'https://hallway.ngrok.app/api/graphql'

// Abstract request method for querying GraphQL with authorization
export async function fetchGraphQL(
  query: string,
  variables?: Record<string, any>
) {
  // Retrieve the token from the environment variable
  const key = Deno.env.get('HALLWAY_API_KEY')

  const client = new GraphQLClient(graphqlEndpoint, {
    headers: {
      authorization: `Bearer ${key}`,
      // Conditionally add the Authorization header if the token exists
      'auth-provider': 'api-key',
      'api-key': key,
      'Content-Type': 'application/json',
    },
  })

  return client.request(query, variables)
}

// Combining both SDKs into a single object
const sdk = {
  actions: actionsSdk.actions,
  apps: appsSdk.apps,
  accounts: accountsSdk.accounts,
  sandboxes: sandboxesSdk.sandboxes,
}

export default sdk
