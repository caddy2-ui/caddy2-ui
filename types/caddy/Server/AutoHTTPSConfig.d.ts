// AutoHTTPSConfig is used to disable automatic HTTPS
// or certain aspects of it for a specific server.
// HTTPS is enabled automatically and by default when
// qualifying hostnames are available from the config.
export interface AutoHTTPSConfig {
  // If true, automatic HTTPS will be entirely disabled.
  disable?: boolean

  // If true, only automatic HTTP->HTTPS redirects will
  // be disabled.
  disable_redirects?: boolean

  // Hosts/domain names listed here will not be included
  // in automatic HTTPS (they will not have certificates
  // loaded nor redirects applied).
  skip?: string[]

  // Hosts/domain names listed here will still be enabled
  // for automatic HTTPS (unless in the Skip list), except
  // that certificates will not be provisioned and managed
  // for these names.
  skip_certificates?: string[]

  // By default, automatic HTTPS will obtain and renew
  // certificates for qualifying hostnames. However, if
  // a certificate with a matching SAN is already loaded
  // into the cache, certificate management will not be
  // enabled. To force automated certificate management
  // regardless of loaded certificates, set this to true.
  ignore_loaded_certificates?: boolean
}
