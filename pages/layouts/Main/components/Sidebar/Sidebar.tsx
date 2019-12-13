import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';

import { SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    // @ts-ignore
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

export interface Page {
  title: string
  href: string
  icon: JSX.Element
}

export interface Props {
  className?: string
  onClose: any
  open: boolean
  variant: 'permanent' | 'persistent' | 'temporary'
}

const Sidebar: React.StatelessComponent<Props> = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles(useTheme());

  const pages: Page[] = [
    {
      title: 'Sites',
      href: '/sites',
      icon: <DashboardIcon />
    },
    {
      title: 'TLS',
      href: '/tls',
      icon: <LockIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

export default Sidebar;