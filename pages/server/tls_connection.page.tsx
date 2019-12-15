import React, { } from "react";
import { caddy2Config } from "~libs/browser/caddy2";
import { getServer } from "./index";
import { useRouter } from "next/router";
import { ContentLayout } from "./components/ContentLayout.tsx";
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
import { ConnectionPolicyCard } from "./components/ConnectionPolicyCard";
import Head from "next/head";

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

  return (
    <ContentLayout>
      <Head>
        <title>TLS 连接配置</title>
      </Head>
      <Card>
        <CardHeader title={"TLS 连接配置"}></CardHeader>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {(server.tls_connection_policies || [] as typeof server.tls_connection_policies).map((policy, i) => (
              <Grid item key={i}
                lg={6}
                md={6}
                xl={4}
                xs={12}
              >
                <ConnectionPolicyCard
                  policy={policy}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </ContentLayout>
  )
}
