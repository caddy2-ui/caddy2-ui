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
  ListItemSecondaryAction,
  Switch,
  Checkbox,
  CardActions,
  Button,
  Collapse,
} from "@material-ui/core";
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Server } from "./index";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))


export interface Props {
  config: Server['automatic_https']
}

export const AutoHTTPS: React.StatelessComponent<Props> = ({ config }) => {
  const classes = useStyles(useTheme())
  return (
    <Card>
      <CardHeader title={'HTTPS 配置'}></CardHeader>
      <CardContent>
        <List>
          <ListItem>
            <ListItemText primary={"自动续签 HTTPS"}></ListItemText>
            <ListItemSecondaryAction>
              <Switch checked={!config.disable}></Switch>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={"HTTP 跳转 HTTPS"}></ListItemText>
            <ListItemSecondaryAction>
              <Switch checked={!config.disable_redirects}></Switch>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={"不启用自动续签的域名"}></ListItemText>
            <ListItemSecondaryAction>
              <ExpandMoreIcon></ExpandMoreIcon>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={true}>
            <List component="div" disablePadding>
              {(config.skip || ['没有']).map(h => (
                <ListItem key={h} className={classes.nested}>
                  <ListItemText primary={h} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem>
            <ListItemText primary={"skip_certificates (不太清楚)"}></ListItemText>
            <ListItemSecondaryAction>
              <ExpandMoreIcon></ExpandMoreIcon>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={true}>
            <List component="div" disablePadding>
              {(config.skip_certificates || ['没有']).map(h => (
                <ListItem key={h} className={classes.nested}>
                  <ListItemText primary={h} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem>
            <ListItemText primary={"忽略已存在的证书"}></ListItemText>
            <ListItemSecondaryAction>
              <Switch checked={!!config.ignore_loaded_certificates}></Switch>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
