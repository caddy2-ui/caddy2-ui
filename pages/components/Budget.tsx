import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar, useTheme } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { useStyles } from "./Budget.styles";

const Budget: React.StatelessComponent<{ className: string }> = props => {
  const { className, ...rest } = props;

  const classes = useStyles(useTheme());

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              BUDGET
            </Typography>
            <Typography variant="h3">$24,000</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Budget;
