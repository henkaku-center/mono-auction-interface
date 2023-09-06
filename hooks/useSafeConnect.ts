import { useConnect } from 'wagmi'
import { useEffect } from 'react'

const CONNECTED_CONNECTOR_IDS = ['safe']

export const useSafeConnect = () => {
  const { connect, connectors } = useConnect()

  CONNECTED_CONNECTOR_IDS.forEach(
    (connector) => {
      const connectorInstance = connectors.find(
        (c) => c.id === connector && c.ready
      )

      if (connectorInstance) {
        connect({ connector: connectorInstance })
      }
    },
    [connect, connectors]
  )
}
