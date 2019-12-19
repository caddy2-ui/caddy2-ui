import { Action } from "~libs/browser/api-client";
import { useUpdateServer, getServer } from "./index";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { RouteList, Route, Matcher } from "~libs/caddy/Route";
import { Handler } from "~libs/caddy/Route/Route";
import { ConnectionPolicy } from "~libs/caddy/Server/ConnectionPolicy";
import { useCaddy2Config } from "~libs/browser/caddy2";

export const useUpdateServerOptions = () => {
  const router = useRouter()
  const update = useUpdateServer(router.query.name as string)
  return useMemo(() => ({
    setStrictSNIHost: (value: boolean) => {
      return update(
        (server, value) => (server.strict_sni_host = value, server),
        Action.POST, '/strict_sni_host', value
      )
    },
    setHTTP3: async (value: boolean) => {
      return update(
        (server, value) => (server.experimental_http3 = value, server),
        Action.POST, '/experimental_http3', value
      )
    },
    setHTTPSAuto: async (value: boolean) => {
      return update(
        (server, value) => (server.automatic_https.disable = value, server),
        Action.POST, '/automatic_https/disable', value
      )
    },
    setHTTPRedirect2HTTPS: async (value: boolean) => {
      return update(
        (server, value) => (server.automatic_https.disable_redirects = value, server),
        Action.POST, '/automatic_https/disable_redirects', value
      )
    },
    setHTTPSIgnoreLoadedCertificates: async (value: boolean) => {
      return update(
        (server, value) => (server.automatic_https.ignore_loaded_certificates = value, server),
        Action.POST, '/automatic_https/ignore_loaded_certificates', value
      )
    },
    updateRoutesOrder: async (routes: RouteList) => {
      return update(
        (server, routes) => (server.routes = routes, server),
        Action.PATCH, '/routes', routes,
      )
    },
    addRoute: async (route: Route) => {
      return update<Route, RouteList>(
        (server, routes) => (server.routes = routes, server),
        Action.POST, '/routes', route,
      )
    },
    updateRoute: async (route: Route, id: number) => {
      return update<Route>(
        (server, route) => (server.routes[id] = route, server),
        Action.PUT, '/routes/' + id, route,
      )
    },
    delRoute: async (id: number) => {
      return update<null, RouteList>(
        (server, routes) => (server.routes = routes, server),
        Action.DELETE, '/routes/' + id
      )
    },
    addMatch: async (id: number, match: Matcher[]) => {
      return update(
        (server, match) => (server.routes[id].match = match, server),
        Action.POST, `/routes/${id}/match`, match
      )
    },
    updateMatch: async (id: number, match: Matcher[]) => {
      return update(
        (server, match) => (server.routes[id].match = match, server),
        Action.PATCH, `/routes/${id}/match`, match
      )
    },
    delMatch: async (id: number) => {
      return update<Matcher, Route>(
        (server, route) => (server.routes[id] = route, server),
        Action.DELETE, `/routes/${id}/match/`
      )
    },
    addMatcher: async (id: number, match: Matcher) => {
      return update<Matcher, Matcher[]>(
        (server, match) => (server.routes[id].match = match, server),
        Action.POST, `/routes/${id}/match/`, match
      )
    },
    updateMatcher: async (id: number, match_id: number, matcher: Matcher) => {
      return update<Matcher>(
        (server, matcher) => (server.routes[id].match[match_id] = matcher, server),
        Action.PATCH, `/routes/${id}/match/${match_id}`, matcher
      )
    },
    delMatcher: async (id: number, match_id: number) => {
      return update<Matcher, Matcher[]>(
        (server, match) => (server.routes[id].match = match, server),
        Action.DELETE, `/routes/${id}/match/${match_id}`
      )
    },
    addHandle: async (id: number, handle: Handler[]) => {
      return update(
        (server, handle) => (server.routes[id].handle = handle, server),
        Action.POST, `/routes/${id}/handle`, handle
      )
    },
    updateHandle: async (id: number, handle: Handler[]) => {
      return update(
        (server, handle) => (server.routes[id].handle = handle, server),
        Action.PATCH, `/routes/${id}/handle`, handle
      )
    },
    delHandle: async (id: number) => {
      return update<null, Route>(
        (server, route) => (server.routes[id] = route, server),
        Action.DELETE, `/routes/${id}/handle/`
      )
    },
    addHandler: async (id: number, handler: Handler) => {
      return update<Handler, Handler[]>(
        (server, handle) => (server.routes[id].handle = handle, server),
        Action.POST, `/routes/${id}/handle/`, handler
      )
    },
    updateHandler: async (id: number, handle_id: number, handler: Handler) => {
      return update<Handler>(
        (server, handler) => (server.routes[id].handle[handle_id] = handler, server),
        Action.PATCH, `/routes/${id}/handle/${handle_id}`, handler
      )
    },
    delHandler: async (id: number, handle_id: number) => {
      return update<null, Handler[]>(
        (server, handle) => (server.routes[id].handle = handle, server),
        Action.DELETE, `/routes/${id}/handle/${handle_id}`
      )
    },
    updateConnectionPolicies: async (policies: ConnectionPolicy[]) => {
      return update(
        (server, handle) => (server.tls_connection_policies = handle, server),
        Action.PATCH, `/tls_connection_policies/`, policies
      )
    },
    addConnectionPolicy: async (policy: ConnectionPolicy, create = false) => {
      return update<any, ConnectionPolicy[]>(
        (server, policies) => (server.tls_connection_policies = policies, server),
        Action.POST, `/tls_connection_policies/`, create ? [policy] : policy
      )
    },
    updateConnectionPolicy: async (id: number, policy: ConnectionPolicy) => {
      return update(
        (server, policy) => (server.tls_connection_policies[id] = policy, server),
        Action.PATCH, `/tls_connection_policies/${id}`, policy
      )
    },
    delConnectionPolicy: async (id: number) => {
      return update<ConnectionPolicy, ConnectionPolicy[]>(
        (server, policies) => (server.tls_connection_policies = policies, server),
        Action.DELETE, `/tls_connection_policies/${id}`
      )
    },
  }), [update])
}
