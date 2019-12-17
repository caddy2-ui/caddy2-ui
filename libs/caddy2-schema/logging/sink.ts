
export const StandardLibLog = {
  uri: "http://caddy2-config/logging/sink",
  fileMatch: ['caddy2-edit:/config/logging/sink/config.json'],
  schema: {
    type: 'object',
    properties: {
      writer: {
        description: 'The module that writes out log entries for the sink.',
      }
    }
  }
}