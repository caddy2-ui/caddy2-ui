import React, { useRef, useEffect } from 'react'
import { makeStyles, useTheme, colors } from "@material-ui/core";
import { Main as MainLayout } from "~pages/layouts";
import { caddy2Config } from "~libs/browser/caddy2";
import {
  Container,
} from "@material-ui/core";
import { EditorCard, useEditor } from "./EditorDialog";
import { editorDialogState } from "./EditorDialog/state";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    height: '100%',
  },
}))

const EditorPage = () => {

  const classes = useStyles(useTheme())
  const [config] = caddy2Config.useContainer()
  const editor = useEditor()

  return (
    <MainLayout disableEditorDialog>
      <Container className={classes.root} maxWidth={false}>
        <EditorCard config={JSON.stringify(config, null, 2)} file='caddy2-edit:/config/editor.json' />
      </Container>
    </MainLayout>
  )
}

export default () => (
  <editorDialogState.Provider>
    <EditorPage />
  </editorDialogState.Provider>
)
