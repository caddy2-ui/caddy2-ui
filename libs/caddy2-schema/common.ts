
export const EnvObject = {
  uri: 'http://caddy2-config/common/env-object',
  schema: {
    type: 'object',
    patternProperties: {
      '^': { type: 'string' },
    }
  }
}

export const StringArray = {
  uri: 'http://caddy2-config/common/string-array',
  schema: {
    type: 'array',
    items: { type: 'string' },
  }
}

export const schemas = [
  EnvObject,
  StringArray,
]
