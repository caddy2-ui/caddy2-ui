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
} from "@material-ui/core";
import React from "react";
import { Server } from "../index";

export interface Props {
  listen: Server['listen']
}

export const Listen: React.StatelessComponent<Props> = (props) => {
  return (
    <Card>
      <CardHeader title={'监听地址列表'}></CardHeader>
      <CardContent>
        <List>
          {props.listen.map((site) => (
            <ListItem>
              <ListItemText primary={site}></ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button>新增别名</Button>
      </CardActions>
    </Card>
  )
}
