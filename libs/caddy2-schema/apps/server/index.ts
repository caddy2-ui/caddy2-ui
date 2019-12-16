import { Server } from "./server";
import { Route } from "./route";
import { TLSConnectionPolicy } from "./tls_connection_policy";
import { ClientAuthentication } from "./client_authentication";
import { Matcher } from "./matcher";
import { AutomaticHTTPS } from "./automatic_https";

export const schemas = [
  Server,
  Route,
  TLSConnectionPolicy,
  ClientAuthentication,
  Matcher,
  AutomaticHTTPS,
]
