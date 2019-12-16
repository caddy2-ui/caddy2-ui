
export const Server = {
  uri: 'http://caddy2-config/app/http/server',
  schema: {
    type: 'object',
    properties: {
      listen: {
        type: 'array',
        items: { type: 'string' },
      },
      read_timeout: {
        type: 'number',
      },
      read_header_timeout: {
        type: 'number',
      },
      write_timeout: {
        type: 'number',
      },
      idle_timeout: {
        type: 'number',
      },
      max_header_bytes: {
        type: 'number',
      },
      routes: {
        type: 'array',
        items: { $ref: 'http://caddy2-config/app/http/server/route', },
      },
      errors: {
        type: 'object',
        properties: {
          routes: {
            type: 'array',
            items: { $ref: 'http://caddy2-config/app/http/server/route', },
          }
        },
      },
      tls_connection_policies: {
        type: 'array',
        items: { $ref: 'http://caddy2-config/app/http/server/tls_connection_policy' },
      },
      automatic_https: {
        $ref: 'http://caddy2-config/app/http/server/automatic_https',
      },
      max_rehandles: {
        type: 'number',
      },
      strict_sni_host: {
        type: 'boolean',
      },
      logs: {
        type: 'object',
        patternProperties: {
          "^": { type: 'string' },
        },
      },
      experimental_http3: {
        type: 'boolean',
      }
    }
  }
}