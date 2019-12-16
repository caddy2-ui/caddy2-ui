import React, { useRef, useEffect } from 'react'
import { caddy2Config } from "~libs/browser/caddy2";
import *as monaco from "monaco-editor";
import { schmea } from "./schema";
import { makeStyles, useTheme, colors } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  }
}))

export const Editor: React.StatelessComponent = (props) => {

  const classes = useStyles(useTheme())

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
    const editor = monaco.editor.create(
      f.current,
      {
        model,
        fontSize: 16,
        wordWrap: 'on',
      },
    )
    return () => {
      editor.dispose()
      model.dispose()
    }
  }, [f, config])

  return <div className={classes.root} ref={f}></div>
}

export default Editor
