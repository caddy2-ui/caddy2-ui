import { Handler } from "./handler";

export interface EncodeHandler implements Handler {
  handler: 'encode'
  encodings?: {
    gzip?: { level?: number },
    zstd?: {},
    brotli?: { quality: number }
  }
  /**If the client has no strong preference, choose this encoding. TODO: Not yet implemented */
  prefer: string
  /**Only encode responses that are at least this many bytes long. */
  minimum_length: number
}
