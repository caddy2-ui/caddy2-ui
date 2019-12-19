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
  Button,
} from "@material-ui/core";
import React, { useState, useEffect, useMemo, Fragment } from "react";
import { MoreOptions } from "~pages/components/MoreOptions";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useEditor } from "~pages/editor";

import { makeStyles, useTheme } from "@material-ui/core";
import { Handler } from "~libs/caddy/Route/Route";

const useStyles = makeStyles(theme => ({
  card_header: {
    fontWeight: 'bold',
  },
  item: {},
}))

import { useDrag, useDrop } from "react-dnd";
type DragItem = { type: symbol, id: number, handler: Handler }
import sum from "hash-sum";
import copy from "fast-copy";
import { useUpdateServerOptions } from "../updateServerOptions";
import { route } from "next/dist/next-server/server/router";
const makeRoute2DragItem = (ItemType: symbol) => (handler: Handler, id: number): DragItem => ({ type: ItemType, handler, id, })
const HandlerDragRow: React.StatelessComponent<{ item: DragItem, ItemType: symbol, order: number, routeID: number, ditems: DragItem[], setDitems: any, }> = ({
  item,
  ItemType,
  order,
  routeID,
  ditems,
  setDitems,
}) => {
  const classes = useStyles(useTheme())

  const options = useUpdateServerOptions()
  const editor = useEditor()
  const openHandlerEditor = (id: number) => {
    let handler = item.handler
    editor.open(
      {
        config: handler,
        file: `/config/app/http/server/handler/${handler.handler}/config.json`
      },
      async (config) => {
        await options.updateHandler(routeID, item.id, config)
        editor.close()
      },
    )
  }
  const delHandler = async () => {
    await options.delHandler(routeID, item.id)
  }

  const [, drop] = useDrop<DragItem, void, any>({
    accept: ItemType,
    drop: (dragItem) => { },
    hover: (dragItem) => { // hover finish drop work
      if (dragItem.id === item.id) {
        return
      }
      let newDisplayRoutes = copy(ditems).filter(i => i.id !== dragItem.id)
      newDisplayRoutes.splice(order, 0, dragItem)
      setDitems(newDisplayRoutes)
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
      <TableCell ref={drop} colSpan={2}>
        {item.handler.handler}
      </TableCell>
      <TableCell padding='none'>
        <MoreOptions>
          <MenuItem onClick={() => openHandlerEditor(item.id)}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText primary='编辑'></ListItemText>
          </MenuItem>
          <MenuItem onClick={delHandler}>
            <ListItemIcon><DeleteIcon /></ListItemIcon>
            <ListItemText primary='删除'></ListItemText>
          </MenuItem>
        </MoreOptions>
      </TableCell>
    </TableRow>
  )
}

export interface Props {
  handlers: Handler[]
  routeID: number
}

export const HandleCard: React.StatelessComponent<Props> = ({ handlers, routeID }) => {
  const classes = useStyles(useTheme())

  const editor = useEditor()
  const options = useUpdateServerOptions()
  const openEditor = () => {
    editor.open(
      {
        config: { handle: handlers.length ? handlers : [{ handler: '' } as any], },
        file: '/config/app/http/server/route/config.json'
      },
      async (config) => {
        if (handlers.length) {
          await options.updateHandle(routeID, config.handle)
        } else {
          await options.addHandle(routeID, config.handle)
        }
        editor.close()
      },
    )
  }
  const openAddEditor = () => {
    editor.open(
      {
        config: { handler: '' } as any,
        file: `/config/app/http/server/handler/config.json`
      },
      async (config) => {
        await options.addHandler(routeID, config)
        editor.close()
      },
    )
  }
  const delHandle = () => {
    options.delHandle(routeID)
  }

  const { ItemType, route2DragItem } = useMemo((t = Symbol()) => ({ ItemType: t, route2DragItem: makeRoute2DragItem(t) }), [])
  const [displayHandlers, setDisplayHandlers] = useState<DragItem[]>(handlers.map(route2DragItem))
  useEffect(() => {
    setDisplayHandlers(handlers.map(route2DragItem))
  }, [sum(handlers)])
  const nowHandlers = displayHandlers.map(i => i.handler)
  const hasNewOrder = sum(handlers) !== sum(nowHandlers)
  const saveOrder = async () => {
    await options.updateHandle(routeID, nowHandlers)
  }

  return (
    <Table cellSpacing={0} size='small'>
      <TableHead>
        <TableRow>
          <TableCell className={classes.card_header}>
            Handler
          </TableCell>
          <TableCell padding='none' align='right'>
            {hasNewOrder && <Button onClick={saveOrder} size='small' color='primary' variant='contained'>保存排序</Button>}
          </TableCell>
          <TableCell style={{ width: 44 }} padding='none'>
            <MoreOptions>
              <MenuItem onClick={openEditor}>
                <ListItemIcon><EditIcon /></ListItemIcon>
                <ListItemText primary='编辑'></ListItemText>
              </MenuItem>
              <MenuItem onClick={openAddEditor}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary='添加'></ListItemText>
              </MenuItem>
              {/* <MenuItem onClick={delHandle}>
                <ListItemIcon><DeleteIcon /></ListItemIcon>
                <ListItemText primary='删除'></ListItemText>
              </MenuItem> */}
            </MoreOptions>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayHandlers.map((item, order) => {
          return (
            <Fragment key={item.id}>
              <HandlerDragRow
                {...{
                  item,
                  ItemType,
                  order,
                  routeID,
                  ditems: displayHandlers,
                  setDitems: setDisplayHandlers,
                }}
              />
            </Fragment>
          )
        })}
      </TableBody>
    </Table>
  )
}
