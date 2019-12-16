
export const SetHeaders = {
  uri: 'http://caddy2-config/app/http/server/handler/headers/set-headers',
  schema: {
    type: 'object',
    patternProperties: {
      '^': {
        type: 'array',
        items: { type: 'string' },
      }
    }
  }
}

export const DeleteHeaders = {
  uri: 'http://caddy2-config/app/http/server/handler/headers/delete-headers',
  schema: {
    type: 'array',
    items: 'string',
  }
}

export const ReplaceHeaders = {
  uri: 'http://caddy2-config/app/http/server/handler/headers/replace-headers',
  schema: {
    type: 'object',
    patternProperties: {
      '^': {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            search: { type: 'string' },
            search_regexp: { type: 'string' },
            replace: { type: 'string' },
          }
        },
      }
    },
  }
}

export const Headers = {
  uri: 'http://caddy2-config/app/http/server/handler/headers',
  schema: {
    request: {
      type: 'object',
      properties: {
        set: { $ref: 'http://caddy2-config/app/http/server/handler/headers/set-headers' },
        add: { $ref: 'http://caddy2-config/app/http/server/handler/headers/set-headers' },
        delete: { $ref: 'http://caddy2-config/app/http/server/handler/headers/delete-headers' },
        replace: { $ref: 'http://caddy2-config/app/http/server/handler/headers/replace-headers' },
      }
    },
    response: {
      type: 'object',
      properties: {
        set: { $ref: 'http://caddy2-config/app/http/server/handler/headers/set-headers' },
        add: { $ref: 'http://caddy2-config/app/http/server/handler/headers/set-headers' },
        delete: { $ref: 'http://caddy2-config/app/http/server/handler/headers/delete-headers' },
        replace: { $ref: 'http://caddy2-config/app/http/server/handler/headers/replace-headers' },
        deferred: { type: 'boolean' },
        require: {
          type: 'object',
          properties: {
            status_code: {
              type: 'array',
              items: { type: 'number' },
              headers: { $ref: 'http://caddy2-config/app/http/server/handler/headers/set-headers' },
            },
          }
        }
      }
    },

  }
}
