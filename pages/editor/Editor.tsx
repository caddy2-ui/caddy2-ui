import React, { useRef, useEffect } from 'react'
import *as monaco from "monaco-editor";
import "./editor-settings";
import { makeStyles, useTheme, colors } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  }
}))

export interface Props {
  schema?: string,
  file?: string,
  config: string,
  onChange?: (e: monaco.editor.IModelContentChangedEvent, value: string) => void
}

export const Editor: React.StatelessComponent<Props> = ({
  config,
  file = '/config/tmp.json',
  onChange = () => 0,
}) => {

  const classes = useStyles(useTheme())

  const f = useRef()
  useEffect(() => {
    if (!f.current) {
      return
    }

    let modelUri = monaco.Uri.parse(`caddy2-edit:${file}`)
    let model = monaco.editor.createModel(config, `json`, modelUri)
    model.updateOptions({
      tabSize: 2,
    })
    model.onDidChangeContent(e => {
      onChange(e, model.getValue())
    })

    const editor = monaco.editor.create(
      f.current,
      {
        model,
        fontSize: 16,
        wordWrap: 'on',
      },
    )
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      // do nothing, just hook browser save
    })

    return () => {
      editor.dispose()
      model.dispose()
    }
  }, [f])

  return <div className={classes.root} ref={f}></div>
}

export default Editor
