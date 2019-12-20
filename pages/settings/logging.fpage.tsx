import dynamic from "next/dynamic";
import { LinearProgress } from "@material-ui/core";
export default dynamic(() => import('./logging.page'), { ssr: false, loading: () => <LinearProgress /> })
