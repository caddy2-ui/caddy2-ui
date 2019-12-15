import React from 'react'
import { Main as MainLayout } from "~pages/layouts";
import { makeStyles, useTheme } from "@material-ui/core";
import {
  Grid,
} from "@material-ui/core";
import { Server, getServers } from "./index";
import { caddy2Config } from "~libs/browser/caddy2";
import { ServerCard } from "./components/ServerCard";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

export default () => {
  const classes = useStyles(useTheme())
  const [config] = caddy2Config.useContainer()
  const servers = getServers(config)

  return (
    <MainLayout>
      <div className={classes.root}>
        <Grid container>
          {Object.keys(servers).map((k) => (
            <Grid item key={k}
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <ServerCard
                title={k}
                server={servers[k]}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </MainLayout>
  )
}
