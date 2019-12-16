
export const Subroute = {
  uri: 'http://caddy2-config/app/http/server/handler/subroute',
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['subroute'] },
      routes: {
        type: 'array',
        items: {
          $ref: 'http://caddy2-config/app/http/server/route'
        }
      },
    }
  }
}