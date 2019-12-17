import React, { useState } from "react";
import { createContainer } from "unstated-next";

interface State {
  open: boolean,
  value: string,
  file: string
  onSave: (config: string) => Promise<any>,
}

export const useEditorDialogState = () => {
  return useState<State>({
    open: true,
    value: '',
    file: '/config/dialog.json',
    onSave: async () => 0,
  })
}

export const editorDialogState = createContainer(useEditorDialogState)
