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
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useEditor } from "~pages/editor";

import { makeStyles, useTheme } from "@material-ui/core";
import { Handler } from "~libs/caddy/Route/Route";

const useStyles = makeStyles(theme => ({
  card_header: {
    paddingBottom: theme.spacing(1),
  },
  item: {},
}))

import { useDrag, useDrop } from "react-dnd";
type DragItem = { type: symbol, id: number, handler: Handler }
import sum from "hash-sum";
import copy from "fast-copy";
const makeRoute2DragItem = (ItemType: symbol) => (handler: Handler, id: number): DragItem => ({ type: ItemType, handler, id, })

export interface Props {
  handlers: Handler[]
}

export const HandleCard: React.StatelessComponent<Props> = ({ handlers }) => {
  const classes = useStyles(useTheme())

  const editor = useEditor()
  const openEditor = () => {
    editor.open(
      {
        config: { handle: handlers, },
        file: '/config/app/http/server/route/config.json'
      },
      (config) => {
        console.log(config)
        editor.close()
      },
    )
  }
  const openHandlerEditor = (id: number) => {
    let handler = handlers[id]
    editor.open(
      {
        config: handler,
        file: `/config/app/http/server/handler/${handler.handler}/config.json`
      },
      (config) => {
        console.log(config)
        editor.close()
      },
    )
  }

  const { ItemType, route2DragItem } = useMemo((t = Symbol()) => ({ ItemType: t, route2DragItem: makeRoute2DragItem(t) }), [])
  const [displayHandlers, setDisplayHandlers] = useState<DragItem[]>(handlers.map(route2DragItem))
  useEffect(() => {
    setDisplayHandlers(handlers.map(route2DragItem))
  }, [sum(handlers)])
  const nowHandlers = displayHandlers.map(i => i.handler)
  const hasNewOrder = sum(handlers) !== sum(nowHandlers)

  return (
    <Table cellSpacing={0} size='small'>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography className={classes.card_header} variant='h4'>Handler</Typography>
          </TableCell>
          <TableCell style={{ width: 44 }} padding='none'>
          </TableCell>
          <TableCell style={{ width: 44 }} padding='none'>
            <IconButton onClick={openEditor}><EditIcon fontSize='small' /></IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayHandlers.map((item, id) => {

          const [, drop] = useDrop<DragItem, void, any>({
            accept: ItemType,
            drop: (dragItem) => { },
            hover: (dragItem) => { // hover finish drop work
              if (dragItem.id === item.id) {
                return
              }
              let newDisplayRoutes = copy(displayHandlers).filter(i => i.id !== dragItem.id)
              newDisplayRoutes.splice(id, 0, dragItem)
              setDisplayHandlers(newDisplayRoutes)
            },
          })
          const [, drag] = useDrag({
            item: item,
            end: () => {
              // setDisplayRoutes(routes.map(route2DragItem))
            }
          })
          return (
            <TableRow hover ref={drag} className={classes.item} key={item.id}>
              <TableCell ref={drop}>
                {item.handler.handler}
              </TableCell>
              <TableCell padding='none'>
                <IconButton onClick={() => openHandlerEditor(item.id)}>
                  <EditIcon fontSize='small' />
                </IconButton>
              </TableCell>
              <TableCell padding='none'>
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
