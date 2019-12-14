import React from 'react'
import { useRouter } from "next/router";
import { ContentLayout } from "./components/ContentLayout";

export default () => {

  const router = useRouter()
  router.replace('/settings/admin')

  return (
    <ContentLayout>
      <div>跳转中</div>
    </ContentLayout>
  )
}
