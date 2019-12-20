import React, { Fragment, useEffect } from 'react';
import App from 'next/app';
import dynamic from "next/dynamic";
import { LinearProgress } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
const CApp = dynamic(() => import('./_app.page'), { ssr: false, loading: () => <LinearProgress /> })

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <CApp>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Component {...pageProps} />
        </CApp>
      </Fragment>
    )
  }
}

export default MyApp;
