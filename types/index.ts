//types
export interface Product {
  id: number;
  imageUrl: string;
  productTitle: string;
}

export interface Transaction {
  transaction: string;
  amount: number;
  from: string;
  to: string;
  date: string;
}
