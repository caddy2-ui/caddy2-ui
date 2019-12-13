export interface policy {
  policy: string
}

/**Host is selected in turn. */
export interface round_robin implements policy {
  policy: "round_robin"
}

/**Host is selected randomly. */
export interface random implements policy {
  policy: "random"
}

/**A number of hosts (N) are randomly selected, then the host with the fewest concurrent connections is chosen from among those. N defaults to 2 and is the recommended value. Also referred to as the power of two random choices. */
export interface random_choose implements policy {
  policy: "random_choose"
  choose?: 2
}

/**Host with the fewest number of concurrent requests is selected. If tied for fewest, host is chosen randomly from among them. */
export interface least_conn implements policy {
  policy: "least_conn"
}

/**First available host is selected. */
export interface first implements policy {
  policy: "first"
}

/**Host is selected by hashing the remote IP of the request. Each client IP will always get the same host, but specifically which host is arbitrary. */
export interface ip_hash implements policy {
  policy: "ip_hash"
}

/**Host is selected by hashing the value of a request header. Each request with a certain header value will get the same host, but specifically which host is arbitrary. */
export interface header implements policy {
  policy: "header"
  field: string
}

/**Host is selected by hashing the request URI. Each request with a certain URI will get the same host, but specifically which host is arbitrary. */
export interface uri_hash implements policy {
  policy: "uri_hash"
  field: string
}
