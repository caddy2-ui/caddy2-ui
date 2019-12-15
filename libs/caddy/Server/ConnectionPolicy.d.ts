import { ClientAuthentication } from "./ClientAuthentication";

export interface ConnectionPolicy {
  /**Configures how to match this policy with a TLS ClientHello. If the policy matches, it will be used. */
  match?: { sni?: string[] },
  /**Protocols to use for Application-Layer Protocol Negotiation (ALPN) during the handshake. */
  alpn?: string[],
  /**The list of cipher suites to support. */
  cipher_suites?: string[],
  /**The list of elliptic curves to support. */
  curves?: [],
  /**Minimum TLS protocol version to allow. Default is `tls1.2`. */
  protocol_min?: string[],
  /**Maximum TLS protocol version to allow. Default is `tls1.3`. */
  protocol_max?: string[],
  /**Certificate selection module, which configures how to choose a certificate if more than one match the given ServerName (SNI) value. */
  certificate_selection?: any,
  /**Enables and configures TLS client authentication. */
  client_authentication?: ClientAuthentication
}
