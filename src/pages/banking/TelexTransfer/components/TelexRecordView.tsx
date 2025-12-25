import { Button } from "@/components/ui/button";
import type { TelexRecordViewProps } from "../types";
import { getStatusBadge, getRequestId } from "../utils";

const TelexRecordView = ({ transfer, totalTransfers }: TelexRecordViewProps) => {
  if (!transfer) {
    return (
      <div className="w-[40%] bg-white overflow-auto p-6">
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a transfer to view details
        </div>
      </div>
    );
  }

  return (
    <div className="w-[40%] bg-white overflow-auto p-6">
      <div className="space-y-6">
        {/* Header with stats */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Total Transfer This Month</div>
          <div className="text-2xl font-bold">{totalTransfers}</div>
        </div>

        {/* Transfer ID and Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="font-semibold">{getRequestId(transfer)}</div>
            {getStatusBadge(transfer.status || "Draft")}
          </div>
          <Button variant="outline" className="text-blue-600 border-blue-600">
            📄 Generate TT Letter
          </Button>
        </div>

        {/* Transfer Information */}
        <div>
          <h3 className="text-lg font-bold mb-4">Transfer Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Transfer Date</div>
              <div className="font-medium">
                {new Date(transfer.transferDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Sender Bank Name</div>
              <div className="font-medium">{transfer.senderBankName || "N/A"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Account Number</div>
              <div className="font-medium">{transfer.senderAccountNo}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Currency</div>
              <div className="font-medium">{transfer.currency}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Amount</div>
              <div className="font-medium">
                {transfer.currency} {transfer.transferAmount.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Purpose</div>
              <div className="font-medium">{transfer.purpose}</div>
            </div>
          </div>
        </div>

        {/* Beneficiary Details */}
        <div>
          <h3 className="text-lg font-bold mb-4">Beneficiary Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Beneficiary Name</div>
              <div className="font-medium">{transfer.beneficiaryName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Bank Name</div>
              <div className="font-medium">{transfer.beneficiaryBankName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Account Number</div>
              <div className="font-medium">{transfer.beneficiaryAccountNo}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">SWIFT/IBAN</div>
              <div className="font-medium">{transfer.swiftCode || "USD"}</div>
            </div>
            {transfer.branchAddress && (
              <div className="col-span-2">
                <div className="text-sm text-gray-500 mb-1">Branch Address</div>
                <div className="font-medium">{transfer.branchAddress}</div>
              </div>
            )}
          </div>
        </div>

        {/* Remarks */}
        {transfer.remarks && (
          <div>
            <h3 className="text-lg font-bold mb-4">Remarks / Notes</h3>
            <div className="p-4 bg-gray-50 rounded-lg text-sm">
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
