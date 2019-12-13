import React, { forwardRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { Page } from "../../Sidebar";

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    // @ts-ignore
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

export interface Props {
  className?: string,
  pages: Page[]
}

const SidebarNav: React.StatelessComponent<Props> = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles(useTheme());

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
        >
          <div style={{ flexGrow: 1 }}>
            <Link href={page.href}>
              <Button className={classes.button} >
                <div className={classes.icon}>{page.icon}</div>
                {page.title}
              </Button>
            </Link>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarNav;
