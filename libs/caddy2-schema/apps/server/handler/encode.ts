
export const Encode = {
  uri: 'http://caddy2-config/app/http/server/handler/encode',
  schema: {
    handler: { enum: ['encode'] },
    encodings: {
      type: 'object',
      properties: {
        gzip: {
          type: 'object',
          properties: {
            level: { type: 'number' },
          },
        },
        zstd: {},
        brotli: {
          type: 'object',
          properties: {
            quality: { type: 'number' },
          },
        },
      }
    },
    prefer: { type: 'string' },
    minimum_length: { type: 'number' },
  }
}
