
export const Templates = {
  uri: 'http://caddy2-config/app/http/server/handler/templates',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/templates/*.json'],
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['templates'] },
      include_root: { type: 'string' },
      mime_types: {
        type: 'array',
        items: { type: 'string' },
      },
      delimiters: {
        type: 'array',
        items: { type: 'string' },
      },
    }
  }
}