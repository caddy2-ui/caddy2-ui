import { languages } from "monaco-editor";
import { Config } from "./root";
import { AdminConfig } from "./admin";
import { schemas as Logging } from "./logging";
import { schemas as App } from "./apps";

export const schmea: languages.json.DiagnosticsOptions = {
  validate: true,
  schemas: [
    Config,
    AdminConfig,
    ...Logging,
    ...App,
  ]
}
