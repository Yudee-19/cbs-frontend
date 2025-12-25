export interface SenderBank {
  _id?: string;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

export interface TelexTransferData {
  _id?: string;
  id?: string;
  referenceNo?: string;
  requestId?: string;
  transferDate: string;
  senderBank: SenderBank | string;
  senderBankName?: string;
  senderAccountNo: string;
  beneficiaryName: string;
  beneficiaryBankName: string;
  beneficiaryAccountNo: string;
  swiftCode?: string;
  branchAddress?: string;
  transferAmount: number;
  currency: string;
  purpose: string;
  authorizedBy?: string;
  status?: "Draft" | "Pending" | "Approved" | "Rejected";
  remarks?: string;
  attachments?: string[];
  activityLog?: Array<{
    action: string;
    user: string;
    timestamp: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface TelexTransferTableProps {
  transfers: TelexTransferData[];
  onRowClick: (transfer: TelexTransferData) => void;
  onNewTransfer: () => void;
  isLoading?: boolean;
}

export interface TelexRecordViewProps {
  transfer: TelexTransferData | null;
  totalTransfers: number;
}

export interface NewTransferModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Form validation utility
export interface TransferFormData {
  transferDate: string;
  senderBank: string;
  senderAccountNo: string;
  beneficiaryName: string;
  beneficiaryBankName: string;
  beneficiaryAccountNo: string;
  swiftCode: string;
  transferAmount: string;
  currency: string;
  purpose: string;
  authorizedBy: string;
  remarks: string;
}