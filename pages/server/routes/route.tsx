import React, { } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  colors,
  IconButton,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";
import { Route, Matcher } from "~libs/caddy/Route";
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { MatcherSpan } from "./MatcherSpan";

import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  content: {
    // padding: 0,
    // '&:last-child': {
    //   paddingBottom: 0,
    // }
  },
  card_header: {
    paddingBottom: theme.spacing(1),
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  item: {},
}))

interface Props {
  route: Route
  id: number
}

export const RouteCard: React.StatelessComponent<Props> = ({ route, id }) => {
  const classes = useStyles(useTheme())
  const title = 'Route-' + id + (route.group ? ` : ${route.group}` : '')
  const { match = [], handle = [] } = route
  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <IconButton>
            {
              route.terminal
                ? <KeyboardTabIcon fontSize='small' />
                : <ArrowForwardIcon fontSize='small' />
            }
          </IconButton>
        }
      />
      <Divider />
      <CardContent className={classes.content}>
        <Grid container direction='column' spacing={3}>
          {match.length === 0 ? null : (
            <Grid item>
              <Table cellSpacing={0} size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.card_header} variant='h4'>Matcher</Typography>
                    </TableCell>
                    <TableCell padding='none'>
                      <IconButton><EditIcon fontSize='small' /></IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {match.map((matcher, id) => (
                    <TableRow draggable hover className={classes.item} key={id}>
                      <TableCell>
                        <MatcherSpan matcher={matcher}></MatcherSpan>
                      </TableCell>
                      <TableCell style={{ width: 44 }} padding='none'>
                        <IconButton>
                          <ArrowDownwardIcon fontSize='small' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          )}
          <Grid item>
            <Table cellSpacing={0} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.card_header} variant='h4'>Handler</Typography>
                  </TableCell>
                  <TableCell padding='none'>
                    <IconButton><EditIcon fontSize='small' /></IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {handle.map((handler, id) => (
                  <TableRow draggable hover className={classes.item} key={id}>
                    <TableCell>
                      {handler.handler}
                    </TableCell>
                    <TableCell style={{ width: 44 }} padding='none'>
                      <IconButton>
                        <ArrowDownwardIcon fontSize='small' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  )
}
