
export const Templates = {
  uri: 'http://caddy2-config/app/http/server/handler/templates',
  schema: {
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
