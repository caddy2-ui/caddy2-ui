
export const Logging = {
  uri: "http://caddy2-config/Logging",
  schema: {
    sink: {
      $ref: 'http://caddy2-config/Logging/StandardLibLog',
    },
    logs: {
      type: 'object',
      items: { $ref: 'http://caddy2-config/Logging/CustomLog' }
    }
  }
} 
