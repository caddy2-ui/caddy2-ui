
export const App = {
  uri: 'http://caddy2-config/app',
  schema: {
    type: 'object',
    properties: {
      http: {
        $ref: 'http://caddy2-config/app/http',
      },
    },
  }
}
