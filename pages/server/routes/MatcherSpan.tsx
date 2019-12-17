import { Route, Matcher } from "~libs/caddy/Route";
import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";

const createCol = (displayName: string, transform: (m: Matcher) => any) => ({
  displayName,
  transform,
})
const columns = [
  createCol('allow_ip', ({ remote_ip: { ranges: allow_ip = [] } = {} }) => {
    if (allow_ip.length === 0) return null;
    return (<pre style={{ display: 'inline' }}>{JSON.stringify(allow_ip)}</pre>)
  }),
  createCol('method', ({ method = [] }) => {
    if (method.length === 0) return null;
    return (<pre style={{ display: 'inline' }}>{JSON.stringify(method)}</pre>)
  }),
  createCol('protocol', ({ protocol = '', }) => {
    if (protocol.length === 0) return null;
    return (<pre style={{ display: 'inline' }}>{protocol}://</pre>)
  }),
  createCol('host', ({ host = [] }) => {
    if (host.length === 0) return null;
    return (<pre style={{ display: 'inline' }}>{JSON.stringify(host)}/</pre>)
  }),
  createCol('path', ({ path = [] }) => {
    if (path.length === 0) return null;
    return (<pre style={{ display: 'inline' }}>{JSON.stringify(path)}</pre>)
  }),
  createCol('query', ({ query = {} }) => {
    if (Object.keys(query).length === 0) return null;
    return (<pre style={{ display: 'inline' }}>{JSON.stringify(query)}</pre>)
  }),
]

export const MatcherSpan: React.StatelessComponent<{ matcher: Matcher }> = ({ matcher }) => {
  return (
    <Typography component='div'>
      {
        columns
          .map(({ transform, displayName }) => ({
            displayName,
            node: transform(matcher),
          }))
          .filter(col => col.node !== null)
          .map(({ displayName, node }) => (
            <span key={displayName}>
              <Tooltip title={displayName} arrow placement='top-start'>
                {node}
              </Tooltip>
            </span>
          ))
      }
    </Typography>
  )
}