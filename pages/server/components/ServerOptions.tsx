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
  CardActions,
  Button,
  Switch,
  Collapse,
  Tooltip,
} from "@material-ui/core";
import React, { useState } from "react";
import { Server } from "../index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export interface Props {
  server: Server
  name: string
}

const createItem = (displayName: string, transform: (s: Server) => any) => ({
  displayName,
  transform,
})

const Items = [
  createItem('请求超时时间', (s) => (s.read_timeout || '未设置')),
  createItem('请求头部超时时间', (s) => (s.read_header_timeout || '未设置')),
  createItem('请求头部最大大小', (s) => (s.max_header_bytes || '未设置')),
  createItem('返回超时时间', (s) => (s.write_timeout || '未设置')),
  createItem('Keep-Alive 时间', (s) => (s.idle_timeout || '未设置')),
  createItem('max_rehandles (不太清楚)', (s) => (s.max_rehandles || '3')),
]

import { makeStyles, useTheme } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

import { useUpdateServerOptions } from "../updateServerOptions";

export const ServerOptions: React.StatelessComponent<Props> = ({ server, name }) => {

  const classes = useStyles(useTheme())
  const [openExperimental, setOpenExperimental] = useState(typeof server.experimental_http3 !== 'undefined')
  const options = useUpdateServerOptions()

  return (
    <Card>
      <CardHeader title={'服务配置'}></CardHeader>
      <Divider />
      <CardContent>
        <List>
          {Items.map((item) => (
            <ListItem key={item.displayName}>
              <ListItemText primary={item.displayName}></ListItemText>
              <ListItemSecondaryAction>
                {item.transform(server)}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem>
            <ListItemText primary={'strict_sni_host'}></ListItemText>
            <ListItemSecondaryAction>
              <Tooltip placement='top' title={'对客户端验证很重要, 如果有客户端验证的话开启这个选项'}>
                <Switch
                  checked={!!server.strict_sni_host}
                  value={!!server.strict_sni_host}
                  onChange={(e, v) => options.setStrictSNIHost(v)}
                />
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={() => setOpenExperimental(!openExperimental)}>
            <ListItemText primary={"实验性选项"}></ListItemText>
            <ListItemSecondaryAction>
              {openExperimental ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={openExperimental}>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemText primary={'启用 http3 支持'}></ListItemText>
                <ListItemSecondaryAction>
                  <Switch
                    checked={!!server.experimental_http3}
                    onChange={(e, value) => options.setHTTP3(value)}
                    value={!!server.experimental_http3}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </CardContent>
    </Card>
  )
}
