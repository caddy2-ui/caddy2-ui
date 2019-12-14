import React from 'react'
import { caddy2Config } from "~libs/browser/caddy2";
import { makeStyles, useTheme, colors } from "@material-ui/core";
import { Main as MainLayout } from "~pages/layouts";
import {
  Container,
  Grid,
} from "@material-ui/core";
import { CertList, Props } from "./components/CertList";
import { Certs, getCerts } from "./index";


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}))

const createColumn = (name: string, t: Props['columns'][0]['transform']): Props['columns'][0] => ({ displayName: name, transform: t })
const fileCertColumn = [
  createColumn('证书地址', (d) => d.certificate),
  createColumn('私钥地址', (d) => d.key),
  createColumn('标签', (d) => d.tags),
]
const MemCertColumn = [
  createColumn('证书内容', (d) => d.certificate),
  createColumn('私钥内容', (d) => d.key),
  createColumn('标签', (d) => d.tags),
]

export default () => {

  const classes = useStyles(useTheme())
  const [config] = caddy2Config.useContainer()
  const certs = getCerts(config)

  return (
    <MainLayout>
      <Container className={classes.root} maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CertList
              title="本地证书"
              columns={fileCertColumn}
              data={certs.load_files || []}
            />
          </Grid>
          <Grid item xs={12}>
            <CertList
              title="内存证书"
              columns={MemCertColumn}
              data={certs.pem_loader || []}
            />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}
