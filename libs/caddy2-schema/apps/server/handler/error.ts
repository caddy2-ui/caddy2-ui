
export const Error = {
  uri: 'http://caddy2-config/app/http/server/handler/error',
  schema: {
    handler: { enum: ['error'] },
    status_code: { type: 'number' },
    error: { type: 'string' },
  }
}
