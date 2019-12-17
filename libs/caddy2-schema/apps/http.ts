
export const HTTP = {
  uri: 'http://caddy2-config/app/http',
  fileMatch: ['caddy2-edit:/config/app/http/*.json'],
  schema: {
    type: 'object',
    properties: {
      http_port: {
        type: 'number',
        description: 'The port to use for HTTP (optional; used for automatic HTTPS).',
      },
      https_port: {
        type: 'number',
        description: 'The port to use for HTTPS (optional; used for automatic HTTPS).',
      },
      grace_period: {
        type: 'string',
        description: `How long to allow servers to shut down gracefully before forcing them to stop. Duration values follow Go's time.Duration format, e.g. \`"10s"\` or \`"1m30s"\``,
      },
      servers: {
        type: 'object',
        patternProperties: {
          "^": { $ref: 'http://caddy2-config/app/http/server' }
        },
      },
    }
  }
}
