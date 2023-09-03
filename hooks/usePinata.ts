import { useMemo } from 'react'

export const useUploadImageFile = () => {
  const encodeBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const filename = file.name
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (reader.error) {
          reject(reader.error)
        } else {
          resolve({ data: reader.result, filename })
        }
      }
    })
  }

  const uploadFileAndPin = async (file: File) => {
    try {
      const data = await encodeBase64(file)
      const res = await fetch('/api/pin-file-to-ipfs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const resJson = await res.json()

      if (resJson.status === 'success') {
        return resJson.IpfsHash
      }

      throw resJson.error
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return uploadFileAndPin
}

export const useUploadMetadataJson = () => {
  const uploadJsonAndPin = async (data: any) => {
    try {
      const res = await fetch('/api/pin-json-to-ipfs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const resJson = await res.json()

      if (resJson.status === 'success') {
        return resJson.IpfsHash
      }

      throw resJson.error
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return uploadJsonAndPin
}

export const useIPFS2Pinata = (ipfs?: string) => {
  const pinataURL = useMemo(() => {
    if (!ipfs) return
    const rootCid = ipfs.split('ipfs://')[1]?.split('/')[0]
    const fileName = ipfs.split('ipfs://')[1]?.split('/')[1] || ''
    return `https://${process.env
      .NEXT_PUBLIC_PINATA_GATEWAY!}/ipfs/${rootCid}/${fileName}`
  }, [ipfs])

  return pinataURL
}
