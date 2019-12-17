import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Grid,
} from "@material-ui/core";
import { Route } from "~libs/caddy/Route";
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import { MatchCard } from "./MatchCard";
import { HandleCard } from "./HandleCard";
import { useEditor } from "~pages/editor";

import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  content: {
  },
}))

interface Props {
  route: Route
  id: number
}

export const RouteCard: React.StatelessComponent<Props> = ({ route, id }) => {
  const classes = useStyles(useTheme())
  const title = 'Route-' + id + (route.group ? ` : ${route.group}` : '')
  const { match = [], handle = [] } = route

  const editor = useEditor()
  const openEditor = () => {
    editor.open(
      {
        config: route,
        file: '/config/app/http/server/route/config.json'
      },
      (config) => {
        console.log(config)
        editor.close()
      },
    )
  }

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <Fragment>
            <IconButton onClick={()=>openEditor()}>
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton>
              {route.terminal ? <KeyboardTabIcon fontSize='small' /> : <ArrowForwardIcon fontSize='small' />}
            </IconButton>
          </Fragment>
        }
      />
      <Divider />
      <CardContent className={classes.content}>
        <Grid container direction='column' spacing={3}>
          {match.length === 0 ? null : (
            <Grid item>
              <MatchCard matchers={match} />
            </Grid>
          )}
          <Grid item>
            <HandleCard handlers={handle} />
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  )
}
