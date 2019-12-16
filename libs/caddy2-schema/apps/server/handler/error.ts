
export const Error = {
  uri: 'http://caddy2-config/app/http/server/handler/error',
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['error'] },
      status_code: { type: 'number' },
      error: { type: 'string' },
    }
  }
}
