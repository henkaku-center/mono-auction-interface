//types
export interface Product {
  id: number
  imageUrl: string
  productTitle: string
}

export interface Transaction {
  transaction: string
  amount: number
  from: string
  to: string
  date: string
}

export interface MonoNFTRegisterFormData {
  name: string
  description: string
  rule: string
  image: File | null
  donor: string
  expiresDuration: number
  sharesOfCommunityToken: {
    shareHolder: string
    shareRatio: number
  }[]
  owner: string
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  rule: string
}
