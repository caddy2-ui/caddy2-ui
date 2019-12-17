
export const Authentication = {
  uri: 'http://caddy2-config/app/http/server/handler/authentication',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/authentication/*.json'],
  schema: {
    type: 'object',
    properties: {
      handler: {
        enum: ['authentication']
      },
      providers: {
        type: 'object',
        properties: {
          http_basic: {
            type: 'object',
            properties: {
              hash: { enum: ['bcrypt', 'scrypt'], },
              n: { type: 'number' },
              r: { type: 'number' },
              p: { type: 'number' },
              key_length: { type: 'number' },
            },
            accounts: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' },
                  salt: { type: 'string' },
                }
              }
            },
            realm: { type: 'string' },
          }
        }
      }
    }
  }
}
