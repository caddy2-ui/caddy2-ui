
export const RequestBody = {
  uri: 'http://caddy2-config/app/http/server/handler/request_body',
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['request_body'] },
      max_size: { type: 'number' },
    }
  }
}
