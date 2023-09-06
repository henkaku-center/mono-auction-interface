import { FC } from "react"
import { Button } from '@chakra-ui/react'
import { connect } from "http2"

export const SafeConnectButton: FC = () => {

  return (
    <>
      <Button onClick={() => alert("aaa")}>
        Connect Safe
      </Button>
    </>
  )
}