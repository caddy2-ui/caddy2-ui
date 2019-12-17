import React, { } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NoSsrEditor } from "../NoSsrEditor";
import { useEditor } from "./useEditor";

export interface Props {

}

export const EditorDialog: React.StatelessComponent<Props> = (props) => {

  const editor = useEditor()

  return (
    <Dialog
      open={editor.state.open}
      fullWidth={true}
      maxWidth='lg'
    >
      <DialogTitle>修改配置</DialogTitle>
      <DialogContent style={{ height: '75vh' }}>
        <NoSsrEditor config={{}} id='dialog.json' />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => editor.close()}>取消</Button>
        <Button variant='contained' color='primary'>保存</Button>
      </DialogActions>
    </Dialog>
  )
}
