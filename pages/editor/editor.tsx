import React, { useRef, useEffect } from 'react'
import { caddy2Config } from "~libs/browser/caddy2";
import *as monaco from "monaco-editor";
import { schmea } from "./schema";

export const Editor: React.StatelessComponent = (props) => {
  const [config] = caddy2Config.useContainer()
  const f = useRef()
  useEffect(() => {
    if (!f.current) {
      return
    }

    let val = JSON.stringify(config, null, 2)
    let modelUri = monaco.Uri.parse('a://b/foo.json')
    let model = monaco.editor.createModel(val, `json`, modelUri)

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'http://caddy2-config/config-edit',
          fileMatch: [modelUri.toString()],
          schema: {
            $ref: 'http://caddy2-config/config',
          }
        },
        ...schmea.schemas,
      ],
    })
    const editor = monaco.editor.create(f.current, {
      model,
    })
    return () => {
      editor.dispose()
      model.dispose()
    }
  }, [f, config])

  return <div style={{ height: 700 }} ref={f}></div>
}

export default Editor
