import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from "notistack";
import { CssBaseline, NoSsr } from '@material-ui/core';
import { theme } from './theme';

export const Provider: React.StatelessComponent = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        {props.children}
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
