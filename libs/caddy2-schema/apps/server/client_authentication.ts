
export const ClientAuthentication = {
  uri: 'http://caddy2-config/app/http/server/client_authentication',
  schema: {
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
