
export const EnvObject = {
  uri: 'http://caddy2-config/common/env-object',
  schema: {
    type: 'object',
    patternProperties: {
      '^': { type: 'string' },
    }
  }
}

export const schemas = [
  EnvObject,
]
