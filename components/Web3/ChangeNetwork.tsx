import { FC, useEffect } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '..'
import { useNetwork } from 'wagmi'

export const ChangeNetwork: FC = () => {
  const { chain } = useNetwork()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!chain || chain?.id !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
      onOpen()
    } else {
      onClose()
    }
  }, [chain])

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text>接続ネットワークをPolygonに変更してください。</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
