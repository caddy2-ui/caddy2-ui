import { editorDialogState } from "./state";
import copy from "fast-copy";

export const useEditor = () => {
  const [state, setState] = editorDialogState.useContainer()
  const close = () => {
    let nextState = copy(state)
    nextState.open = false
    setState(nextState)
  }
  const open = ({ config, file }: { config: string, file: string }, onSave: (config: string) => Promise<any>) => {
    let nextState = copy(state)
    nextState.file = file
    nextState.value = config
    nextState.onSave = onSave
    setState(nextState)
  }
  const save = (value: string)=>{
    state.onSave(value)
  }
  return {
    close,
    state,
    open,
    save,
  }
}
