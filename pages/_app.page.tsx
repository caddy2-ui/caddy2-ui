import React, { Fragment, useEffect } from 'react';
import App from 'next/app';
import { ThemeProvider, LinearProgress } from '@material-ui/core';
import { SnackbarProvider } from "notistack";
import { CssBaseline, NoSsr } from '@material-ui/core';
import { theme } from './theme';
import { caddy2Config } from "~libs/browser/caddy2";
import { api } from "~libs/browser/api-client";

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
    body = <LinearProgress></LinearProgress>
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

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <NoSsr>
        <Provider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </Provider>
      </NoSsr>
    )
  }
}

export default MyApp;
