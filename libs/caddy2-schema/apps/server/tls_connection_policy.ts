
export const Server = {
  uri: 'http://caddy2-config/app/http/server/tls_connection_policy',
  schema: {
    match: {
      type: 'object',
      properties: {
        sni: {
          type: 'array',
          items: { type: 'string' },
        }
      }
    },
    alpn: {
      type: 'array',
      items: { type: 'string' },
    },
    cipher_suites: {
      type: 'array',
      items: { type: 'string' },
    },
    curves: {
      type: 'array',
    },
    protocol_min: {
      type: 'array',
      items: { enum: ['tls1.1', 'tls1.2', 'tls1.3'] },
    },
    protocol_max: {
      type: 'array',
      items: { enum: ['tls1.1', 'tls1.2', 'tls1.3'] },
    },
    certificate_selection: {},
    client_authentication: {
      $ref: 'http://caddy2-config/app/http/server/client_authentication',
    },
  }
}
