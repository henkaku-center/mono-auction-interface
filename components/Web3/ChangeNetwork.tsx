import { FC, useEffect } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '..'
import { useAddress, useChain } from '@thirdweb-dev/react'

export const ChangeNetwork: FC = () => {
  const address = useAddress()
  const chain = useChain()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (
      address &&
      chain?.chainId !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)
    ) {
      onOpen()
    } else {
      onClose()
    }
  }, [chain, address])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Text>接続ネットワークをPolygonに変更してください。</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
