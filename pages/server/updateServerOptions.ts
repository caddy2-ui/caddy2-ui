import { Action } from "~libs/browser/api-client";
import { useUpdateServer } from "./index";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { RouteList } from "~libs/caddy/Route";

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
    }
  }), [update])
}
