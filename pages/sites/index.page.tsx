import React from 'react'
import { Main as MainLayout } from "~pages/layouts";
import { makeStyles, useTheme } from "@material-ui/core";
import {
  Grid,
  Card, CardContent,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

export default () => {
  const classes = useStyles(useTheme())
  return (
    <MainLayout>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={3}>
            <Card>
              <CardContent>eewwew</CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  )
}
