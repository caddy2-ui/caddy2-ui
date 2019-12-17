import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import { MatcherSpan } from "./MatcherSpan";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Matcher } from "~libs/caddy/Route";

import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card_header: {
    paddingBottom: theme.spacing(1),
  },
  item: {},
}))

export interface Props {
  match: Matcher[]
}

export const MatchCard: React.StatelessComponent<Props> = ({ match }) => {
  const classes = useStyles(useTheme())
  return (
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
          <TableRow hover className={classes.item} key={id}>
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
  )
}
