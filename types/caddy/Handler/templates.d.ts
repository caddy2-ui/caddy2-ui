import { Handler } from "./handler";

export interface TemplatesHandler implements Handler {
  handler: 'templates'
  /**The root path from which to load files. Required if template functions accessing the file system are used (such as .Include). Default is {`http.vars.root`} if set, or current working directory. */
  include_root?: string
  /**The MIME types for which to render templates. It is important to use this if the route matchers do not exclude images or other binary files. */
  mime_types?: string[]
  /**The template action delimiters. */
  delimiters?: string[]
}
