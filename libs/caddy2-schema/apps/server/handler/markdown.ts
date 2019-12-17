
export const Markdown = {
  uri: 'http://caddy2-config/app/http/server/handler/markdown',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/markdown/config.json'],
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['markdown'] },
    }
  }
}
