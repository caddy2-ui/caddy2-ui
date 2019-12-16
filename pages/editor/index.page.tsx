import React, { useRef, useEffect } from 'react'
import { caddy2Config } from "~libs/browser/caddy2";
import { makeStyles, useTheme, colors } from "@material-ui/core";
import { Main as MainLayout } from "~pages/layouts";
import {
  Container,
  Grid,
} from "@material-ui/core";
import { schmea } from "./schema";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

export default () => {

  const classes = useStyles(useTheme())
  const [config] = caddy2Config.useContainer()
  const f = useRef()
  useEffect(() => {
    if (!f.current) {
      return
    }
    // @ts-ignore
    window.MonacoEnvironment = { baseUrl: '/monaco-editor' }
    import("monaco-editor").then((monaco) => {
      let val = JSON.stringify(config, null, 2)
      let modelUri = monaco.Uri.parse('a://b/foo.json')
      let model = monaco.editor.createModel(val, `json`, modelUri)

      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: 'http://caddy2-config/config-edit',
            fileMatch: [modelUri.toString()],
            schema: {
              $ref: 'http://caddy2-config/config',
            }
          },
          ...schmea.schemas,
        ],
      })

      monaco.editor.create(f.current, {
        model,
      })
    })
  }, [f, config])

  return (
    <MainLayout>
      <Container className={classes.root} maxWidth='lg'>
        <div style={{ height: 700 }} ref={f}></div>
      </Container>
    </MainLayout>
  )
}
