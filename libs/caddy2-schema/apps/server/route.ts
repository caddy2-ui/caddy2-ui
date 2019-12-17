
export const Route = {
  uri: 'http://caddy2-config/app/http/server/route',
  fileMatch: ['caddy2-edit:/config/app/http/server/route/config.json'],
  schema: {
    type: 'object',
    properties: {
      group: {
        type: 'string',
      },
      match: {
        type: 'array',
        items: { $ref: 'http://caddy2-config/app/http/server/matcher' },
      },
      handle: {
        type: 'array',
        items: {
          anyOf: [
            { $ref: 'http://caddy2-config/app/http/server/handler/authentication' },
            { $ref: 'http://caddy2-config/app/http/server/handler/cache' },
            { $ref: 'http://caddy2-config/app/http/server/handler/encode' },
            { $ref: 'http://caddy2-config/app/http/server/handler/error' },
            { $ref: 'http://caddy2-config/app/http/server/handler/file_server' },
            { $ref: 'http://caddy2-config/app/http/server/handler/headers' },
            { $ref: 'http://caddy2-config/app/http/server/handler/markdown' },
            { $ref: 'http://caddy2-config/app/http/server/handler/request_body' },
            { $ref: 'http://caddy2-config/app/http/server/handler/rewrite' },
            { $ref: 'http://caddy2-config/app/http/server/handler/static_response' },
            { $ref: 'http://caddy2-config/app/http/server/handler/subroute' },
            { $ref: 'http://caddy2-config/app/http/server/handler/templates' },
            { $ref: 'http://caddy2-config/app/http/server/handler/vars' },
            { $ref: 'http://caddy2-config/app/http/server/handler/reverse_proxy' },
          ]
        },
      },
      terminal: {
        type: 'boolean',
      }
    }
  }
}