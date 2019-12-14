/**
 * StandardLibLog configures the default Go standard library
 * global logger in the log package. This is necessary because
 * module dependencies which are not built specifically for
 * Caddy will use the standard logger. This is also known as
 * the "sink" logger.
 */
export interface StandardLibLog {
  /**The module that writes out log entries for the sink. */
  writer?: any
}
