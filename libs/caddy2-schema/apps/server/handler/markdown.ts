
export const Markdown = {
  uri: 'http://caddy2-config/app/http/server/handler/markdown',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/markdown/*.json'],
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['markdown'] },
    }
  }
}
