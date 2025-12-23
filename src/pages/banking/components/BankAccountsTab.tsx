import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import DataTable from "@/components/ui/table";
import ShimmerTable from "@/components/ui/shimmerTable";
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

  const paginated = useMemo(() => items, [items]);

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
  );
};

export default BankAccountsTab;
