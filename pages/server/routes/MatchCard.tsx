import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  IconButton,
} from "@material-ui/core";
import React, { useState, useEffect, useMemo } from "react";
import EditIcon from '@material-ui/icons/Edit';
import { MatcherSpan } from "./MatcherSpan";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Matcher } from "~libs/caddy/Route";

import { useDrag, useDrop } from "react-dnd";
const ItemType = {
  Matcher: Symbol('matcher')
}
type DragItem = { type: symbol, id: number, matcher: Matcher }
import sum from "hash-sum";
import copy from "fast-copy";
const makeRoute2DragItem = (ItemType: symbol) => (matcher: Matcher, id: number): DragItem => ({ type: ItemType, matcher, id, })

import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card_header: {
    paddingBottom: theme.spacing(1),
  },
  item: {},
}))

export interface Props {
  matchers: Matcher[]
}

export const MatchCard: React.StatelessComponent<Props> = ({ matchers }) => {
  const classes = useStyles(useTheme())

  const { ItemType, route2DragItem } = useMemo((t = Symbol()) => ({ ItemType: t, route2DragItem: makeRoute2DragItem(t) }), [])
  const [displayMatchers, setDisplayMatchers] = useState<DragItem[]>(matchers.map(route2DragItem))
  useEffect(() => {
    setDisplayMatchers(matchers.map(route2DragItem))
  }, [sum(matchers)])
  const nowMatchers = displayMatchers.map(i => i.matcher)
  const hasNewOrder = sum(matchers) !== sum(nowMatchers)

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
        {displayMatchers.map((item, id) => {
          const [, drop] = useDrop<DragItem, void, any>({
            accept: ItemType,
            drop: (dragItem) => { },
            hover: (dragItem) => { // hover finish drop work
              if (dragItem.id === item.id) {
                return
              }
              let newDisplayRoutes = copy(displayMatchers).filter(i => i.id !== dragItem.id)
              newDisplayRoutes.splice(id, 0, dragItem)
              setDisplayMatchers(newDisplayRoutes)
            },
          })
          const [, drag] = useDrag({
            item: item,
            end: () => {
              // setDisplayRoutes(routes.map(route2DragItem))
            }
          })
          return (
            <TableRow hover ref={drag} className={classes.item} key={id}>
              <TableCell ref={drop}>
                <MatcherSpan matcher={item.matcher}></MatcherSpan>
              </TableCell>
              <TableCell style={{ width: 44 }} padding='none'>
                <IconButton>
                  <ArrowDownwardIcon fontSize='small' />
                </IconButton>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
