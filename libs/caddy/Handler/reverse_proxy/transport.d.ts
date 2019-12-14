export interface HTTPTransport {
  /**The HTTP transport module is the default, and sane parameters are used if not explicitly configured. */
  protocol: 'http' | 'http_ntlm',
  /**Enables and configures TLS between the proxy and the backend. An empty object will use secure defaults. */
  tls?: {
    /**A list of base64-encoded DER certificates to use as the root CA pool; these are the CA certificates that will be accepted by the proxy when connecting to a backend with TLS. */
    root_ca_pool?: string[],
    /**Path to a PEM certificate file to present to the backend. For use with TLS client authentication (mTLS, i.e. for the proxy to authenticate with the backend). */
    client_certificate_file?: string,
    /**Path to the PEM private key file associated with the client certificate in `client_certificate_file`. */
    client_certificate_key_file?: string,
    /**If true, disables certificate verification. This is insecure, dangerous, and cancels the benefits of TLS. Use only for testing/development. */
    insecure_skip_verify?: boolean,
    /**Maximum time to establish TLS connection with the backend. */
    handshake_timeout?: string,
    /**Custom SNI value to use in the TLS handshake; overrides implicit inferred value. */
    server_name?: string
  },
  /**TCP Keep-Alive configuration between the proxy and the backends. */
  keep_alive?: {
    /**If false, TCP Keep-Alive will be disabled. Each request will establish a new connection. Default is true (Keep-Alive enabled). */
    enabled?: true,
    /**How often to probe for idleness. */
    probe_interval?: string,
    /**Maximum number of idle connections to keep alive across any host. */
    max_idle_conns?: number,
    /**Maximum number of idle connections to keep alive for a single host. */
    max_idle_conns_per_host?: number,
    /**How long an idle connection should be kept alive without activity. */
    idle_timeout?: string
  },
  /**If false, compression to the backend will be disabled. Default true (enabled). */
  compression?: true,
  /**Maximum number of connections to allow per backend from this proxy. If this limit is reached, connections will block until an opening becomes available. */
  max_conns_per_host?: number,
  /**Maximum time allowed to dial connection to a backend. */
  dial_timeout?: string,
  /**Duration between dual stack fallback attempts. Not used by default. */
  fallback_delay?: string,
  /**Maximum time to wait for response headers to be downloaded. */
  response_header_timeout?: string,
  /**Maximum size to allow for response headers. */
  max_response_header_size?: number,
  /**Maximum time to allow for HTTP 100 Continue responses. */
  expect_continue_timeout?: string,
  /**Size of the read buffer in bytes. */
  read_buffer_size?: number,
  /**Size of the write buffer in bytes. */
  write_buffer_size?: number,
  /**Which HTTP versions to enable. Can be "1.1" or "2" (or both, which is default). */
  versions?: '1.1' | '2'[]
}

export interface FastCGITransport {
  protocol: "fastcgi"
  /**Path to the root of the site, which is necessary when creating the environment variables for the request's FastCGI environment. Default is {`http.vars.root`} or current working directory. */
  root?: string,
  /**To create the FastCGI environment, the URI path will be split into two parts, with the first part ending with the first occurrence of this substring. The first part will be used as the actual resource (CGI script) name in DOCUMENT_URI, and the second piece will be set to PATH_INFO for the CGI script to use. */
  split_path?: string,
  /**Key-value pairs to add to the FastCGI environment. */
  env?: { [k: string]: string }
}
