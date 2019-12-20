import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter()
  return (
    <div>
      <Typography
        component='h2'
        gutterBottom
        variant='overline'
      >
        TLS
      </Typography>
      <Typography
        component='h1'
        variant='h3'
      >
        {router.query.name}
      </Typography>
    </div>
  )

}