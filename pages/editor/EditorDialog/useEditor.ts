import { editorDialogState } from "./state";
import copy from "fast-copy";

export const useEditor = () => {
  const [state, setState] = editorDialogState.useContainer()
  const close = () => {
    let nextState = ((state) => (state.open = false, state))(copy(state))
    setState(nextState)
  }
  const open = ({ config, file }: { config: string, file: string }, onSave: (config: string) => Promise<any> | any) => {
    let nextState = ((state) => (
      state.file = file,
      state.value = config,
      state.onSave = onSave,
      state.open = true,
      state
    ))(copy(state))
    setState(nextState)
  }
  const save = (value: string) => {
    let nextState = ((state) => (state.posting = true, state))(copy(state))
    setState(nextState)
    Promise.resolve(state.onSave(value))
      .finally(() => {
        setState(state => ({
          ...state,
          posting: false,
        }))
      })
  }
  return {
    close,
    state,
    open,
    save,
  }
}
