import { Config } from "~libs/caddy/Config";
import { createContainer } from "unstated-next";
import { useState } from "react";

export const useCaddy2Config = () => {
  return useState<Config>({})
}

export const caddy2Config = createContainer(useCaddy2Config)
