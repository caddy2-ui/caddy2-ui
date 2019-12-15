import React, { useState, useEffect } from 'react'
import { Main as MainLayout } from "~pages/layouts";
import { makeStyles, useTheme } from "@material-ui/core";
import { useRouter } from "next/router";
import {
  Container,
  Tabs, Tab,
  Divider, colors,
} from "@material-ui/core";
import Header from "./Header";

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

export const ContentLayout: React.StatelessComponent = (props) => {
  const classes = useStyles(useTheme())
  const router = useRouter()
  const [currentPath] = useState(router.pathname)
  const tabs: { value: string, label: string }[] = [
    { value: '/server', label: '通用配置' },
    { value: '/server/routes', label: '路由规则' },
    { value: '/server/tls_connection', label: 'TLS 连接配置' },
  ]

  const handleTabsChange = (e: any, value: string) => {
    router.push(value + '?name=' + router.query.name)
  }

  return (
    <MainLayout>
      <Container className={classes.root} maxWidth={false}>
        <Header />
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentPath}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            ></Tab>
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {props.children}
        </div>
      </Container>
    </MainLayout>
  )
}
