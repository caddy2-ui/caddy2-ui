import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Button,
  IconButton,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Server } from "../index";
import { useEditor } from "~pages/editor";

export interface Props {
  listen: Server['listen']
}

export const Listen: React.StatelessComponent<Props> = (props) => {

  const editor = useEditor()
  const openEditor = () => {
    editor.open(
      {
        config: { listen: props.listen },
        file: '/config/app/http/server/config.json'
      },
      (config) => {
        console.log(config)
        editor.close()
      },
    )
  }

  return (
    <Card>
      <CardHeader title={'监听地址列表'}
        action={
          <IconButton
            onClick={openEditor}
          >
            <EditIcon />
          </IconButton>
        }
      />
      <Divider />
      <CardContent>
        <List>
          {props.listen.map((addr) => (
            <ListItem key={addr}>
              <ListItemText primary={addr}></ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
