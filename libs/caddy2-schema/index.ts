import { languages } from "monaco-editor";
import { Config } from "./Config";
import { AdminConfig } from "./AdminConfig";
import { schemas as Logging } from "./Logging";

export const schmea: languages.json.DiagnosticsOptions = {
  validate: true,
  schemas: [
    Config,
    AdminConfig,
    ...Logging,
  ]
}
