import { FC } from "react"
import { Button } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { SafeConnector } from "wagmi/connectors/safe"
import { polygon } from 'wagmi/chains'

export const SafeConnectButton: FC = () => {
  const { isConnected } = useAccount()
  const safeConnector =
    new SafeConnector({
      chains: [polygon],
      options: {
        allowedDomains: [/app.safe.global$/],
        debug: false,
      },
    })
  const { connect, isLoading, pendingConnector } = useConnect({
    connector: safeConnector
  })
  const { disconnect } = useDisconnect()

  return (
    <>
      {isConnected ? (
        <Button onClick={() => disconnect()}>
          Disconnect
        </Button>
      ) : (
        <Button
          onClick={() => connect()}
        >
          {isLoading ? (
            safeConnector.id === pendingConnector?.id &&
            'Connecting Safe'
          ) : ('Connect Safe')}
        </Button>
      )}
    </>
  )
}