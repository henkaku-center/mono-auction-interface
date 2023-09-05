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

export interface FormData {
  productName?: string
  image: File
  imageIPFSHash?: string
  description?: string
  rule?: string
  minimumCost?: string
  allocationAddress?: string
  allocationPercentage?: string
  startDate?: Date
  endDate?: Date
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
}
