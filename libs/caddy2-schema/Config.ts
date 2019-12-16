
export const Config = {
  uri: 'http://caddy2-config/Config',
  schema: {
    type: 'object',
    properties: {
      admin: { $ref: "http://caddy2-config/AdminConfig" },
      logging: { $ref: "http://caddy2-config/Logging" },
    }
  }
}
