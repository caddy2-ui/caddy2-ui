import dynamic from "next/dynamic";
import { LinearProgress } from "@material-ui/core";

export const NoSsrEditor = dynamic(
  () => import('./Editor'),
  {
    ssr: false,
    loading: () => (<LinearProgress />),
  }
)
