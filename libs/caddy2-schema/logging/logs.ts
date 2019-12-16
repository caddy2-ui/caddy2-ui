
export const LogSampling = {
  uri: "http://caddy2-config/logging/LogSampling",
  schema: {
    type: 'object',
    properties: {
      interval: {
        type: 'string',
        description: 'The window over which to conduct sampling.'
      },
      first: {
        type: 'number',
        description: [
          `Log this many entries within a given level and`,
          `message for each interval.`,
        ].join(' ')
      },
      thereafter: {
        type: 'number',
        description: [
          `If more entries with the same level and message`,
          `are seen during the same interval, keep one in`,
          `this many entries until the end of the interval.`,
        ].join(' ')
      },
    }
  }
}

export const CustomLog = {
  uri: "http://caddy2-config/logging/logs",
  schema: {
    type: 'object',
    properties: {
      writer: {
        description: 'The writer defines where log entries are emitted.',
      },
      encoder: {
        description: 'The encoder is how the log entries are formatted or encoded.'
      },
      level: {
        enum: ['DEBUG', 'INFO', 'WARN', 'ERROR', 'PANIC', 'FATAL'],
        description: 'Level is the minimum level to emit, and is inclusive.',
      },
      sampling: {
        $ref: "http://caddy2-config/logging/LogSampling",
      },
      include: {
        type: 'array',
        items: { type: 'string' },
        description: [
          `Include defines the names of loggers to emit in this`,
          `log. For example, to include only logs emitted by the`,
          `admin API, you would include "admin.api".`,
        ].join(' '),
      },
      exclude: {
        type: 'array',
        items: { type: 'string' },
        description: [
          `Exclude defines the names of loggers that should be`,
          `skipped by this log. For example, to exclude only`,
          `HTTP access logs, you would exclude "http.log.access".`,
        ].join(' '),
      },
    }
  }
}