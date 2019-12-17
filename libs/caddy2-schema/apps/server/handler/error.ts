
export const Error = {
  uri: 'http://caddy2-config/app/http/server/handler/error',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/error/*.json'],
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['error'] },
      status_code: { type: 'number' },
      error: { type: 'string' },
    }
  }
}
