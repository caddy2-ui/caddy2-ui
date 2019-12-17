
export const StaticResponse = {
  uri: 'http://caddy2-config/app/http/server/handler/static_response',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/static_response/*.json'],
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['static_response'] },
      status_code: { type: 'number' },
      headers: { $ref: 'http://caddy2-config/app/http/server/handler/headers/set-headers' },
      body: { type: 'string' },
      close: { type: 'boolean' },
    }
  }
}