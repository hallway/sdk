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
  mutation RunWorkflow($id: String!, $input: JSON) {
    runWorkflow(id: $id, input: $input)
  }
`

const workflowsSdk = {
  workflows: {
    getById: (id: string) =>
        fetchGraphQL(getWorkflowById, { id }).then(response => {
          const workflow = response.workflow;
          return {
            ...workflow,
            run: (input) => { 
                console.log('input', input)
                return fetchGraphQL(runWorkflow, { id, input }).then(runResponse => runResponse.runWorkflow)
            }
          };
        }),
  },
}

export default workflowsSdk
