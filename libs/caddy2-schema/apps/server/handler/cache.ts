
export const Cache = {
  uri: 'http://caddy2-config/app/http/server/handler/cache',
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['cache'] },
      self: { type: 'string' },
      peers: {
        type: 'array',
        items: { type: 'string' },
      },
      max_size: { type: 'number' },
    }
  }
}
