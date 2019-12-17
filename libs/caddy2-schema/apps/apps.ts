
export const App = {
  uri: 'http://caddy2-config/app',
  fileMatch: ['caddy2-edit:/config/app/config.json'],
  schema: {
    type: 'object',
    properties: {
      http: {
        $ref: 'http://caddy2-config/app/http',
      },
    },
  }
}
