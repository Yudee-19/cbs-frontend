import type { ChequeFormData, BankOption, FieldPositions } from "../types/types";

// Default cheque form data - Bank details are populated from API
export const defaultChequeFormData: ChequeFormData = {
  bank: "",
  bankAccountId: "",
  branch: "",
  account: "",
  currentCheque: "",
  currency: "",
  payeeName: "",
  amount: "",
  amountInWords: "",
  date: new Date().toISOString().split("T")[0],
  orientation: "horizontal",
};

// Bank options are now fetched from the API via BankAccountServices
// This constant is kept for backward compatibility/fallback purposes
export const BANK_OPTIONS: BankOption[] = [];

// Default Field Positions for Horizontal Orientation
export const defaultHorizontalPositions: FieldPositions = {
  date: { x: 360, y: 6 },
  payeeName: { x: 60, y: 80 },
  amount: { x: 380, y: 80 },
  amountInWords: { x: 55, y: 100 },
};

// Default Field Positions for Vertical Orientation
export const defaultVerticalPositions: FieldPositions = {
  date: { x: 190, y: 370 },
  payeeName: { x: 115, y: 60 },
  amount: { x: 110, y: 380 },
  amountInWords: { x: 95, y: 55 },
};
