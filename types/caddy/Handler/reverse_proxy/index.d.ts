import { Handler } from "./handler";
import { Headers, HeadersHandler } from "./headers";
import { FastCGITransport, HTTPTransport } from "./transport";
import *as BPolicy from "./balancing_policy";

export interface ReverseProxyHandler implements Handler {
  handler: 'reverse_proxy'
  /**The module for round-tripping requests. See below for options. */
  transport?: HTTPTransport | FastCGITransport,
  /**How frequently to flush buffered responses to the client. Accepts any duration value. Set to -1 to always flush immediately. */
  flush_interval?: number,
  /**The module for short-circuiting before backends become unhealthy. */
  circuit_breaker?: {},
  /**Configures load balancing among a group of hosts. */
  load_balancing?: {
    /**The module to use for selecting a host from a pool. See below for options. */
    selection_policy?:
    BPolicy.first | BPolicy.header | BPolicy.ip_hash |
    BPolicy.least_conn | BPolicy.random | BPolicy.random_choose |
    BPolicy.round_robin | BPolicy.uri_hash,
    /** `"10s"` How long to try selecting available backends for each request if the next available host is down. By default, this retry is disabled. Clients may hang for this long while the load balancer tries to find an available upstream host. */
    try_duration?: string,
    /** `"250ms"` How long to wait between selecting the next host from the pool. Default is 250ms. Only relevant when a request to an upstream host fails. Be aware that setting this to 0 with a non-zero `try_duration` can cause the CPU to spin if all backends are down and latency is very low. */
    try_interval?: string,
    /**A list of matcher sets that restricts with which requests retries are allowed. A request must match any of the given matcher sets in order to be retried if the connection to the upstream succeeded but the subsequent round-trip failed. If the connection to the upstream failed, a retry is always allowed. If unspecified, only GET requests will be allowed to be retried. Note that a retry is done with the next available host according to the load balancing policy. */
    retry_match?: any[]
  },
  /**Configures active and passive health checks. Active health checks run in the background on a timer, whereas passive health checks monitor proxied requests. To minimally enable active health checks, set either path or port (or both). To minimally enable passive health checks, specify at least an empty config object. */
  health_checks?: {
    active?: {
      /**The URI path to use for health checks. */
      path?: string,
      /**The port to use (if different from dial address) for health checks. */
      port?: number,
      /**How frequently to perform active health checks (default 30s). */
      interval?: string,
      /**How long to wait for a response from a backend before considering it unhealthy (default 10s). */
      timeout?: string,
      /**The maximum response body to download from the backend during a health check. */
      max_size?: number,
      /**The HTTP status code to expect from a healthy backend. */
      expect_status?: number,
      /**A regular expression against which to match the response body of a healthy backend. */
      expect_body?: string
      /**An object of headers (where the values are arrays of strings) to set on the request to the backend. */
      headers?: Headers
    },
    passive?: {
      /**How long to remember a failed request to a backend. A duration > 0 enables passive health checking. Default is 0. */
      max_fails?: number,
      /**The number of failed requests within the `fail_duration` window to consider a backend as "down". Must be >= 1; default is 1. Requires that `fail_duration` be > 0. */
      fail_duration?: number,
      /**Limits the number of simultaneous requests to a backend by marking the backend as "down" if it has this many concurrent requests or more. */
      unhealthy_request_count?: number,
      /**Count the request as failed if the response comes back with a status code. */
      unhealthy_status?: number[],
      /**Count the request as failed if the response takes at least this long to receive. */
      unhealthy_latency?: string
    }
  },
  /**Mutates proxied request and response headers to and from the chosen upstream. Has the same structure as the [http.handlers.headers](https://github.com/caddyserver/caddy/wiki/v2:-Documentation#httphandlersheaders) module. Can use placeholders, including those set by this handler (see below). */
  headers?: HeadersHandler
  upstreams?: Array<{
    /**The network address of the upstream in [Caddy's network address syntax](https://github.com/caddyserver/caddy/wiki/v2:-Documentation#httpserverslisten). Must represent precisely one socket (i.e. no port ranges). A valid network address either has a host and port, or is a unix socket address. Placeholders may be used to make the upstream dynamic, but be aware of the health check implications of this. */
    dial?: string,
    /**The maximum number of simultaneous requests to allow to this host. If set, overrides the global `health_checks.passive.unhealthy_request_count`. */
    max_requests?: number
  }>
}
