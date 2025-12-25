import { Button } from "@/components/ui/button";
import type { TelexRecordViewProps } from "../types";
import { getStatusBadge, getRequestId } from "../utils";

const TelexRecordView = ({ transfer, totalTransfers }: TelexRecordViewProps) => {
  if (!transfer) {
    return (
      <div className="w-[40%] bg-white overflow-auto p-6 rounded-xl shadow-[0px_4px_4px_0px_#0000000A]">
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a transfer to view details
        </div>
      </div>
    );
  }

  return (
    <div className="w-[40%] bg-white overflow-auto p-4 rounded-xl shadow-[0px_4px_4px_0px_#0000000A]">
      <div className="space-y-4">
        {/* Header with stats */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Total Transfer This Month</div>
          <div className="text-2xl font-bold">{totalTransfers}</div>
        </div>

        {/* Transfer ID and Status */}
        <div className="flex items-center justify-between p-2 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="font-normal text-[14px] text-[rgba(16,24,40,0.8)]">
              {getRequestId(transfer)}
            </div>
            {getStatusBadge(transfer.status || "Draft")}
          </div>
          <Button variant="outline" className="text-primary border-none bg-transparent shadow-none p-0">
            Generate TT Letter
          </Button>
        </div>

        {/* Transfer Information */}
        <div>
          <h3 className="text-lg font-bold mb-4">Transfer Information</h3>
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">Transfer Date</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">
                {new Date(transfer.transferDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">Sender Bank Name</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">{transfer.senderBankName || "N/A"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">Account Number</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">{transfer.senderAccountNo}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">Currency</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">{transfer.currency}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">Amount</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">
                {transfer.currency} {transfer.transferAmount.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">Purpose</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">{transfer.purpose}</div>
            </div>
          </div>
        </div>

        {/* Beneficiary Details */}
        <div>
          <h3 className="text-lg font-bold mb-4">Beneficiary Details</h3>
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">Beneficiary Name</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">{transfer.beneficiaryName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">Bank Name</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">{transfer.beneficiaryBankName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">Account Number</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">{transfer.beneficiaryAccountNo}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1 font-light">SWIFT/IBAN</div>
              <div className="font-medium text-[rgba(16,24,40,0.8)]">{transfer.swiftCode || "USD"}</div>
            </div>
            {transfer.branchAddress && (
              <div className="col-span-2">
                <div className="text-sm text-gray-500 mb-1 font-light">Branch Address</div>
                <div className="font-medium text-[rgba(16,24,40,0.8)]">{transfer.branchAddress}</div>
              </div>
            )}
          </div>
        </div>

        {/* Remarks */}
        {transfer.remarks && (
          <div>
            <h3 className="text-lg font-bold mb-4">Remarks / Notes</h3>
            <div className="p-4 bg-gray-50 rounded-lg text-sm border border-gray-200">
              {transfer.remarks}
            </div>
          </div>
        )}

        {/* Attachments */}
        {transfer.attachments && transfer.attachments.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4">Attachments</h3>
            <div className="space-y-2">
              {transfer.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm"
                >
                  <span>📎</span>
                  <span>{attachment}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Log */}
        {transfer.activityLog && transfer.activityLog.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4">Activity Log</h3>
            <div className="space-y-3">
              {transfer.activityLog.map((log, index) => (
                <div key={index}>
                  <div className="text-sm text-gray-500">{log.action}</div>
                  <div className="text-sm font-medium">
                    {log.user} - {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelexRecordView;
