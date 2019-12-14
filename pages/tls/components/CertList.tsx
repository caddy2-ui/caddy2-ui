import React from 'react'
import { caddy2Config } from "~libs/browser/caddy2";
import { makeStyles, useTheme, colors } from "@material-ui/core";
import { Main as MainLayout } from "~pages/layouts";
import { Certs, getCerts } from "../index";
import {
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

const useStyles = makeStyles(theme => ({
  root: {
  },
}))

export interface Props {
  title: string,
  columns: Array<{
    displayName: string
    transform: (data: Certs['pem_loader'][0]) => any
  }>
  data: Certs['pem_loader'][0][]
}

export const CertList: React.StatelessComponent<Props> = (props) => {

  const classes = useStyles(useTheme())

  return (
    <Card>
      <CardHeader title={props.title}></CardHeader>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              {props.columns.map((item) => (
                <TableCell key={item.displayName}>{item.displayName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((data) => (
              <TableRow key={data.certificate}>
                {props.columns.map((item, i) => (
                  <TableCell key={item.displayName}>{item.transform(data)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default CertList
