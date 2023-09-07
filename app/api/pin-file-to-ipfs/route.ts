import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { Readable } from 'stream'
import FormData from 'form-data'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const buffer = Buffer.from(body.data.split('base64,')[1], 'base64')
    const stream = Readable.from(buffer)
    const formData = new FormData() as any
    formData.append('file', stream, { filename: body.filename })

    const { data } = await axios.post(
      `${process.env.IPFS_API_ENDPOINT!}/pinning/pinFileToIPFS`,
      formData,
      {
        maxBodyLength: 'Infinity' as any,
        headers: {
          pinata_api_key: process.env.IPFS_API_KEY!,
          pinata_secret_api_key: process.env.IPFS_API_SECRET!,
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      }
    )

    return NextResponse.json({
      status: 'success',
      IpfsHash: data.IpfsHash,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
