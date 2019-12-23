import React, { Fragment, useEffect } from 'react';
import App from 'next/app';
import { CssBaseline, NoSsr, LinearProgress } from '@material-ui/core';
import dynamic from "next/dynamic";

const Provider = dynamic(() => import('./provider'), {
  loading: () => <LinearProgress />
})

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <NoSsr>
          <Provider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <Component {...pageProps} />
          </Provider>
        </NoSsr>
      </Fragment>
    )
  }
}

export default MyApp;
