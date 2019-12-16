
export const Vars = {
  uri: 'http://caddy2-config/app/http/server/handler/vars',
  schema: {
    type: 'object',
    properties: {
      "handler": { enum: ['vars'] },
    },
    patternProperties: {
      "^": { type: 'string' },
    }
  }
}
