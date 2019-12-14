import React from 'react'
import { caddy2Config } from "~libs/browser/caddy2";
import { makeStyles, useTheme, colors } from "@material-ui/core";
import { Main as MainLayout } from "~pages/layouts";
import { Server } from "../index";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
  },
}))

export interface Props {
  site: Server,
  title: string
}

export const SiteCard: React.StatelessComponent<Props> = ({ site, title }) => {

  const classes = useStyles(useTheme())

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        {site.listen.map((l) => (
          <ListItem>
            <ListItemText primary={l}></ListItemText>
          </ListItem>
        ))}
      </CardContent>
    </Card>
  )
}

export default SiteCard
