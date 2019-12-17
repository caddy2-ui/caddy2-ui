import { Authentication } from './authentication'
import { Cache } from './cache'
import { Encode } from './encode'
import { Error } from './error'
import { FileServer } from './file_server'
import { Headers, DeleteHeaders, ReplaceHeaders, SetHeaders } from './headers'
import { Markdown } from './markdown'
import { RequestBody } from './request_body'
import { Rewrite } from './rewrite'
import { StaticResponse } from './static_response'
import { Subroute } from './subroute'
import { Templates } from './templates'
import { Vars } from './vars'
import { schemas as ReverseProxy } from "./reverse_proxy/";

export const schemas = [
  Authentication,
  Cache,
  Encode,
  Error,
  FileServer,
  Headers, DeleteHeaders, ReplaceHeaders, SetHeaders,
  Markdown,
  RequestBody,
  Rewrite,
  StaticResponse,
  Subroute,
  Templates,
  Vars,
  ...ReverseProxy,
]
