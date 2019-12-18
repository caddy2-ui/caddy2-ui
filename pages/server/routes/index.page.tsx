import React, { useState, useEffect, useMemo, Fragment } from "react";
import { caddy2Config } from "~libs/browser/caddy2";
import { getServer } from "../index";
import { useRouter } from "next/router";
import { ContentLayout } from "../components/ContentLayout";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Button,
  Tooltip,
} from "@material-ui/core";
import Head from "next/head";
import { RouteCard } from "./route";
import { useDrag, useDrop } from "react-dnd";
import { useEditor } from "~pages/editor";
import { useUpdateServerOptions } from '../updateServerOptions'

import { makeStyles, useTheme } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }
}))

type DragItem = { type: symbol, id: number, route: Route }
import sum from "hash-sum";
import copy from "fast-copy";
const makeRoute2DragItem = (ItemType: symbol) => (route: Route, id: number): DragItem => ({ type: ItemType, route, id, })

const NewRouteButton: React.StatelessComponent = () => {

  const options = useUpdateServerOptions()
  const editor = useEditor()
  const openEditor = () => {
    editor.open(
      {
        config: {
          group: '',
          match: [
            {
              path: [''],
            }
          ],
          handle: [
            { handler: '' as any }
          ],
          terminal: false,
        } as Route,
        file: '/config/app/http/server/route/config.json'
      },
      async (route) => {
        await options.addRoute(route)
        editor.close()
      },
    )
  }

  return (
    <Button color='primary' variant='contained' onClick={openEditor}>
      新建
    </Button>
  )
}

const RoutesPage = () => {

  const classes = useStyles(useTheme())
  const router = useRouter()
  const name = router.query.name as string
  const [config] = caddy2Config.useContainer()
  const server = getServer(config, name)
  const { routes = [] } = server

  const { ItemType, route2DragItem } = useMemo((t = Symbol()) => ({ ItemType: t, route2DragItem: makeRoute2DragItem(t) }), [])
  const [displayRoutes, setDisplayRoutes] = useState<DragItem[]>(routes.map(route2DragItem))
  useEffect(() => {
    setDisplayRoutes(routes.map(route2DragItem))
  }, [sum(routes)])
  const newRoutes = displayRoutes.map(i => i.route)
  const hasNewOrder = sum(routes) !== sum(newRoutes)

  const options = useUpdateServerOptions()

  const actions = (
    <Grid container spacing={1}>
      <Grid item>
        <Tooltip
          title={'排序有变化是否保存新的 Route 排序?'}
          style={{ visibility: hasNewOrder ? 'visible' : 'hidden' }}
          placement='top'
          arrow
        >
          <Button color='primary' variant='contained' onClick={() => options.updateRoutesOrder(newRoutes)}>
            保存排序
          </Button>
        </Tooltip>
      </Grid>
      <Grid item>
        <NewRouteButton></NewRouteButton>
      </Grid>
    </Grid>
  )

  return (
    <ContentLayout>
      <Head>
        <title>路由</title>
      </Head>
      <Card>
        <CardHeader
          title={"路由配置"}
          action={actions}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {
              displayRoutes.map((item, id) => {
                const [, drop] = useDrop<DragItem, void, any>({
                  accept: ItemType,
                  drop: (dragItem) => { },
                  hover: (dragItem) => { // hover finish drop work
                    if (dragItem.id === item.id) {
                      return
                    }
                    let newDisplayRoutes = copy(displayRoutes).filter(i => i.id !== dragItem.id)
                    newDisplayRoutes.splice(id, 0, dragItem)
                    setDisplayRoutes(newDisplayRoutes)
                  },
                })
                const [, drag] = useDrag({
                  item: item,
                  end: () => {
                    // setDisplayRoutes(routes.map(route2DragItem))
                  }
                })
                return (
                  <Grid item key={item.id}
                    ref={drop}
                    lg={6}
                    md={6}
                    xl={4}
                    xs={12}
                  >
                    <div ref={drag}>
                      <RouteCard route={item.route} id={item.id} />
                    </div>
                  </Grid>
                )
              })
            }
          </Grid>
        </CardContent>
      </Card>
    </ContentLayout>
  )
}

import { DndProvider } from "react-dnd";
import Backend from 'react-dnd-html5-backend'
import { Route } from "~libs/caddy/Route";

export default () => {
  return (
    <DndProvider backend={Backend}>
      <RoutesPage />
    </DndProvider>
  )
}
