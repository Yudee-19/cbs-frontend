import { Plus, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShimmerTable from "@/components/ui/shimmerTable";
import type { TelexTransferTableProps } from "../types";
import { getStatusBadge, getRequestId } from "../utils";

const TelexTransferTable = ({
  transfers,
  loading,
  selectedTransfer,
  onRowClick,
  onNewTransfer,
}: TelexTransferTableProps) => {
  return (
    <div className="w-[60%] bg-white border-r flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900">
            ROLE : ADMIN
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onNewTransfer}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Transfer
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <ShimmerTable columnCount={7} rowCount={8} />
        ) : (
          <table className="w-full">
            <thead className="sticky top-0 bg-blue-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Request ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Beneficiary</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Bank</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Auth By</th>
              </tr>
            </thead>
            <tbody>
              {transfers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No transfers found
                  </td>
                </tr>
              ) : (
                transfers.map((transfer) => (
                  <tr
                    key={transfer._id || transfer.id}
                    onClick={() => onRowClick(transfer)}
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      selectedTransfer?._id === transfer._id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4 py-4 text-sm">{getRequestId(transfer)}</td>
                    <td className="px-4 py-4 text-sm">
                      {new Date(transfer.transferDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm">{transfer.beneficiaryName}</td>
                    <td className="px-4 py-4 text-sm">{transfer.beneficiaryBankName}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="font-semibold">
                        {transfer.currency} {transfer.transferAmount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ($ {(transfer.transferAmount * 0.3).toFixed(2)})
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {getStatusBadge(transfer.status || "Draft")}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {transfer.authorizedBy || "Pending"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TelexTransferTable;
