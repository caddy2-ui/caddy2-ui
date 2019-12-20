import React from 'react'
import { caddy2Config } from "~libs/browser/caddy2";
import { makeStyles, useTheme } from "@material-ui/core";
import {
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { CertList, Props } from "./components/CertList";
import { Certs, getCerts } from "./index";
import { ContentLayout } from "./components/ContentLayout";


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: theme.palette.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  },
  tname: {
    whiteSpace: 'pre',
  },
  tval: {
    width: '100%',
  },
}))

const createColumn = (name: string, t: Props['columns'][0]['transform']): Props['columns'][0] => ({ displayName: name, transform: t })
const fileCertColumn = [
  createColumn('标签', (d) => d.tags),
  createColumn('证书地址', (d) => d.certificate),
  createColumn('私钥地址', (d) => d.key),
]
export default () => {

  const classes = useStyles(useTheme())
  const [config] = caddy2Config.useContainer()
  const certs = getCerts(config)

  return (
    <ContentLayout>
      <Grid container>
        {(certs.load_files || []).map((data) => (
          <Grid item key={data.certificate}
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <Card>
              <CardContent>
                <Table>
                  <TableBody>
                    {fileCertColumn.map((item) => (
                      <TableRow key={item.displayName}>
                        <TableCell className={classes.tname}>{item.displayName}</TableCell>
                        <TableCell className={classes.tval}>{item.transform(data)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ContentLayout>
  )
}
