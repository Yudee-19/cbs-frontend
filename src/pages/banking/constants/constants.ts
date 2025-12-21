import type { ChequeFormData, BankOption, FieldPositions } from "../types/types";

// Dummy cheque data - REPLACE THIS AFTER BE INTEGRATION
export const defaultChequeFormData: ChequeFormData = {
  bank: "burgan-bank",
  branch: "Farwaniya Branch - 239",
  account: "0239-7074792-001-000",
  currentCheque: "7074792001",
  currency: "USD",
  payeeName: "",
  amount: "",
  amountInWords: "",
  date: new Date().toISOString().split("T")[0],
  orientation: "horizontal",
};

// Dummy bank data - REPLACE THIS AFTER BE INTEGRATION
export const BANK_OPTIONS: BankOption[] = [
  {
    id: "burgan-bank",
    name: "Burgan Bank – Crown International",
    branch: "Farwaniya Branch - 239",
    account: "0239-7074792-001-000",
    currentCheque: "7074792001",
    currency: "USD",
  },
  {
    id: "nbk",
    name: "National Bank of Kuwait",
    branch: "Kuwait City Branch - 101",
    account: "0101-1234567-001-000",
    currentCheque: "1234567001",
    currency: "KWD",
  },
  {
    id: "cbd",
    name: "Commercial Bank of Dubai",
    branch: "Dubai Main Branch - 505",
    account: "0505-9876543-001-000",
    currentCheque: "9876543001",
    currency: "AED",
  },
];

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
