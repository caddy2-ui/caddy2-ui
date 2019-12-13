/**
 * AdminConfig configures Caddy's API endpoint, which is used
 * to manage Caddy while it is running.
 */
export interface AdminConfig {
  /**
   * If true, the admin endpoint will be completely disabled.
   * Note that this makes any runtime changes to the config
   * impossible, since the interface to do so is through the
   * admin endpoint.
   */
  disabled?: boolean

  /**
   * The address to which the admin endpoint's listener should
   * bind itself. Can be any single network address that can be
   * parsed by Caddy.
   */
  listen?: string

  /**
   * If true, CORS headers will be emitted, and requests to the
   * API will be rejected if their `Host` and `Origin` headers
   * do not match the expected value(s). Use `origins` to
   * customize which origins/hosts are allowed.If `origins` is
   * not set, the listen address is the only value allowed by
   * default.
   */
  enforce_origin?: boolean

  /**
   * The list of allowed origins for API requests. Only used if
   * `enforce_origin` is true. If not set, the listener address
   * will be the default value. If set but empty, no origins will
   * be allowed.
   */
  origins?: string[]
}