import React from 'react'
import { caddy2Config } from "~libs/browser/caddy2";
import { makeStyles, useTheme, colors } from "@material-ui/core";
import { Main as MainLayout } from "~pages/layouts";
import { Server } from "../index";
import Link from "next/link";
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
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root: {
  },
}))

export interface Props {
  server: Server,
  title: string
}

export const ServerCard: React.StatelessComponent<Props> = ({ server, title }) => {

  const classes = useStyles(useTheme())

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        {server.listen.map((l) => (
          <ListItem key={l}>
            <ListItemText primary={l}></ListItemText>
          </ListItem>
        ))}
      </CardContent>
      <CardActions>
        <Link href={`/server?name=${encodeURIComponent(title)}`}>
          <Button>
            <EditIcon />
            编辑
        </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default ServerCard
