import React, { useRef, useEffect } from 'react'
import { makeStyles, useTheme, colors } from "@material-ui/core";
import { Main as MainLayout } from "~pages/layouts";
import { caddy2Config } from "~libs/browser/caddy2";
import {
  Container,
  Grid,
} from "@material-ui/core";
import { NoSsrEditor } from "./NoSsrEditor";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    height: '100%',
  },
}))

export default () => {

  const classes = useStyles(useTheme())
  const [config] = caddy2Config.useContainer()

  return (
    <MainLayout>
      <Container className={classes.root} maxWidth={false}>
        <NoSsrEditor config={config} />
      </Container>
    </MainLayout>
  )
}
