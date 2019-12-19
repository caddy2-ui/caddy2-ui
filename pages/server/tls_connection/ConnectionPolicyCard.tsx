import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Collapse,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoreOptions } from "~pages/components/MoreOptions";

import { Server } from "../index";
import { useUpdateServerOptions } from "../updateServerOptions";
import { useEditor } from "~pages/editor";
import { useCertEditor } from "./index";

import { makeStyles, useTheme } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

interface CeritemProps {
  cert: string,
  delAuthCert: () => Promise<any> | any
  updateAuthCert: (content: string) => Promise<any> | any
}
const Ceritem: React.StatelessComponent<CeritemProps> = ({
  cert,
  delAuthCert,
  updateAuthCert,
}) => {
  const certEditor = useCertEditor()
  const classes = useStyles(useTheme())
  const openCertEditor = () => {
    certEditor.open(cert, async (cert) => {
      await updateAuthCert(cert)
      certEditor.close()
    })
  }
  return (
    <ListItem key={cert.slice(-10)} className={classes.nested}>
      <ListItemText primary={cert.slice(0, 50)}></ListItemText>
      <ListItemSecondaryAction>
        <MoreOptions>
          <MenuItem onClick={openCertEditor}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText>编辑</ListItemText>
          </MenuItem>
          <MenuItem onClick={delAuthCert}>
            <ListItemIcon><DeleteIcon /></ListItemIcon>
            <ListItemText>删除</ListItemText>
          </MenuItem>
        </MoreOptions>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export interface Props {
  policy: Server['tls_connection_policies'][0]
  id: number
}

export const ConnectionPolicyCard: React.StatelessComponent<Props> = ({ policy, id }) => {
  const classes = useStyles(useTheme())
  const sni: string[] = (policy.match || {}).sni || []
  const alpn: string[] = policy.alpn || []
  const clientAuth = policy.client_authentication || {}
  const TrustedCACerts: string[] = clientAuth.trusted_ca_certs || []
  const TrustedLeafCert: string[] = clientAuth.trusted_leaf_certs || []

  const options = useUpdateServerOptions()
  const editor = useEditor()
  const certEditor = useCertEditor()

  const openEditor = () => {
    editor.open(
      {
        config: policy,
        file: '/config/app/http/server/tls_connection_policy/config.json',
      },
      async (config) => {
        await options.updateConnectionPolicy(id, config)
        editor.close()
      }
    )
  }
  const delPolicy = async () => {
    await options.delConnectionPolicy(id)
  }
  type CertType = 'trusted_ca_certs' | 'trusted_leaf_certs'
  const openAddCertEditor = (type: CertType) => {
    certEditor.open('', async (cert) => {
      await options.addClientAuthCert(type)(id, cert, typeof clientAuth[type] === 'undefined')
      certEditor.close()
    })
  }

  const delAuthCert = (type: CertType, policyID: number, id: number) => async () => {
    await options.delClientAuthCert(type)(policyID, id)
  }
  const updateAuthCert = (type: CertType, policyID: number, id: number) => async (cert: string) => {
    await options.updateClientAuthCert(type)(policyID, id, cert)
  }

  const action = (
    <MoreOptions>
      <MenuItem onClick={openEditor}>
        <ListItemIcon><EditIcon /></ListItemIcon>
        <ListItemText>编辑</ListItemText>
      </MenuItem>
      <MenuItem onClick={delPolicy}>
        <ListItemIcon><DeleteIcon /></ListItemIcon>
        <ListItemText>删除</ListItemText>
      </MenuItem>
    </MoreOptions>
  )
  return (
    <Card>
      <CardHeader title={'TLS 规则'} action={action}></CardHeader>
      <Divider />
      <CardContent>
        <List>
          <ListItem>
            <ListItemText primary={'Match - SNI'}></ListItemText>
          </ListItem>
          <Collapse in={sni.length !== 0}>
            <List>
              {sni.map((sni) => (
                <ListItem key={sni} className={classes.nested}>
                  <ListItemText primary={sni}></ListItemText>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem>
            <ListItemText primary={'ALPN'}></ListItemText>
          </ListItem>
          <Collapse in={alpn.length !== 0}>
            <List>
              {alpn.map((alpn) => (
                <ListItem key={alpn} className={classes.nested}>
                  <ListItemText primary={alpn}></ListItemText>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem>
            <ListItemText primary={'客户端证书 - CA 证书'}></ListItemText>
            <ListItemSecondaryAction>
              <MoreOptions>
                <MenuItem onClick={() => openAddCertEditor('trusted_ca_certs')}>
                  <ListItemIcon><AddIcon /></ListItemIcon>
                  <ListItemText>添加 CA 证书</ListItemText>
                </MenuItem>
              </MoreOptions>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={TrustedCACerts.length !== 0}>
            <List>
              {TrustedCACerts.map((cert, xid) => (
                <Ceritem key={xid}
                  {...{
                    cert,
                    delAuthCert: delAuthCert('trusted_ca_certs', id, xid),
                    updateAuthCert: updateAuthCert('trusted_ca_certs', id, xid),
                  }}
                />
              ))}
            </List>
          </Collapse>
          <ListItem>
            <ListItemText primary={'客户端证书 - Leaf 证书'}></ListItemText>
            <ListItemSecondaryAction>
              <MoreOptions>
                <MenuItem onClick={() => openAddCertEditor('trusted_leaf_certs')}>
                  <ListItemIcon><AddIcon /></ListItemIcon>
                  <ListItemText>添加 Leaf 证书</ListItemText>
                </MenuItem>
              </MoreOptions>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={TrustedLeafCert.length !== 0}>
            <List>
              {TrustedLeafCert.map((cert, xid) => (
                <Ceritem key={xid}
                  {...{
                    cert,
                    delAuthCert: delAuthCert('trusted_leaf_certs', id, xid),
                    updateAuthCert: updateAuthCert('trusted_leaf_certs', id, xid),
                  }}
                />
              ))}
            </List>
          </Collapse>
        </List>
      </CardContent>
    </Card>
  )
}
