
export const RequestBody = {
  uri: 'http://caddy2-config/app/http/server/handler/request_body',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/request_body/config.json'],
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['request_body'] },
      max_size: { type: 'number' },
    }
  }
}
