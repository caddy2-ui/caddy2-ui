import dynamic from "next/dynamic";
export default dynamic(() => import('./logging.page'), { ssr: false })
