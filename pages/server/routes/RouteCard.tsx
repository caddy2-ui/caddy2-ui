import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import { Route } from "~libs/caddy/Route";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import { MatchCard } from "./MatchCard";
import { HandleCard } from "./HandleCard";
import { useEditor } from "~pages/editor";
import { MoreOptions } from "~pages/components/MoreOptions";
import { useUpdateServerOptions } from "../updateServerOptions";

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
  const options = useUpdateServerOptions()

  const editor = useEditor()
  const openEditor = () => {
    editor.open(
      {
        config: route,
        file: '/config/app/http/server/route/config.json'
      },
      async (config) => {
        await options.updateRoute(config, id)
        editor.close()
      },
    )
  }
  const openAddMatchEditor = () => {
    editor.open(
      {
        config: { match: [] },
        file: '/config/app/http/server/route/config.json'
      },
      async (config) => {
        await options.addMatch(id, config.match)
        editor.close()
      },
    )
  }
  const deleteRoute = () => {
    options.delRoute(id)
  }
  const action = (
    <Fragment>
      <MoreOptions>
        {match.length !== 0 ? null : (
          <MenuItem onClick={() => openAddMatchEditor()} >
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary='添加 Match'></ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={() => openEditor()} >
          <ListItemIcon><EditIcon /></ListItemIcon>
          <ListItemText primary='编辑设置'></ListItemText>
        </MenuItem>
        <MenuItem onClick={deleteRoute}>
          <ListItemIcon ><DeleteIcon /></ListItemIcon>
          <ListItemText primary='删除'></ListItemText>
        </MenuItem>
      </MoreOptions>
      <IconButton>
        {route.terminal ? <KeyboardTabIcon fontSize='small' /> : <ArrowForwardIcon fontSize='small' />}
      </IconButton>
    </Fragment>
  )

  return (
    <Card style={{ minHeight: 520 }}>
      <CardHeader
        title={title}
        action={action}
      />
      <Divider />
      <CardContent className={classes.content}>
        <Grid container direction='column' spacing={3}>
          {match.length === 0 ? null : (
            <Grid item>
              <MatchCard routeID={id} matchers={match} />
            </Grid>
          )}
          <Grid item>
            <HandleCard routeID={id} handlers={handle} />
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  )
}
