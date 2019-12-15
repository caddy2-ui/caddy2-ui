import { Action } from "~libs/browser/api-client";
import { useUpdateServer } from "./index";
import { useRouter } from "next/router";

export const useUpdateServerOptions = () => {
  const router = useRouter()
  const update = useUpdateServer(router.query.name as string)
  return {
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
  }
}
