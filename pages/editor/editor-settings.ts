import { caddy2ConfigSchmeas } from "~libs/caddy2-schema";
import *as monaco from "monaco-editor";

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  schemas: [
    ...caddy2ConfigSchmeas,
  ],
})

