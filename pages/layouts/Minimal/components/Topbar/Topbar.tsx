import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

export interface Props {
  className?: string
}

const Topbar: React.StatelessComponent<Props> = props => {
  const { className, ...rest } = props;

  const classes = useStyles(useTheme());

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <Link href="/">
          <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
