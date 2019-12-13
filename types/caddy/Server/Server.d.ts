import { time, int } from "../go";
import { Route, RouteList } from "../Route";
import { ConnectionPolicies } from "../TLS";
import { AutoHTTPSConfig } from "./AutoHTTPSConfig";
import { ServerLogConfig } from "./ServerLogConfig";

/**
 * HTTPErrorConfig determines how to handle errors
 * from the HTTP handlers.
 */
export interface HTTPErrorConfig {
  routes?: RouteList
}

/**Server describes an HTTP server. */
export interface Server {
  /**
   * Socket interfaces to which to bind listeners. Caddy network
   * addresses have the following form:
   * 
   *     network/address
   * 
   * The network part is anything that [Go's `net` package](https://golang.org/pkg/net/)
   * recognizes, and is optional. The default network is `tcp`. If
   * a network is specified, a single forward slash `/` is used to
   * separate the network and address portions.
   * 
   * The address part may be any of these forms:
   * 
   *    - `host`
   *    - `host:port`
   *    - `:port`
   *    - `/path/to/unix/socket`
   * 
   * The host may be any hostname, resolvable domain name, or IP address.
   * The port may be a single value (`:8080`) or a range (`:8080-8085`).
   * A port range will be multiplied into singular addresses. Not all
   * config parameters accept port ranges, but Listen does.
   * 
   * Valid examples:
   * 
   *     :8080
   *     127.0.0.1:8080
   *     localhost:8080
   *     localhost:8080-8085
   *     tcp/localhost:8080
   *     tcp/localhost:8080-8085
   *     udp/localhost:9005
   *     unix//path/to/socket
   * 
   */
  listen?: string[]

  /**
   * How long to allow a read from a client's upload. Setting this
   * to a short, non-zero value can mitigate slowloris attacks, but
   * may also affect legitimately slow clients.
   */
  read_timeout?: time.Duration

  /**ReadHeaderTimeout is like ReadTimeout but for request headers. */
  read_header_timeout?: time.Duration

  /**
   * WriteTimeout is how long to allow a write to a client. Note
   * that setting this to a small value when serving large files
   * may negatively affect legitimately slow clients.
   */
  write_timeout?: time.Duration

  /**
   * IdleTimeout is the maximum time to wait for the next request
   * when keep-alives are enabled. If zero, ReadTimeout is used.
   * If both are zero, there is no timeout.
   */
  idle_timeout?: time.Duration

  /**
   * MaxHeaderBytes is the maximum size to parse from a client's
   * HTTP request headers.
   */
  max_header_bytes?: int

  /**
   * Routes describes how this server will handle requests.
   * When a request comes in, each route's matchers will
   * be evaluated against the request, and matching routes
   * will be compiled into a middleware chain in the order
   * in which they appear in the list.
   */
  routes?: RouteList

  /**
   * Errors is how this server will handle errors returned from
   * any of the handlers in the primary routes.
   */
  Errors?: HTTPErrorConfig

  // How to handle TLS connections.
  tls_connection_policies?: ConnectionPolicies

  // AutoHTTPS configures or disables automatic HTTPS within this server.
  // HTTPS is enabled automatically and by default when qualifying names
  // are present in a Host matcher.
  automatic_https?: AutoHTTPSConfig

  // MaxRehandles is the maximum number of times to allow a
  // request to be rehandled, to prevent accidental infinite
  // loops. Default: 1.
  max_rehandles?: int

  /**If true, enforce that an HTTP Host header matches the connection's ServerName (SNI) value from the TLS handshake. Important when using TLS client authentication. */
  strict_sni_host?: boolean

  /**Map of request host to custom logger name. For example, if you wanted all requests for `example.com` to be emitted to a logger with a unique name, you can do `"example.com": "example"` and then all access logs related to requests for example.com will use a logger named `http.log.access.example` (and same for error logs, but with `.error.` in the name instead). */
  logs?: ServerLogConfig

  // Enable experimental HTTP/3 support. Note that HTTP/3 is not a
  // finished standard and has extremely limited client support.
  // This field is not subject to compatibility promises.
  experimental_http3?: boolean

}
