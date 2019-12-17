
export const ClientAuthentication = {
  uri: 'http://caddy2-config/app/http/server/client_authentication',
  fileMatch: ['caddy2-edit:/config/app/http/server/client_authentication/config.json'],
  schema: {
    type: 'object',
    properties: {
      trusted_ca_certs: {
        type: 'array',
        items: { type: 'string' },
      },
      trusted_leaf_certs: {
        type: 'array',
        items: { type: 'string' },
      },
    }
  }
}
