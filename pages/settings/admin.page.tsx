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

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
}));

export default () => {

  const [{ admin }] = caddy2Config.useContainer()
  const classes = useStyles(useTheme());

  return (
    <ContentLayout>
      <Card>
        <CardHeader title={'管理 API 配置详情'}></CardHeader>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                helperText="不可更改"
                label="监听地址"
                required
                value={admin.listen}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ContentLayout>
  )
}

