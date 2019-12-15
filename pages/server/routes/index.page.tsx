import React, { } from "react";
import { caddy2Config } from "~libs/browser/caddy2";
import { getServer } from "../index";
import { useRouter } from "next/router";
import { Main as MainLayout } from "~pages/layouts";
import { ContentLayout } from "../components/ContentLayout";
import { makeStyles, useTheme } from "@material-ui/core";
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
  CardActions,
  Button,
} from "@material-ui/core";
import { Listen } from "../components/Listen";
import { AutoHTTPS } from "../components/AutoHTTPS";
import { ServerOptions } from "../components/ServerOptions";
import { Logs } from "../components/Logs";
import Head from "next/head";
import { RouteCard } from "./route";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }
}))

export default () => {

  const classes = useStyles(useTheme())
  const router = useRouter()
  const name = router.query.name as string
  const [config] = caddy2Config.useContainer()
  const server = getServer(config, name)
  const { routes = [] } = server

  return (
    <ContentLayout>
      <Head>
        <title>路由</title>
      </Head>
      <Card>
        <CardHeader title={"路由配置"} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {
              routes.map((route, id) => (
                <Grid item key={id}
                  lg={6}
                  md={6}
                  xl={4}
                  xs={12}
                >
                  <RouteCard route={route} id={id} />
                </Grid>
              ))
            }
          </Grid>
        </CardContent>
      </Card>
    </ContentLayout>
  )
}
