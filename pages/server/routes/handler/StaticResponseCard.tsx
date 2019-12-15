import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { AuthenticationHandler } from "~libs/caddy/Handler/authentication";

interface Props {
  handler: AuthenticationHandler
}

export const CacheCard: React.StatelessComponent<Props> = ({ handler }) => {
  return (
    <Card>
      <CardHeader title={handler.handler}></CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  )
}