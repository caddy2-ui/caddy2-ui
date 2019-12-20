import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import {
  Dialog,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { CertInfo, parseCert } from "./CerInfo";

const placeholder = `MIIDsTCCApmgAwIBAgIJAM/AnyM0MWQ2MA0GCSqGSIb3DQEBCwUAMDwxEjAQBgNV
BAoTCWxvY2FsaG9zdDESMBAGA1UECxMJbG9jYWxob3N0MRIwEAYDVQQDEwlsb2Nh
bGhvc3QwIBcNMTkxMjEzMDY1NjAwWhgPMzAxOTEyMTMwNjU2MDBaMDwxEjAQBgNV
BAoTCWxvY2FsaG9zdDESMBAGA1UECxMJbG9jYWxob3N0MRIwEAYDVQQDEwlsb2Nh
bGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDfy3aNC6Y/6CKu
yW50i5kQBEGhIcxnfnS+cHFdGKYTY+D0Y8damSww9/drS3cM/IXLEM+VY+EUWyHD
BMb6HxsCxrSc7k8D0KGmlbrgTIa81AOq9tDTKKYADAMYgfKwLGnt02othW2VCXwu
uI+OV4un+rfQbTuG/buk7RbahNh3bbZ+I6+Edq/TCYtHWXUkaJRHg1hKRDIh4a9K
Wk+CIbaNXuz5c9mbRLAO0ExB6L9dljWBF0bJhMJvVaqciovuX0RstWWuLVbMk2A2
7HVSZg3hLfKcTaYO604P8QkAhJ10Q9NDUfqUar53wqvG0V4QHgsoZ24h3U76KiBU
5os8Zm27AgMBAAGjgbMwgbAwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUUpeNVZDT
SaM7cq5Po/GIiaxnlx4wDgYDVR0PAQH/BAQDAgXgMB0GA1UdJQQWMBQGCCsGAQUF
BwMBBggrBgEFBQcDAjAfBgNVHREEGDAWgglsb2NhbGhvc3SCCTEyNy4wLjAuMTAR
BglghkgBhvhCAQEEBAMCBsAwHgYJYIZIAYb4QgENBBEWD3hjYSBjZXJ0aWZpY2F0
ZTANBgkqhkiG9w0BAQsFAAOCAQEAi9p/anNMwOMAZh36A0XfYmbFafdTkuM0yJfO
KE0coKkFqIW5V8id77Dkf4mHy961SynrBN2Zg4Ir2nnfvHYP/ux8jcXf9sesiI8T
2BcK4h5vT1pLSxVV1PepPpAq1zobljmprDe80/hM67DsbnhTEQoGaADbjLFXaX0v
ZKp9KRHETaApEvGEllYVwtNXc2eC6s2nEs1DGEZtCF4U/Jufs9YYhdoSzickQNAd
Ab0WHee0fkb5zWY4gf6h7LX38+39ciGih8Y/4vMinyOB7MfCmxfGF74XalU4jH6l
zWdGZOGkkbt8lie5uxg1lpMPBmEZ2y1JQjdiOF0CY4aH7XS51w==
`

interface TabPanelProps {
  index: any;
  value: any;
}
const TabPanel: React.StatelessComponent<TabPanelProps> = ({ value, index, children }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  input: {
    '& textarea': {
      fontFamily: 'Consolas, Monaco, monospace',
    },
  }
}))

import { useCertEditor } from "./AddCertDialogState";
export const AddCertDialog: React.StatelessComponent = () => {

  const classes = useStyles(useTheme())

  const editor = useCertEditor()
  const { state } = editor

  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(state.cert)
  }, [state.cert])
  let cert = value.replace('-----BEGIN CERTIFICATE-----', '').replace('-----END CERTIFICATE-----', '')
  let certinfo = parseCert(cert)
  let certError = !value ? false : !certinfo ? true : false

  const handleSubmit = (e: any) => {
    e.preventDefault()
    editor.save(value)
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={state.open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Tabs value={editor.state.tabValue} onChange={(e, value: any) => editor.openTab(value)}>
            <Tab value={0} label='添加证书' />
            <Tab value={1} disabled={!certinfo} label='证书解析' />
          </Tabs>
        </DialogTitle>
        <SwipeableViews
          index={editor.state.tabValue}
        >
          <TabPanel value={editor.state.tabValue} index={0}>
            <TextField
              fullWidth
              multiline
              variant='outlined'
              placeholder={placeholder}
              value={value}
              disabled={state.posting}
              onChange={(e) => setValue(e.target.value)}
              rows={30}
              required
              error={certError}
              helperText={!certinfo ? '证书内容有错误' : ''}
              className={classes.input}
            ></TextField>
          </TabPanel>
          <TabPanel value={editor.state.tabValue} index={1}>
            {value && <CertInfo certificate={certinfo}></CertInfo>}
          </TabPanel>
        </SwipeableViews>
        <DialogActions>
          <Button
            onClick={editor.close}
            disabled={state.posting}
          >取消</Button>
          <Button
            type='submit'
            endIcon={state.posting && <CircularProgress color='inherit' size={16} />}
            disabled={!certinfo || state.posting}
            variant='contained'
            color='primary'
          >提交</Button>
        </DialogActions>
      </form>
    </Dialog >
  )
}
