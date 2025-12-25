export interface TelexTransferData {
  _id?: string;
  id?: string;
  requestId?: string;
  transferDate: string;
  senderBank: string;
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
  loading: boolean;
  selectedTransfer: TelexTransferData | null;
  onRowClick: (transfer: TelexTransferData) => void;
  onNewTransfer: () => void;
}

export interface TelexRecordViewProps {
  transfer: TelexTransferData | null;
  totalTransfers: number;
}
