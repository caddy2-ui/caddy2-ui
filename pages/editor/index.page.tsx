import React, { useRef, useEffect } from 'react'
import { makeStyles, useTheme, colors } from "@material-ui/core";
import { Main as MainLayout } from "~pages/layouts";
import {
  Container,
  Grid,
} from "@material-ui/core";
import dynamic from "next/dynamic";

const DynamicEditorWithNoSSR = dynamic(
  () => import('./editor'),
  { ssr: false }
)


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

export default () => {

  const classes = useStyles(useTheme())

  return (
    <MainLayout>
      <Container className={classes.root} maxWidth='lg'>
        <DynamicEditorWithNoSSR />
      </Container>
    </MainLayout>
  )
}
