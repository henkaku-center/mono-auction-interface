import { useConnect } from 'wagmi'

export const useSafeConnect = () => {
  const { connect, connectors } = useConnect()
}
