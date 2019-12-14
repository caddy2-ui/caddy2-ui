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
    { value: '/settings/admin', label: '管理端点' },
    { value: '/settings/logging', label: '日志' },
    { value: '/settings/storage', label: '存储' },
  ]
  const handleTabsChange = (e, value) => {
    router.push(value)
  }

  return (
    <MainLayout>
      <Container className={classes.root} maxWidth='lg'>
        <Header></Header>
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
