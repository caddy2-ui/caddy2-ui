import dynamic from "next/dynamic";
export default dynamic(() => import('./storage.page'), { ssr: false })
