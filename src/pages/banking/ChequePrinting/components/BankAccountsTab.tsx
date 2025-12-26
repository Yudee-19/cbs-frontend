import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import DataTable from "@/components/ui/table";
import ShimmerTable from "@/components/ui/shimmerTable";
import TablePagination from "@/components/ui/tablePagination";
import { toast } from "sonner";
import { getBankAccountColumns } from "@/components/columns/banking/bankAccount";
import {
  listBankAccounts,
  type BankAccountData,
} from "@/services/banking/BankAccountServices";

interface BankAccountsTabProps {
  onEdit?: (bank: BankAccountData) => void;
  onDelete?: (bank: BankAccountData) => void;
}

const BankAccountsTab = ({ onEdit, onDelete }: BankAccountsTabProps) => {
  const [items, setItems] = useState<BankAccountData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const hasCalledRef = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { items: data } = await listBankAccounts(1, 200);
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      toast.error("Failed to load bank accounts", {
        description: e?.message ?? "",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasCalledRef.current) {
      hasCalledRef.current = true;
      fetchData();
    }
  }, [fetchData]);

  const total = items.length;

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return items.slice(start, start + rowsPerPage);
  }, [items, page, rowsPerPage]);

  const handleEdit = (item: BankAccountData) => {
    if (onEdit) {
      onEdit(item);
    }
  };

  const handleDelete = (item: BankAccountData) => {
    if (onDelete) {
      onDelete(item);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <ShimmerTable rowCount={10} columnCount={5} />
        ) : (
          <DataTable
            data={paginated.map((e) => ({
              ...e,
              id: e._id || e.id || "",
            }))}
            columnStyles={{}}
            columns={getBankAccountColumns(handleEdit, handleDelete)}
            customNoDataMessage={
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  No bank accounts added yet. Click "Add Bank Account" to get started.
                </div>
              }
          />
        )}
      </div>
      
      <div className="border-t bg-white sticky bottom-0 z-20">
        <TablePagination
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(p: number) => setPage(p)}
          onRowsPerPageChange={(r: number) => {
            setRowsPerPage(r);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default BankAccountsTab;
