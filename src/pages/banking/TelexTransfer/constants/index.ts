// Currency options for telex transfers
export const CURRENCIES = ["USD", "KWD", "EUR", "GBP"] as const;

export const DEFAULT_CURRENCY = "USD";

// Authorized persons who can approve transfers
export const AUTHORIZED_PERSONS = [
  "John Smith",
  "Christopher",
  "Sarah Johnson",
] as const;

// Status types for telex transfers
export const TRANSFER_STATUS = {
  DRAFT: "Draft",
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
} as const;

// API pagination defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 200;
export const SORT_BY_FIELD = "beneficiaryName";
