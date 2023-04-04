declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string
      NODE_ENV: 'development' | 'production' | 'test' | string
      PWD: string
      PORT?: string
      POSTGRES_USER?: string
      POSTGRES_PASSWORD?: string
      POSTGRES_DB?: string
      POSTGRES_PORT?: string
    }
  }
}
