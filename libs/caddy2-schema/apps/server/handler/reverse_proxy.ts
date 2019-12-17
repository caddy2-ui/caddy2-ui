
export const ReverseProxy = {
  uri: 'http://caddy2-config/app/http/server/handler/reverse_proxy',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/reverse_proxy/*.json'],
  schema: {
    type: 'object',
  }
}
