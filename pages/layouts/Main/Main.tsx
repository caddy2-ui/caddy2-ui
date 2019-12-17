import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, Topbar, Footer } from './components';

import dynamic from "next/dynamic";
const NoSSREditorDialog = dynamic(() => import('~pages/editor/EditorDialog'), { ssr: false })
import { editorDialogState } from "~pages/editor/EditorDialog/state";


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100vh',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

export const Main: React.StatelessComponent<{}> = props => {
  const { children } = props;

  const theme = useTheme();
  const classes = useStyles(theme);
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <editorDialogState.Provider>
        <NoSSREditorDialog />
      </editorDialogState.Provider>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

export default Main;
