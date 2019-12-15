import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Server } from "../index";

export interface Props {
  config: Server['logs']
}

export const Logs: React.StatelessComponent<Props> = ({ config }) => {
  let logger_names = Object.keys(config.logger_names || {})
  return (
    <Card>
      <CardHeader title={'Logs'}></CardHeader>
      <CardContent>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>原名</TableCell>
              <TableCell align='center'>别名</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logger_names.map((name) => (
              <TableRow key={name}>
                <TableCell>{name}</TableCell>
                <TableCell>{config.logger_names[name]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
