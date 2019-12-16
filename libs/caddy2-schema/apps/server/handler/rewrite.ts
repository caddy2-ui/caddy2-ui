
export const Rewrite = {
  uri: 'http://caddy2-config/app/http/server/handler/rewrite',
  schema: {
    handler: { enum: ['rewrite'] },
    method: { type: 'string' },
    uri: { type: 'string' },
    strip_path_prefix: { type: 'string' },
    strip_path_suffix: { type: 'string' },
    rehandle: { type: 'string' },
    http_redirect: { type: 'number' },
  }
}
