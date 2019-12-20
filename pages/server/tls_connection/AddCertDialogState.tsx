import { useState } from "react";
import { createContainer } from "unstated-next";

export const useCertEditorState = () => {
  return useState<{
    open: boolean,
    tabValue: number,
    posting: boolean,
    cert: string,
    handleSave: (content: string) => Promise<any> | any,
  }>({
    open: false,
    tabValue: 0,
    posting: false,
    handleSave: () => 0,
    cert: '',
  })
}
export const useCertEditor = () => {
  const [state, setState] = CertEditorState.useContainer()
  const open = ({ cert = '', tabValue = 0 }: { cert: string, tabValue?: number }, handleSave: (cert: string) => Promise<any> | any) => {
    setState({
      ...state,
      open: true,
      tabValue,
      cert,
      handleSave,
    })
  }
  const save = (content: string) => {
    setState({ ...state, cert: content, posting: true })
    Promise.resolve(state.handleSave(JSON.stringify(content)))
      .finally(() => {
        setState((state) => ({ ...state, posting: false }))
      })
  }
  const close = () => {
    setState((state) => ({ ...state, open: false }))
  }
  const openTab = (value) => {
    setState((state) => ({ ...state, tabValue: value }))
  }
  return {
    openTab,
    state,
    save,
    open,
    close,
  }
}

export const CertEditorState = createContainer(useCertEditorState)
