import { toast } from "sonner";
import type { BankAccountData } from "@/services/banking/BankAccountServices";
import type { TransferFormData } from "../types";

// Re-export types for convenience
export type { TransferFormData };

export const getStatusBadge = (status: string) => {
  let cls = "";

  switch (status?.toLowerCase()) {
    case "approved":
      cls = "bg-green-100 text-green-700";
      break;
    case "pending":
      cls = "bg-red-100 text-red-700";
      break;
    case "draft":
      cls = "bg-gray-100 text-gray-700";
      break;
    default:
      cls = "bg-gray-100 text-gray-700";
  }

  return (
    <span className={`px-3 py-1 rounded-xl text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
};

export const formatCurrency = (amount: number, currency: string): string => {
  return `${currency} ${amount.toFixed(2)}`;
};

export const getRequestId = (transfer: { _id?: string; id?: string; requestId?: string; referenceNo?: string }): string => {
  return transfer.referenceNo || transfer.requestId || `TT-${transfer._id?.slice(-6) || transfer.id?.slice(-6) || "000000"}`;
};



export const validateTransferForm = (formData: TransferFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.senderBank.trim()) {
    errors.senderBank = "Sender Bank is required";
  }
  if (!formData.senderAccountNo.trim()) {
    errors.senderAccountNo = "Sender Account No. is required";
  }
  if (!formData.beneficiaryName.trim()) {
    errors.beneficiaryName = "Beneficiary Name is required";
  }
  if (!formData.beneficiaryBankName.trim()) {
    errors.beneficiaryBankName = "Beneficiary Bank Name is required";
  }
  if (!formData.beneficiaryAccountNo.trim()) {
    errors.beneficiaryAccountNo = "Beneficiary Account No. is required";
  }
  if (!formData.swiftCode.trim()) {
    errors.swiftCode = "SWIFT/IBAN Code is required";
  }
  if (!formData.transferAmount || isNaN(parseFloat(formData.transferAmount))) {
    errors.transferAmount = "Transfer Amount must be a valid number";
  }
  if (!formData.purpose.trim()) {
    errors.purpose = "Purpose is required";
  }
  if (!formData.authorizedBy.trim()) {
    errors.authorizedBy = "Authorized By is required";
  }

  return errors;
};

// Show validation errors as toasts
export const showValidationErrors = (errors: Record<string, string>): void => {
  Object.values(errors).forEach(msg => {
    if (msg) toast.error(msg);
  });
};

// Transform form data to API payload
export const transformFormToTransferData = (
  formData: TransferFormData,
  isDraft: boolean = false
): any => {
  return {
    transferDate: new Date(formData.transferDate).toISOString(),
    senderBank: formData.senderBank,
    senderAccountNo: formData.senderAccountNo,
    beneficiaryName: formData.beneficiaryName,
    beneficiaryBankName: formData.beneficiaryBankName,
    beneficiaryAccountNo: formData.beneficiaryAccountNo,
    swiftCode: formData.swiftCode,
    transferAmount: parseFloat(formData.transferAmount),
    currency: formData.currency,
    purpose: formData.purpose,
    authorizedBy: formData.authorizedBy || undefined,
    remarks: formData.remarks || undefined,
    status: isDraft ? "Draft" : "Pending",
  };
};

// Get selected bank details
export const getSelectedBankDetails = (
  bankId: string,
  bankAccounts: BankAccountData[]
): BankAccountData | undefined => {
  return bankAccounts.find(b => b._id === bankId || b.id === bankId);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

// Get initial form data
export const getInitialFormData = (): TransferFormData => ({
  transferDate: new Date().toISOString().split('T')[0],
  senderBank: "",
  senderAccountNo: "",
  beneficiaryName: "",
  beneficiaryBankName: "",
  beneficiaryAccountNo: "",
  swiftCode: "",
  transferAmount: "",
  currency: "KWD", // Default currency
  purpose: "",
  authorizedBy: "",
  remarks: "",
});
