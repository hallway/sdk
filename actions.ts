import { gql } from 'https://deno.land/x/graphql_request/mod.ts'

import { fetchGraphQL } from '../sdk.ts'

const getActions = gql`
  query ActionsQuery {
    actions {
      id
      name
      description
      code
      __typename
    }
  }
`

const getActionById = gql`
  query GetActionById($id: String!) {
    action(id: $id) {
      id
      name
      description
      code
      __typename
    }
  }
`

const getActionByName = gql`
  query GetActionByName($appName: String!, $name: String!) {
    actionByName(appName: $appName, name: $name) {
      id
      name
      description
      code
      __typename
    }
  }
`

const writeCodeToMemoryAndImport = async (action: any) => {
  //const tempDirPath = './temp'
  //const tempFilePath = `${tempDirPath}/${action.id}.ts`

  // Create a blob from the action code
  const codeBlob = new Blob([action.code], { type: 'application/typescript' })
  const codeBlobUrl = URL.createObjectURL(codeBlob)

  console.log('blob', codeBlob)
  console.log('blob url', codeBlobUrl)

  // Dynamically import the module from the blob URL
  const module = await import(/* webpackIgnore: true */ codeBlobUrl)

  // Revoke the blob URL to clean up
  //URL.revokeObjectURL(codeBlobUrl)

  // Return the action object with the module
  return { ...action, module }
}

const actionsSdk = {
  actions: {
    get: () => fetchGraphQL(getActions),
    getById: async (id: string) => {
      const response = await fetchGraphQL(getActionById, { id })
      const action = response.action
      return writeCodeToMemoryAndImport(action)
    },
    getByName: async (appName: string, name: string) => {
      const response = await fetchGraphQL(getActionByName, { appName, name })
      const action = response.actionByName
      return writeCodeToMemoryAndImport(action)
    },
  },
}

export default actionsSdk
