console.log('a')

import { gql } from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";

import { fetchGraphQL } from './index.ts'

const getWorkflowById = gql`
  query GetWorkflowById($id: String!) {
    workflow(id: $id) {
      id
      createdAt
      updatedAt
      denoId
      name
      description
      code
      user {
        id
      }
      deployments {
        id
        input
        output
      }
    }
  }
`

const runWorkflow = gql`
  mutation RunWorkflow($id: String!) {
    run(id: $id) @requireAuth
  }
`

const workflowsSdk = {
  workflows: {
    getById: (id: string) =>
        fetchGraphQL(getWorkflowById, { id }).then(response => {
          const workflow = response.workflow;
          return {
            ...workflow,
            run: () => fetchGraphQL(runWorkflow, { id }).then(runResponse => runResponse.data)
          };
        }),
  },
}

export default workflowsSdk
