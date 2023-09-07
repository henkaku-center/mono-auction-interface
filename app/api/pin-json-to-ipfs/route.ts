import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { data } = await axios.post(
      `${process.env.IPFS_API_ENDPOINT!}/pinning/pinJSONToIPFS`,
      body,
      {
        headers: {
          pinata_api_key: process.env.IPFS_API_KEY!,
          pinata_secret_api_key: process.env.IPFS_API_SECRET!,
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
