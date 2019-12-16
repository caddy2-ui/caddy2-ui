
export const StaticResponse = {
  uri: 'http://caddy2-config/app/http/server/handler/static_response',
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