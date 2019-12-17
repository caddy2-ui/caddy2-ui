
export const RegexpMatcher = {
  uri: 'http://caddy2-config/app/http/server/matcher-regexp',
  fileMatch: ['caddy2-edit:/config/app/http/server/matcher-regexp/*.json'],
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      pattern: {
        type: 'string',
      },
    }
  }
}

export const Matcher = {
  uri: 'http://caddy2-config/app/http/server/matcher',
  fileMatch: ['caddy2-edit:/config/app/http/server/matcher/*.json'],
  schema: {
    type: 'object',
    properties: {
      host: {
        type: 'array',
        items: { type: 'string' },
      },
      path: {
        type: 'array',
        items: { type: 'string' },
      },
      path_regexp: {
        $ref: 'http://caddy2-config/app/http/server/matcher-regexp',
      },
      method: {
        enum: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'],
      },
      query: {
        type: 'object',
        patternProperties: {
          "^": {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
      header: {
        type: 'object',
        patternProperties: {
          "^": {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
      header_regexp: {
        type: 'object',
        patternProperties: {
          "^": {
            type: 'array',
            items: { $ref: 'http://caddy2-config/app/http/server/matcher-regexp' },
          },
        },
      },
      protocol: {
        enum: ['http', 'https', 'grpc'],
      },
      not: {
        $ref: 'http://caddy2-config/app/http/server/matcher',
      },
      remote_ip: {
        type: 'object',
        properties: {
          ranges: {
            type: 'array',
            items: { type: 'string' },
          }
        },
      },
      starlark_expr: {
        type: 'string',
      },
      file: {
        type: 'object',
        properties: {
          root: { type: 'string' },
          try_files: {
            type: 'array',
            items: { type: 'string' },
          },
          try_policy: {
            type: 'array',
            items: { enum: ['first_exist', 'smallest_size', 'largest_size', 'most_recent_modified'] },
          }
        }
      }
    }
  }
}