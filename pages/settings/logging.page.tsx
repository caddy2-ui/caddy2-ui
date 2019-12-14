import { useState, useEffect } from "react";
import { ContentLayout } from "./components";
import { caddy2Config } from "~libs/browser/caddy2";
import { makeStyles, useTheme } from "@material-ui/core";
import {
  Card,
  CardHeader,
  CardContent,
  LinearProgress,
  CardActions,
  Grid,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  Switch,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";

export default () => {

  return (
    <ContentLayout>
      <Card>
        <CardHeader title={'日志配置详情'}></CardHeader>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12} >
              <Typography component='h1'>
              // TODO
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ContentLayout>
  )
}
