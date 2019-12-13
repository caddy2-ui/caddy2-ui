import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core';

import { Topbar } from './components';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

export interface Props {
  className?: string
}

const Minimal: React.StatelessComponent<Props> = props => {
  const { children } = props;

  const classes = useStyles(useTheme());

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Minimal;