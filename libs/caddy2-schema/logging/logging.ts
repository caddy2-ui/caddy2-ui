
export const Logging = {
  uri: "http://caddy2-config/logging",
  fileMatch: ['caddy2-edit:/config/logging/config.json'],
  schema: {
    type: 'object',
    properties: {
      sink: {
        $ref: 'http://caddy2-config/logging/sink',
      },
      logs: {
        type: 'object',
        patternProperties: {
          "^": { $ref: 'http://caddy2-config/logging/logs' }
        }
      }
    }
  }
}