import {
  request,
  GraphQLClient,
} from "https://deno.land/x/graphql_request/mod.ts";

import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";

const dotenv = await load();

import accountsSdk from "./accounts.ts";
//import actionsSdk from "./actions.ts";
import appsSdk from "./apps.ts";
import sandboxesSdk from "./sandboxes.ts";
import workflowsSdk from "./workflows.ts";

export const graphqlEndpoint =
  Deno.env.get("GRAPHQL_ENDPOINT") || "https://hallway.com/api/graphql";

// Abstract request method for querying GraphQL with authorization
export async function fetchGraphQL(
  query: string,
  variables?: Record<string, any>
) {
  // Retrieve the token from the environment variable
  const key = Deno.env.get("HALLWAY_API_KEY") || dotenv.HALLWAY_API_KEY;
  console.log(key);

  const client = new GraphQLClient(graphqlEndpoint, {
    headers: {
      authorization: `Bearer ${key}`,
      // Conditionally add the Authorization header if the token exists
      "auth-provider": "api-key",
      "api-key": key,
      "Content-Type": "application/json",
    },
  });

  return client.request(query, variables);
}

// Combining both SDKs into a single object
const sdk = {
  //actions: actionsSdk.actions,
  apps: appsSdk.apps,
  accounts: accountsSdk.accounts,
  sandboxes: sandboxesSdk.sandboxes,
  workflows: workflowsSdk.workflows,
};

export default sdk;
