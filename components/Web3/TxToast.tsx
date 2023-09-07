import { Link } from '..'

export const TxToastLink = (link: string) => {
  return (
    <Link href={link} target="_blank">
      View on PolygonScan
    </Link>
  )
}
