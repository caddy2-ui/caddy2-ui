import React, { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import {
  Dialog,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";

const placeholder = `MIIDsTCCApmgAwIBAgIJAM/AnyM0MWQ2MA0GCSqGSIb3DQEBCwUAMDwxEjAQBgNVBAoTCWxvY2FsaG9zdDESMBAGA1UECxMJbG9jYWxob3N0MRIwEAYDVQQDEwlsb2NhbGhvc3QwIBcNMTkxMjEzMDY1NjAwWhgPMzAxOTEyMTMwNjU2MDBaMDwxEjAQBgNVBAoTCWxvY2FsaG9zdDESMBAGA1UECxMJbG9jYWxob3N0MRIwEAYDVQQDEwlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDfy3aNC6Y/6CKuyW50i5kQBEGhIcxnfnS+cHFdGKYTY+D0Y8damSww9/drS3cM/IXLEM+VY+EUWyHDBMb6HxsCxrSc7k8D0KGmlbrgTIa81AOq9tDTKKYADAMYgfKwLGnt02othW2VCXwuuI+OV4un+rfQbTuG/buk7RbahNh3bbZ+I6+Edq/TCYtHWXUkaJRHg1hKRDIh4a9KWk+CIbaNXuz5c9mbRLAO0ExB6L9dljWBF0bJhMJvVaqciovuX0RstWWuLVbMk2A27HVSZg3hLfKcTaYO604P8QkAhJ10Q9NDUfqUar53wqvG0V4QHgsoZ24h3U76KiBU5os8Zm27AgMBAAGjgbMwgbAwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUUpeNVZDTSaM7cq5Po/GIiaxnlx4wDgYDVR0PAQH/BAQDAgXgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHREEGDAWgglsb2NhbGhvc3SCCTEyNy4wLjAuMTARBglghkgBhvhCAQEEBAMCBsAwHgYJYIZIAYb4QgENBBEWD3hjYSBjZXJ0aWZpY2F0ZTANBgkqhkiG9w0BAQsFAAOCAQEAi9p/anNMwOMAZh36A0XfYmbFafdTkuM0yJfOKE0coKkFqIW5V8id77Dkf4mHy961SynrBN2Zg4Ir2nnfvHYP/ux8jcXf9sesiI8T2BcK4h5vT1pLSxVV1PepPpAq1zobljmprDe80/hM67DsbnhTEQoGaADbjLFXaX0vZKp9KRHETaApEvGEllYVwtNXc2eC6s2nEs1DGEZtCF4U/Jufs9YYhdoSzickQNAdAb0WHee0fkb5zWY4gf6h7LX38+39ciGih8Y/4vMinyOB7MfCmxfGF74XalU4jH6lzWdGZOGkkbt8lie5uxg1lpMPBmEZ2y1JQjdiOF0CY4aH7XS51w==`

export const useCertEditorState = () => {
  return useState<{
    open: boolean,
    posting: boolean,
    cert: string,
    handleSave: (content: string) => Promise<any> | any,
  }>({
    open: false,
    posting: false,
    handleSave: () => 0,
    cert: '',
  })
}
export const useCertEditor = () => {
  const [state, setState] = CertEditorState.useContainer()
  const open = (cert: string, handleSave: (cert: string) => Promise<any> | any) => {
    setState({
      ...state,
      open: true,
      cert,
      handleSave,
    })
  }
  const save = (content: string) => {
    setState({ ...state, cert: content, posting: true })
    Promise.resolve(state.handleSave(JSON.stringify(content)))
      .finally(() => {
        setState((state) => ({ ...state, posting: false }))
      })
  }
  const close = () => {
    setState((state) => ({ ...state, open: false }))
  }
  return {
    state,
    save,
    open,
    close,
  }
}

export const CertEditorState = createContainer(useCertEditorState)

export const AddCertDialog: React.StatelessComponent = () => {

  const editor = useCertEditor()
  const { state } = editor

  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(state.cert)
  }, [state.cert])

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
        <DialogTitle>添加证书 {state.posting ? '(提交中)' : ''}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            variant='outlined'
            placeholder={placeholder}
            value={value}
            disabled={state.posting}
            onChange={(e) => setValue(e.target.value)}
            rows={20}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={editor.close}
            disabled={state.posting}
          >
            取消
          </Button>
          <Button
            type='submit'
            endIcon={state.posting && <CircularProgress color='inherit' size={16} />}
            disabled={state.posting}
            variant='contained'
            color='primary'
          >
            提交
          </Button>
        </DialogActions>
      </form>
    </Dialog >
  )
}
