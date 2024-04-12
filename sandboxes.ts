import { gql } from "https://deno.land/x/graphql_request/mod.ts";
import { fetchGraphQL } from "./index.ts";

interface Message {
  id: string;
  createdAt: string;
  updatedAt: string;
  sandboxId: string;
  message: string;
  error?: string;
  response?: string;
  runId?: string;
  status?: string;
  statusUpdatedAt?: string;
}

interface Sandbox {
  id: string;
  e2bId?: string;
  createdAt: string;
  updatedAt: string;
  workflowId?: string;
  chatId?: string;
  __typename: string;
  messages: Message[];
  addMessage: (
    message: string,
    error?: string,
    response?: string,
    runId?: string,
    status?: string,
    statusUpdatedAt?: string
  ) => Promise<any>; // Adjust the function signature as needed.
}

const getAllSandboxes = gql`
  query AllSandboxesQuery {
    sandboxes {
      id
      e2bId
      createdAt
      updatedAt
      workflowId
      chatId
      __typename
      messages {
        id
        createdAt
        updatedAt
        message
        error
        response
        runId
        status
        statusUpdatedAt
      }
    }
  }
`;

const getSandboxById = gql`
  query GetSandboxById($id: String!) {
    sandbox(id: $id) {
      id
      e2bId
      createdAt
      updatedAt
      workflowId
      chatId
      __typename
      messages {
        id
        createdAt
        updatedAt
        message
        error
        response
        runId
        status
        statusUpdatedAt
      }
    }
  }
`;

const createSandbox = gql`
  mutation CreateSandbox($input: CreateSandboxInput) {
    createSandbox(input: $input) {
      id
      e2bId
      createdAt
      updatedAt
      workflowId
      chatId
      messages {
        id
        createdAt
        updatedAt
        message
        error
        response
        runId
        status
        statusUpdatedAt
      }
    }
  }
`;

// Updated mutation based on the new schema provided
const createMessageMutation = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      createdAt
      updatedAt
      sandbox {
        id
      }
      sandboxId
      message
      error
      response
      runId
      status
      statusUpdatedAt
    }
  }
`;

// Utility function to enhance a sandbox with additional functionality
function enhanceSandbox(sandbox: Sandbox): Sandbox {
  sandbox.addMessage = (
    message: string,
    error?: string,
    response?: string,
    runId?: string,
    status?: string,
    statusUpdatedAt?: string
  ) => {
    const input = {
      sandboxId: sandbox.id,
      message,
      error,
      response,
      runId,
      status,
      statusUpdatedAt,
    };
    // Call the createMessage mutation with the assembled input.
    return fetchGraphQL(createMessageMutation, { input });
  };
  return sandbox;
}

const sandboxesSdk = {
  sandboxes: {
    all: () => fetchGraphQL(getAllSandboxes),
    get: async (id: string): Promise<Sandbox> => {
      const response = await fetchGraphQL(getSandboxById, { id });
      let sandbox: Sandbox = response.sandbox;
      sandbox = enhanceSandbox(sandbox);
      return sandbox;
    },
    create: async (input?) => {
      const response = await fetchGraphQL(createSandbox, { input });
      let sandbox: Sandbox = response.createSandbox;
      sandbox = enhanceSandbox(sandbox);
      return sandbox;
    },
  },
};

export default sandboxesSdk;
