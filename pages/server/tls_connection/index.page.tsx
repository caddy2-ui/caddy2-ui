import React, { Fragment } from "react";
import { caddy2Config } from "~libs/browser/caddy2";
import { getServer } from "../index";
import { useRouter } from "next/router";
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
import { ConnectionPolicyCard } from "./ConnectionPolicyCard";
import Head from "next/head";
import { useEditor } from "~pages/editor";
import { useUpdateServerOptions } from "../updateServerOptions";
import { ConnectionPolicy } from "~libs/caddy/Server/ConnectionPolicy";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }
}))

export const TLSConnectionPolicyPage = () => {

  const classes = useStyles(useTheme())
  const router = useRouter()
  const name = router.query.name as string
  const [config] = caddy2Config.useContainer()
  const server = getServer(config, name)

  const options = useUpdateServerOptions()
  const editor = useEditor()
  const openAddEditor = () => {
    editor.open(
      {
        config: {
          match: { sni: [] },
          client_authentication: {
            trusted_ca_certs: [],
            trusted_leaf_certs: [],
          }
        } as ConnectionPolicy,
        file: '/config/app/http/server/tls_connection_policy/config.json'
      },
      async (config) => {
        await options.addConnectionPolicy(config, typeof server.tls_connection_policies === 'undefined')
        editor.close()
      }
    )
  }

  const policies = server.tls_connection_policies || []

  const action = (
    <Button onClick={openAddEditor} variant='contained' color='primary'>添加</Button>
  )

  return (
    <Fragment>
      <Head>
        <title>TLS 连接配置</title>
      </Head>
      <Card>
        <CardHeader
          title={"TLS 连接配置"}
          action={action}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {policies.map((policy, i) => (
              <Grid item key={i}
                lg={6}
                md={6}
                xl={4}
                xs={12}
              >
                <ConnectionPolicyCard
                  policy={policy}
                  id={i}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  )
}

import { AddCertDialog } from "./AddCertDialog";
import { CertEditorState } from "./AddCertDialogState";
export default () => {
  return (
    <CertEditorState.Provider>
      <ContentLayout>
        <AddCertDialog />
        <TLSConnectionPolicyPage />
      </ContentLayout>
    </CertEditorState.Provider>
  )
}
