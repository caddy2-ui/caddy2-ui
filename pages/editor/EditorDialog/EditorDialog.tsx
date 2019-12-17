import React, { useState } from "react";
import {
  Dialog,
} from "@material-ui/core";
import { useEditor } from "./useEditor";
import { EditorCard } from "./EditorCard";

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
      <EditorCard />
    </Dialog>
  )
}
