import React, { useState } from "react";
import { createContainer } from "unstated-next";

export const useEditorDialogState = () => {
  return useState({
    open: true,
  })
}

export const editorDialogState = createContainer(useEditorDialogState)
