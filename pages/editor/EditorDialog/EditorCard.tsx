import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Tooltip,
} from "@material-ui/core";
import { NoSsrEditor } from "../NoSsrEditor";
import { useEditor } from "./useEditor";
import { editor } from "monaco-editor";

import { makeStyles, useTheme } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'flex-end',
  },
}))

export interface Props {
  config?: string
  file?: string
}

export const EditorCard: React.StatelessComponent<Props> = (props) => {

  const classes = useStyles(useTheme())
  const editor = useEditor()

  const config = props.config || editor.state.value
  const file = props.file || editor.state.file

  const [value, setValue] = useState(config)
  const [hasMarker, setHasMarker] = useState(false)
  const [showMarkerSign, setShowMarkerSign] = useState(0)
  const checkMarkers = async (delay = 500) => {
    const monaco = await import('monaco-editor')
    await new Promise(rl => setTimeout(rl, delay))
    let markersLength = monaco.editor.getModelMarkers({
      resource: monaco.Uri.parse('caddy2-edit:' + editor.state.file),
    }).length
    let hasMarker = markersLength !== 0
    setHasMarker(hasMarker)
    if (!hasMarker) {
      setShowMarkerSign(0)
    }
    return markersLength
  }
  const handleChange = (e: any, value: string) => {
    setValue(value)
    checkMarkers()
  }
  const onSave = async () => {
    let markers = await checkMarkers(0)
    if (markers !== 0) {
      setShowMarkerSign(showMarkerSign + 1)
      return
    }
    editor.save(value)
  }

  return (
    <Card>
      <CardHeader title={`修改配置 ${editor.state.posting && '(保存中...)' || ''}`}></CardHeader>
      <CardContent style={{ height: '75vh' }}>
        <NoSsrEditor onChange={handleChange} config={config} file={file} readonly={editor.state.posting} showMarkerSign={showMarkerSign} />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          disabled={editor.state.posting}
          onClick={() => editor.close()}
        >
          取消
        </Button>
        <Tooltip title={hasMarker ? '配置中含有错误, 点击查看' : ''} placement='top-end' arrow>
          <Button
            disabled={editor.state.posting}
            onClick={() => onSave()}
            variant='contained'
            color={hasMarker ? 'secondary' : 'primary'}
            endIcon={editor.state.posting && <CircularProgress color='inherit' size={16} />}
          >
            提交
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  )
}
