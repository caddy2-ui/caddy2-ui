import { ServerBaseURL, useUpdateConfig, Action } from "~libs/browser/api-client";
import axios from "axios";
import { useMemo } from "react";
import { useUpdateServer } from "../index";

export const useUpdateServerOptions = (name: string) => {
  const update = useUpdateServer(name)
  return {
    setHTTP3: async (value: boolean) => {
      return update(
        (server, value) => ({ ...server, experimental_http3: value }),
        Action.POST, '/experimental_http3', value
      )
    }
  }
}
