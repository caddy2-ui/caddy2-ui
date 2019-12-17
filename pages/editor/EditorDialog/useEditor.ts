import { editorDialogState } from "./state";

export const useEditor = () => {
  const [state, setState] = editorDialogState.useContainer()
  const close = () => {
    setState({
      open: false
    })
  }
  return {
    close,
    state,
  }
}
