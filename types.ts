// filename: types.ts

export interface HallwaySdk {
  apps: AppsEndpoint
}

export interface AppsEndpoint {
  get: () => Promise<App[]>
  getByName: (name: string) => Promise<App | undefined>
}

export interface App {
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

export interface Action {
  id: string
  name: string
  description: string
  code: string
}
