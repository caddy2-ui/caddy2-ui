
export const ReverseProxy = {
  uri: 'http://caddy2-config/app/http/server/handler/reverse_proxy',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/reverse_proxy/*.json'],
  schema: {
    type: 'object',
    properties: {
      handler: { enum: ['reverse_proxy'] },
      transport: {
        oneOf: [
          { $ref: 'http://caddy2-config/app/http/server/handler/reverse_proxy/http_transport' },
          { $ref: 'http://caddy2-config/app/http/server/handler/reverse_proxy/fastcgi_transport' },
        ]
      },
      flush_interval: { type: 'number' },
      circuit_breaker: {},
      load_balancing: {
        oneOf: [
          {
            type: 'object',
            properties: {
              policy: { enum: ['round_robin'] }
            }
          },
          {
            type: 'object',
            properties: {
              policy: { enum: ['random'] }
            }
          },
          {
            type: 'object',
            properties: {
              policy: { enum: ['random_choose'] },
              choose: { type: 'number' },
            }
          },
          {
            type: 'object',
            properties: {
              policy: { enum: ['least_conn'] }
            }
          },
          {
            type: 'object',
            properties: {
              policy: { enum: ['first'] }
            }
          },
          {
            type: 'object',
            properties: {
              policy: { enum: ['ip_hash'] }
            }
          },
          {
            type: 'object',
            properties: {
              policy: { enum: ['header'] },
              field: { type: 'string' },
            }
          },
          {
            type: 'object',
            properties: {
              policy: { enum: ['uri_hash'] }, field: { type: 'string' }
            }
          },
        ]
      },
      health_checks: {
        type: 'object',
        properties: {
          active: {
            type: 'object',
            properties: {
              path: { type: 'string' },
              port: { type: 'number' },
              interval: { type: 'string' },
              timeout: { type: 'string' },
              max_size: { type: 'number' },
              expect_status: { type: 'number' },
              expect_body: { type: 'string' },
              headers: { $ref: 'http://caddy2-config/app/http/server/handler/headers/set-headers' },
            }
          }
        }
      },
      passive: {
        type: 'object',
        properties: {
          max_fails: { type: 'number' },
          fail_duration: { type: 'number' },
          unhealthy_request_count: { type: 'number' },
          unhealthy_status: { type: 'array', items: { type: 'number' } },
          unhealthy_latency: { type: 'string' },
        }
      },
      headers: {
        $ref: 'http://caddy2-config/app/http/server/handler/headers',
      },
      upstreams: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            dial: { type: 'string' },
            max_requests: { type: 'number' },
          }
        }
      }
    }
  }
}
