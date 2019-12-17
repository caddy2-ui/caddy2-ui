
export const Rewrite = {
  uri: 'http://caddy2-config/app/http/server/handler/rewrite',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/rewrite/*.json'],
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['rewrite'] },
      method: { type: 'string' },
      uri: { type: 'string' },
      strip_path_prefix: { type: 'string' },
      strip_path_suffix: { type: 'string' },
      rehandle: { type: 'string' },
      http_redirect: { type: 'number' },
    }
  }
}