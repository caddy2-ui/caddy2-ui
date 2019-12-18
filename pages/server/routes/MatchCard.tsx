import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useState, useEffect, useMemo } from "react";
import { MoreOptions } from "~pages/components/MoreOptions";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { MatcherSpan } from "./MatcherSpan";
import { Matcher } from "~libs/caddy/Route";
import { useEditor } from "~pages/editor";

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
}))

export interface Props {
  matchers: Matcher[]
}

interface MatchRowProps {
  ItemType: symbol,
  item: DragItem,
  id: number,
  displayMatchers: any,
  setDisplayMatchers: any
}

export const MatcherRow: React.StatelessComponent<MatchRowProps> = ({
  ItemType,
  item,
  id,
  displayMatchers,
  setDisplayMatchers,
}) => {

  const editor = useEditor()
  const openEditor = () => {
    editor.open(
      {
        config: item.matcher,
        file: '/config/app/http/server/matcher/config.json'
      },
      (config) => {
        console.log(config)
        editor.close()
      },
    )
  }

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
    <TableRow hover ref={drag} key={id}>
      <TableCell ref={drop}>
        <MatcherSpan matcher={item.matcher}></MatcherSpan>
      </TableCell>
      <TableCell padding='none'>
        <MoreOptions>
          <MenuItem onClick={openEditor}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText primary='编辑'></ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon><DeleteIcon /></ListItemIcon>
            <ListItemText primary='删除'></ListItemText>
          </MenuItem>
        </MoreOptions>
      </TableCell>
    </TableRow>
  )
}

export const MatchCard: React.StatelessComponent<Props> = ({ matchers }) => {
  const classes = useStyles(useTheme())

  const editor = useEditor()
  const openEditor = () => {
    editor.open(
      {
        config: { match: matchers, },
        file: '/config/app/http/server/route/config.json'
      },
      (config) => {
        console.log(config)
        editor.close()
      },
    )
  }

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
          <TableCell style={{ width: 44 }} padding='none'>
            <MoreOptions>
              <MenuItem onClick={openEditor}>
                <ListItemIcon><EditIcon /></ListItemIcon>
                <ListItemText primary='编辑'></ListItemText>
              </MenuItem>
            </MoreOptions>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayMatchers.map((item, id) => {
          return (
            <MatcherRow key={item.id} {...{
              ItemType,
              item,
              id,
              displayMatchers,
              setDisplayMatchers,
            }} />
          )
        })}
      </TableBody>
    </Table>
  )
}
