import { Handler } from "./handler";

export type Headers = { [Field: string]: string[] }
export type DeleteHeaders = string[]
export type ReplaceHeaders = {
  [Field: string]: Array<{
    search: string,
    search_regexp: string,
    replace: string
  }>
}

export interface HeadersHandler implements Handler {
  handler: 'headers'
  request?: {
    set?: Headers
    add?: Headers
    delete?: DeleteHeaders
    replace?: ReplaceHeaders
  },
  response?: {
    set?: Headers
    add?: Headers
    delete?: DeleteHeaders
    replace?: ReplaceHeaders
    deferred?: boolean
    require?: {
      status_code?: number[]
      headers?: Headers
    }
  }
}
