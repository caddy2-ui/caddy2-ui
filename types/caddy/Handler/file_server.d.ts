import { Handler } from "./handler";

export interface FileServerHandler implements Handler {
  handler: 'file_server'
  root?: string
  /**A list of files or folders to hide; the file server will pretend as if they don't exist. Accepts globular patterns like "*.hidden" or "/foo/*\/bar". */
  hide?: string[]
  /**The names of files to try as index files if a folder is requested. */
  index_names?: string[]
  /**Enables browsing if a directory was requested. */
  browse?: {
    /**Use this template file instead of the default browse template. */
    template_file?: string
  }
  /**Use redirects to enforce trailing slash appended to URIs for directories, or to remove trailing slash from URIs for files. Default is true. */
  canonical_uris?: boolean,
  /**If enabled, when a requested file is not found, invoke the next handler in the chain instead of returning a 404 error. By default, this is false (disabled). */
  pass_thru?: boolean
}
