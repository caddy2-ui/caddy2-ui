import { Action } from "~libs/browser/api-client";
import { useUpdateServer } from "./index";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { RouteList, Route, Matcher } from "~libs/caddy/Route";

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
    updateMatch: async (match: Matcher[], id: number) => {
      return update(
        (server, match) => (server.routes[id].match = match, server),
        Action.POST, `/routes/${id}/match`, match
      )
    },
    addMatch: async (match: Matcher, id: number) => {
      return update<Matcher, Matcher[]>(
        (server, match) => (server.routes[id].match = match, server),
        Action.POST, `/routes/${id}/match/`, match
      )
    },
    delMatch: async (match_id: number, id: number) => {
      return update<Matcher, Matcher[]>(
        (server, match) => (server.routes[id].match = match, server),
        Action.DELETE, `/routes/${id}/match/${match_id}`
      )
    }
  }), [update])
}
