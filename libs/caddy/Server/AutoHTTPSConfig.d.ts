// AutoHTTPSConfig is used to disable automatic HTTPS
// or certain aspects of it for a specific server.
// HTTPS is enabled automatically and by default when
// qualifying hostnames are available from the config.
export interface AutoHTTPSConfig {
  /**If true, automatic HTTPS will be completely disabled. */
  disable?: boolean

  /**If true, automatic HTTP->HTTPS redirects will be disabled, but automated certificate management will still be enabled. */
  disable_redirects?: boolean

  /**A list of hosts (domain names) to not include in automatic HTTPS. */
  skip?: string[]

  /**A list of hosts (domain names) to still enable automatic HTTPS for, except for managing certificates. */
  skip_certificates?: string[]

  // By default, automatic HTTPS will obtain and renew
  // certificates for qualifying hostnames. However, if
  // a certificate with a matching SAN is already loaded
  // into the cache, certificate management will not be
  // enabled. To force automated certificate management
  // regardless of loaded certificates, set this to true.
  ignore_loaded_certificates?: boolean
}
