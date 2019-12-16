
export const Config = {
  uri: 'http://caddy2-config/config',
  schema: {
    type: 'object',
    properties: {
      admin: { $ref: "http://caddy2-config/admin" },
      logging: { $ref: "http://caddy2-config/logging" },
      storage: {
        description: [
          'StorageRaw is a storage module that defines how/where Caddy',
          'stores assets (such as TLS certificates). By default, this is',
          'the local file system (`caddy.storage.file_system` module).',
          'If the `XDG_DATA_HOME` environment variable is set, then',
          '`$XDG_DATA_HOME/caddy` is the default folder. Otherwise,',
          '`$HOME/.local/share/caddy` is the default folder.',
        ].join(' ')
      },
      apps: {
        $ref: 'http://caddy2-config/app',
      }
    }
  }
}
