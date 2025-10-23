export interface TaxBracket {
  rate: number;
  min: number;
  max?: number;
  description: string;
}

export interface AppliedBracket {
  rate: number;
  amount: number;
  tax: number;
  description: string;
}
