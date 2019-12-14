import { HTTPMethod } from "../Server/HTTPMethod";
import { Protocol } from "../Server/Protocol";

export interface RegexpMatcher {
  /**A name for the regular expression so you can access its capture groups in placeholders. Optional. */
  name?: string
  /**The regular expression in [Go's regexp syntax](https://golang.org/pkg/regexp/). */
  pattern: string
}

export interface Matcher {
  /**
   * Matches requests by Host header.
   * 
   * Host values can contain wildcards to substitute for one label of the domain name. Host matching is case-insensitive.
   */
  host?: string[]
  /**
   * Matches requests by request path.
   * 
   * Paths may contain globular patterns. Path matching is case-insensitive. If case sensitivity is required, use a path_regexp matcher.
   */
  path?: string[]
  /**Matches requests by request path using a regular expression. */
  path_regexp?: RegexpMatcher
  method?: HTTPMethod[]
  query?: {
    [param: string]: string[]
  }
  header?: {
    [Field: string]: string[]
  }
  header_regexp: {
    [Field: string]: RegexpMatcher
  }
  /**
   * Matches requests by the protocol being used.
   */
  protocol?: Protocol
  not?: Omit<Matcher, 'not'>
  remote_ip?: {
    /**A list of IP addresses or CIDR ranges to match. */
    ranges: string[]
  }
  /**Matches requests by evaluating a Starlark expression. This provides a great deal of flexibility with regards to boolean logic, and is a fine fit for advanced matching needs. */
  starlark_expr?: string
  /**Matches requests based on files on disk. */
  file?: {
    /**The base path with which relative paths will be rooted. Default is {http.vars.root} if set, or current working directory. */
    root?: string,
    /**A list of root-relative file paths to "try" matching (similar to nginx's try_files). A file will be selected based on try_policy. Directory convention is observed: paths ending in a forward slash (`/`) must be a directory in order to match; paths ending without a forward slash must not be a directory for a match. For example: `/my/path/` matches only directories and `/my/path` matches only files. To match both, include both patterns. */
    try_files?: string[],
    /**
     * When trying files listed in `try_files`, use this policy to choose one.
     * - `first_exist` (default): Choose the first file that exists.
     * - `smallest_size`: Choose the file with the smallest size.
     * - `largest_size`: Choose the file with the largest size.
     * - `most_recent_modified`: Choose the file that was most recently modified.
     */
    try_policy?: 'first_exist' | 'smallest_size' | 'largest_size' | 'most_recent_modified'[]
  }
}
