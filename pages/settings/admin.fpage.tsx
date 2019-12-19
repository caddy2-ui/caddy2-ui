import dynamic from "next/dynamic";
export default dynamic(() => import('./admin.page'), { ssr: false })
