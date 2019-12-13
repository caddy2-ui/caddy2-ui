import { time, int } from '../go'

/**LogSampling configures log entry sampling. */
export interface LogSampling {
  /**The window over which to conduct sampling. */
  interval?: time.Duration

  /**
   * Log this many entries within a given level and
   * message for each interval.
   */
  first?: int

  /**
   * If more entries with the same level and message
   * are seen during the same interval, keep one in
   * this many entries until the end of the interval.
   */
  thereafter?: int
}

/**
 * CustomLog represents a custom logger configuration.
 *
 * By default, a log will emit all log entries. Some entries
 * will be skipped if sampling is enabled. Further, the Include
 * and Exclude parameters define which loggers (by name) are
 * allowed or rejected from emitting in this log. If both Include
 * and Exclude are populated, their values must be mutually
 * exclusive, and longer namespaces have priority. If neither
 * are populated, all logs are emitted.
 */
export interface CustomLog {
  /**The writer defines where log entries are emitted. */
  writer?: any

  /**The encoder is how the log entries are formatted or encoded. */
  encoder?: any

  /**
   * Level is the minimum level to emit, and is inclusive.
   * Possible levels: DEBUG, INFO, WARN, ERROR, PANIC, and FATAL
   */
  level?: string

  /**
   * Sampling configures log entry sampling. If enabled,
   * only some log entries will be emitted. This is useful
   * for improving performance on extremely high-pressure
   * servers.
   */
  sampling?: LogSampling

  /**
   * Include defines the names of loggers to emit in this
   * log. For example, to include only logs emitted by the
   * admin API, you would include "admin.api".
   */
  include?: string[]

  /**
   * Exclude defines the names of loggers that should be
   * skipped by this log. For example, to exclude only
   * HTTP access logs, you would exclude "http.log.access".
   */
  exclude?: string[]

}