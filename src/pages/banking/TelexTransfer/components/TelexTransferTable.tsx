import { Plus, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/table";
import type { TelexTransferTableProps } from "../types";
import { getStatusBadge, getRequestId } from "../utils";

const TelexTransferTable = ({
  transfers,
  onRowClick,
  onNewTransfer,
}: TelexTransferTableProps) => {
  const columns = [
    {
      key: "requestId",
      header: "Request ID",
      render: (row: any) => <div className="text-[#101828]">{getRequestId(row)}</div>,
    },
    {
      key: "transferDate",
      header: "Date",
      render: (row: any) => <div className="text-[#101828]">{new Date(row.transferDate).toLocaleDateString()}</div>,
    },
    {
      key: "beneficiaryName",
      header: "Beneficiary",
      render: (row: any) => <div className="text-[#101828]">{row.beneficiaryName}</div>,
    },
    {
      key: "beneficiaryBankName",
      header: "Bank",
      render: (row: any) => <div className="text-[#101828]">{row.beneficiaryBankName}</div>,
    },
    {
      key: "transferAmount",
      header: "Amount",
      render: (row: any) => (
        <div className="flex flex-col">
          <div className="text-[#101828]">
            {row.currency} {row.transferAmount.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">
            ($ {(row.transferAmount * 0.3).toFixed(2)})
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => <div className="text-[#101828]">{getStatusBadge(row.status || "Draft")}</div>,
    },
    {
      key: "authorizedBy",
      header: "Auth By",
      render: (row: any) => <div className="text-[#101828]">{row.authorizedBy || "Pending"}</div>,
    },
  ];

  return (
    <div className="w-[60%] bg-white flex flex-col ml-2 rounded-xl shadow-[0px_4px_4px_0px_#0000000A]">
      {/* Header */}
      <div className="pl-4 pr-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900">
            ROLE : USER
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onNewTransfer}
              className="bg-primary hover:bg-blue-800 text-white"
            >
              <Plus className="h-4 w-4" />
              New Transfer
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto pl-4 pr-4">
        <DataTable
          data={transfers.map((t) => ({
            ...t,
            id: t._id || t.id || "",
          }))}
          columns={columns}
          onRowClick={onRowClick}
          customNoDataMessage="No transfers found"
        />
      </div>
    </div>
  );
};

export default TelexTransferTable;
