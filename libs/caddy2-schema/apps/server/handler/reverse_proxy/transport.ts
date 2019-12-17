
export const HTTPTransport = {
  uri: 'http://caddy2-config/app/http/server/handler/reverse_proxy/http_transport',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/reverse_proxy/http_transport/config.json'],
  schema: {
    type: 'object',
    properties: {
      protocol: { enum: ['http', 'http_ntlm'] },
      tls: {
        type: 'object',
        properties: {
          root_ca_pool: { $ref: 'http://caddy2-config/common/string-array', },
          client_certificate_file: { type: 'string' },
          client_certificate_key_file: { type: 'string' },
          insecure_skip_verify: { type: 'boolean' },
          handshake_timeout: { type: 'string' },
          server_name: { type: 'string' },
        }
      },
      keep_alive: {
        type: 'object',
        properties: {
          enabled: { type: 'boolean' },
          probe_interval: { type: 'string' },
          max_idle_conns: { type: 'number' },
          max_idle_conns_per_host: { type: 'number' },
          idle_timeout: { type: 'string' },
        }
      },
      compression: { type: 'boolean' },
      max_conns_per_host: { type: 'number' },
      dial_timeout: { type: 'string' },
      fallback_delay: { type: 'string' },
      response_header_timeout: { type: 'string' },
      max_response_header_size: { type: 'number' },
      expect_continue_timeout: { type: 'string' },
      read_buffer_size: { type: 'number' },
      write_buffer_size: { type: 'number' },
      versions: { enum: ['1.1', '2'] }
    }
  }
}


export const FastCGITransport = {
  uri: 'http://caddy2-config/app/http/server/handler/reverse_proxy/fastcgi_transport',
  fileMatch: ['caddy2-edit:/config/app/http/server/handler/reverse_proxy/fastcgi_transport/config.json'],
  schema: {
    type: 'object',
    properties: {
      protocol: { enum: ['fastcgi'] },
      root: { type: 'string' },
      split_path: { type: 'string', },
      env: { $ref: 'http://caddy2-config/common/env-object' }
    }
  }
}
