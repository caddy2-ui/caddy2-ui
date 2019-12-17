import React, { useRef, useEffect } from 'react'
import *as monaco from "monaco-editor";
import { schmea } from "./schema";
import { makeStyles, useTheme, colors } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  }
}))

export interface Props {
  schema?: string,
  id?:string,
  config: any,
}

export const Editor: React.StatelessComponent<Props> = ({ config, schema = 'http://caddy2-config/config', id='tmp.json' }) => {

  const classes = useStyles(useTheme())

  const f = useRef()
  useEffect(() => {
    if (!f.current) {
      return
    }

    let val = JSON.stringify(config, null, 2)
    let modelUri = monaco.Uri.parse(`caddy2-edit:/config/${id}`)
    let model = monaco.editor.createModel(val, `json`, modelUri)

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'http://caddy2-config/config-edit',
          fileMatch: [modelUri.toString()],
          schema: { $ref: schema, }
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
  }, [f])

  return <div className={classes.root} ref={f}></div>
}

export default Editor
