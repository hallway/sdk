import { gql, request } from 'https://deno.land/x/graphql_request/mod.ts'

interface HallwaySdk {
  apps: AppsEndpoint
}

interface AppsEndpoint {
  get: () => Promise<App[]>
}

//TODO: Automate the domain types import from api\types\graphql.d.ts
interface App {
  id: string
  name: string
  logoUrl: string
  displayName: string
  authorizeUrl: string
  clientId: string
  refreshUrl: string
  audience: string
  isDevelopment: boolean
  actions: Action[]
}
interface Action {
  id: string
  name: string
  description: string
}

const graphqlEndpoint =
  Deno.env.get('GRAPHQL_ENDPOINT') || 'http://localhost:8910/api/graphql'

export default {
  apps: {
    get: () => {
      return request(graphqlEndpoint, getApps)
    },
  },
} as HallwaySdk
