import { Handler } from "./handler";

export interface RewriteHandler implements Handler {
  handler: 'rewrite'
  /**Changes the request's HTTP verb. */
  method?: string
  /**Changes the request's URI. */
  uri?: string
  /**Strips the given prefix from the beginning of the URI path. */
  strip_path_prefix?: string
  /**Strips the given suffix from the end of the URI path. */
  strip_path_suffix?: string
  /**If true, the request will sent for rehandling after rewriting. */
  rehandle?: string
  /**If set to a 3xx HTTP status code and if the URI was rewritten (changed), the handler will issue a simple HTTP redirect to the new URI using the given status code. */
  http_redirect?: number
}
