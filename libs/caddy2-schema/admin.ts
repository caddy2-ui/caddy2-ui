
export const AdminConfig = {
  uri: 'http://caddy2-config/admin',
  fileMatch: ['caddy2-edit:/config/admin/*.json'],
  schema: {
    type: 'object',
    properties: {
      disabled: {
        type: 'boolean',
        description: [
          `If true, the admin endpoint will be completely disabled.`,
          `Note that this makes any runtime changes to the config`,
          `impossible, since the interface to do so is through the`,
          `admin endpoint.`,
        ].join(' ')
      },
      listen: {
        type: 'string',
        description: [
          'The address to which the admin endpoint\'s listener should',
          'bind itself. Can be any single network address that can be',
          'parsed by Caddy.',
        ].join(' '),
      },
      enforce_origin: {
        type: 'boolean',
        description: [
          `If true, CORS headers will be emitted, and requests to the`,
          `API will be rejected if their \`Host\` and \`Origin\` headers`,
          `do not match the expected value(s). Use \`origins\` to`,
          `customize which origins/hosts are allowed.If \`origins\` is`,
          `not set, the listen address is the only value allowed by`,
          `default.`,
        ].join(' ')
      },
      origins: {
        type: 'array',
        items: {
          type: 'string',
        }
      }
    }
  }
}
