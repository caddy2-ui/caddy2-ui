import React, { Fragment, useEffect } from 'react';
import { caddy2Config } from "~libs/browser/caddy2";
import { api } from "~libs/browser/api-client";
import { ThemeProvider, LinearProgress } from '@material-ui/core';
import { SnackbarProvider } from "notistack";
import { theme } from './theme';

const LoadConfig: React.StatelessComponent = (props) => {
  const [config, setConfig] = caddy2Config.useContainer()
  useEffect(() => {
    api.get('/').then((res) => {
      setConfig(res.data)
    })
  }, [])
  let body: JSX.Element
  if (typeof config.admin !== 'undefined') {
    body = (
      <Fragment>
        {props.children}
      </Fragment>
    )
  } else {
    body = <LinearProgress />
  }
  return (
    <div>
      {body}
    </div>
  )
}

export const Provider: React.StatelessComponent = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <caddy2Config.Provider>
          <LoadConfig>
            {props.children}
          </LoadConfig>
        </caddy2Config.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Provider
