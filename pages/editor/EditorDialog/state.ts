import React, { useState } from "react";
import { createContainer } from "unstated-next";

interface State {
  open: boolean,
  value: string,
  file: string,
  posting: boolean,
  onSave: (config: any) => Promise<any>,
}

export const useEditorDialogState = () => {
  return useState<State>({
    open: false,
    value: '',
    file: '/config/dialog.json',
    onSave: () => new Promise(rl => setTimeout(rl, 5e3)),
    posting: false,
  })
}

export const editorDialogState = createContainer(useEditorDialogState)
