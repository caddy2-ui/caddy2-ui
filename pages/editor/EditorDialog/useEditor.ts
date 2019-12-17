import { editorDialogState } from "./state";
import copy from "fast-copy";

export const useEditor = () => {
  const [state, setState] = editorDialogState.useContainer()
  const close = () => {
    let nextState = ((state) => (state.open = false, state))(copy(state))
    setState(nextState)
  }
  const open = <T>({ config, file }: { config: T, file: string }, onSave: (config: T) => Promise<any> | any) => {
    let nextState = ((state) => (
      state.file = file,
      state.value = JSON.stringify(config, null, 2),
      state.onSave = onSave,
      state.open = true,
      state
    ))(copy(state))
    setState(nextState)
  }
  const save = (value: string) => {
    let nextState = ((state) => (state.posting = true, state))(copy(state))
    setState(nextState)
    Promise.resolve(state.onSave(JSON.parse(value)))
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
