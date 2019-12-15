import React, { } from "react";
import { caddy2Config } from "~libs/browser/caddy2";
import { getServer } from "./index";
import { useRouter } from "next/router";
import { Main as MainLayout } from "~pages/layouts";
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
import { Listen } from "./Listen";
import { AutoHTTPS } from "./AutoHTTPS";

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
    <MainLayout>
      <Container className={classes.root} maxWidth={false}>
        <Card>
          <CardHeader title={name}></CardHeader>
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <Listen listen={server.listen}></Listen>
              </Grid>
              <Grid item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <AutoHTTPS config={server.automatic_https}></AutoHTTPS>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </MainLayout>
  )
}
