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
import { useAccount, useNetwork } from 'wagmi'

export const ChangeNetwork: FC = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (address && chain?.id !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
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
