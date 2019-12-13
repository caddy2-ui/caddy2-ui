import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

export interface Props {
  className?: string
}

export const Footer: React.StatelessComponent<Props> = props => {
  const { className, ...rest } = props;

  const classes = useStyles(useTheme());

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://devias.io/"
          target="_blank"
        >
          Devias IO
        </Link>
        . 2019
      </Typography>
      <Typography variant="caption">
        Created with love for the environment. By designers and developers who
        love to work together in offices!
      </Typography>
    </div>
  );
};

export default Footer;
