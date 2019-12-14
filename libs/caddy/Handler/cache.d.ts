import { Handler } from "./handler";

export interface CacheHandler implements Handler {
  handler: 'cache'
  /**The network address of this cache instance; required. */
  self: string
  /**A list of network addresses of cache instances in the group. */
  peers?: string[]
  /**Maximum size of the cache, in bytes. Default is 512 MB. */
  max_size?: number
}
