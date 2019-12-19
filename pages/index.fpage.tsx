import dynamic from "next/dynamic";
export default dynamic(() => import('./index.page'), { ssr: false })
