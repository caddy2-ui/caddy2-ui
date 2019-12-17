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
import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Server } from "../index";

import { useUpdateServerOptions } from "../updateServerOptions";

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
  const [skip1, setSkip1] = useState(true)
  const [skip2, setSkip2] = useState(true)
  const options = useUpdateServerOptions()
  return (
    <Card>
      <CardHeader title={'HTTPS 自动续签配置'}></CardHeader>
      <Divider />
      <CardContent>
        <List>
          <ListItem>
            <ListItemText primary={"开启自动续签"}></ListItemText>
            <ListItemSecondaryAction>
              <Switch
                checked={!config.disable}
                value={!config.disable}
                onChange={(e, v) => options.setHTTPSAuto(!v)}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={"开启 HTTP 跳转 HTTPS"}></ListItemText>
            <ListItemSecondaryAction>
              <Switch
                checked={!config.disable_redirects}
                value={!config.disable_redirects}
                onChange={(e, v) => options.setHTTPRedirect2HTTPS(!v)}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={() => setSkip1(!skip1)}>
            <ListItemText primary={"不启用自动续签的域名"}></ListItemText>
            <ListItemSecondaryAction>
              {skip1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={skip1}>
            <List component="div" disablePadding>
              {(config.skip || ['没有']).map(h => (
                <ListItem key={h} className={classes.nested}>
                  <ListItemText primary={h} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem button onClick={() => setSkip2(!skip2)}>
            <ListItemText primary={"skip_certificates (不太清楚干啥的)"}></ListItemText>
            <ListItemSecondaryAction>
              {skip2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={skip2}>
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
              <Switch
                checked={!!config.ignore_loaded_certificates}
                value={!!config.ignore_loaded_certificates}
                onChange={(e, v) => options.setHTTPSIgnoreLoadedCertificates(v)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
