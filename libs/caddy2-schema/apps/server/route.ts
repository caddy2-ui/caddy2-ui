
export const Route = {
  uri: 'http://caddy2-config/app/http/server/route',
  schema: {
    group: {
      type: 'string',
    },
    match: {
      type: 'array',
      items: { $ref: 'http://caddy2-config/app/http/server/matcher' },
    },
    handle: {
      type: 'array',
      items: { $ref: 'http://caddy2-config/app/http/server/handler' },
    },
    terminal: {
      type: 'boolean',
    }
  }
}
