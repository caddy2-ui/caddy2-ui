/**
 * Automation policies are a very powerful way to describe how Caddy should manage certificates for certain names.
 * 
 * The first matching policy will be used. Policies are matched by hostname (aka "domain name").
 */
export interface AutomationPolicy {
  /**The list of host names for which this policy should be applied. Omitting this field matches all hostnames. An empty list matches none. */
  hosts?: [],
  /**The module to use for management. */
  management?: any,
  /**If true, certificates will be initially obtained and renewed synchronously. This should only be used in interactive settings, because the first failure will cause an error that aborts startup. This makes it easier to troubleshoot problems when an administrator is present. Default is false. */
  manage_sync?: boolean
}

export interface Automation {
  /**An ordered list of automation policies. */
  policies?: AutomationPolicy[],
  /**The configuration On-Demand TLS, when needed. On-Demand TLS defers certificate operations to the time they are needed, e.g. during a TLS handshake. Because it is possible to abuse this feature, usage controls are configurable. */
  on_demand?: {
    /**Configures a rate limit for getting certificates with On-Demand TLS. */
    rate_limit?: {
      /**A duration value. A certificate may be obtained `burst` times during this interval. */
      interval?: string,
      /**How many times during an interval a certificate can be obtained. */
      burst?: number
    },
    /** A URL which will be queried to check if Caddy should be allowed to try to get a certificate for a hostname. The name will be passed in a query string parameter like so: `?domain=example.com`. The endpoint must return a 200 OK if a certificate is allowed; anything else will cause it to be denied. Redirects are not followed. */
    ask?: string
  },
  /**How often to scan loaded certificates for renewal. Default is 12 hours. Should be at least an order of magnitude shorter than certificate lifetimes. */
  renew_interval?: string,
  /**How often to scan active OCSP staples for staleness. Default is 1 hour. Should be at least an order of magnitude less than the lifetime of an OCSP response. */
  ocsp_interval?: string
}