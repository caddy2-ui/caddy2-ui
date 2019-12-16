
export const Templates = {
  uri: 'http://caddy2-config/app/http/server/handler/templates',
  schema: {
    type: 'object',
    patternProperties: {
      "handler": { type: 'vars' },
      "^": { type: 'string' },
    }
  }
}
