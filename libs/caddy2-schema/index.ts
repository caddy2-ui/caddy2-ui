import { languages } from "monaco-editor";
import { Config } from "./config";
import { AdminConfig } from "./admin";
import { schemas as Logging } from "./logging";
import { schemas as App } from "./apps";

export const caddy2ConfigSchmeas: languages.json.DiagnosticsOptions['schemas'] = [
  Config,
  AdminConfig,
  ...Logging,
  ...App,
]
