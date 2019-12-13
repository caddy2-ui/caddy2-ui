// ServerLogConfig describes a server's logging configuration.
export interface ServerLogConfig {
  // LoggerNames maps request hostnames to a custom logger name.
  // For example, a mapping of "example.com" to "example" would
  // cause access logs from requests with a Host of example.com
  // to be emitted by a logger named "http.log.access.example".
  logger_names?: { [k: string]: string }
}
