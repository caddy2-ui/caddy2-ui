import { ClientAuthentication } from "./ClientAuthentication";

// ConnectionPolicy specifies the logic for handling a TLS handshake.
export interface ConnectionPolicy {
  // How to match this policy with a TLS ClientHello. If
  // this policy is the first to match, it will be used.
  match?: object

  // How to choose a certificate if more than one matched
  // the given ServerName (SNI) value.
  certificate_selection?: any

  // The list of cipher suites to support. Caddy's
  // defaults are modern and secure.
  cipher_suites?: string[]

  // The list of elliptic curves to support. Caddy's
  // defaults are modern and secure.
  curves?: string[]

  // Protocols to use for Application-Layer Protocol
  // Negotiation (ALPN) during the handshake.
  alpn?: string[]

  // Minimum TLS protocol version to allow. Default: `tls1.2`
  protocol_min?: string

  // Maximum TLS protocol version to allow. Default: `tls1.3`
  protocol_max?: string

  // Enables and configures TLS client authentication.
  client_authentication?: ClientAuthentication

}