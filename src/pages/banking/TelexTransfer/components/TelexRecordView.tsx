import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import type { TelexRecordViewProps } from "../types";
import { getStatusBadge, getRequestId } from "../utils";

const TelexRecordView = ({ transfer, totalTransfers }: TelexRecordViewProps) => {
    return (
        <div className="w-full flex flex-col gap-4">
            {/* Header with stats - Always visible */}
            <div className="flex items-center justify-between p-4 pt-2 pb-2 border border-[#EAECF0] rounded-lg bg-gray-100">
                <div className="text-sm text-[rgba(16, 24, 40, 0.8)]">Total Transfer This Month</div>
                <div className="text-sm text-[rgba(16, 24, 40, 0.8)]">{totalTransfers}</div>
            </div>

            {/* Content section - Only visible when transfer is selected */}
            {!transfer ? (
                <div className="w-full bg-white overflow-auto p-6 rounded-xl shadow-[0px_4px_4px_0px_#0000000A]">
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a transfer to view details
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
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
                                <div className="font-medium text-[rgba(16,24,40,0.8)]">
                                  {typeof transfer.senderBank === 'object' 
                                    ? transfer.senderBank?.bankName || "N/A"
                                    : transfer.senderBankName || "N/A"}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1 font-light">Account Number</div>
                                <div className="font-medium text-[rgba(16,24,40,0.8)]">
                                  {typeof transfer.senderBank === 'object'
                                    ? transfer.senderBank?.accountNumber || "N/A"
                                    : transfer.senderAccountNo}
                                </div>
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

                    {/* Remarks / Notes and Attachments */}
                    {(transfer.remarks || (transfer.attachments && transfer.attachments.length > 0)) && (
                        <div>
                            <h3 className="text-lg font-bold mb-4">Remarks / Notes</h3>
                            
                            {/* Remarks Text */}
                            {transfer.remarks && (
                                <div className="p-4 bg-gray-50 rounded-lg text-sm border border-gray-200 mb-4">
                                    {transfer.remarks}
                                </div>
                            )}
                            
                            {/* Attachments */}
                            {transfer.attachments && transfer.attachments.length > 0 && (
                                <div className="space-y-2">
                                    {transfer.attachments.map((attachment, index) => (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm border border-gray-200">
                                            <FileText className="h-4 w-4 text-gray-400" />
                                            <span className="text-[rgba(16,24,40,0.8)]">{attachment}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
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
            )}
        </div>
    );
};

export default TelexRecordView;
