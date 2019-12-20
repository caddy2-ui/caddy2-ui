import React from 'react'
import { caddy2Config } from "~libs/browser/caddy2";
import { makeStyles, useTheme, colors } from "@material-ui/core";
import { Main as MainLayout } from "~pages/layouts";
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
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { CertList, Props } from "./components/CertList";
import { Certs, getCerts } from "./index";
import { ContentLayout } from "./components/ContentLayout";
import { CertInfo, parseCert } from "~pages/server/tls_connection/CerInfo";
import { useEditor } from "~pages/editor";

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

const MemPage = () => {

  const classes = useStyles(useTheme())
  const editor = useEditor()
  const [config] = caddy2Config.useContainer()
  const certs = getCerts(config)
  let memCerts = certs.pem_loader || []

  const openEditor = () => {
    editor.open(
      {
        file: '',
        config: {},
      },
      () => {

      }
    )
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={openEditor} startIcon={<AddIcon />} variant='outlined'>新增</Button>
      </Grid>
      {memCerts.map((data) => (
        <Grid item key={data.certificate}
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <CertInfo certificate={parseCert(data.certificate)}></CertInfo>
        </Grid>
      ))}
    </Grid>
  )
}
export default () => (
  <ContentLayout>
    <MemPage />
  </ContentLayout>
)