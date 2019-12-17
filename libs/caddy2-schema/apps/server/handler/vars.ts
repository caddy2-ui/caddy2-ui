
export const Vars = {
  uri: 'http://caddy2-config/app/http/server/handler/vars',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/vars/*.json'],
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
