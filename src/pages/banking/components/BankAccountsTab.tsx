import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/ui/table";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import { getBankAccountColumns } from "@/components/columns/banking/bankAccount";
import {
  listBankAccounts,
  type BankAccountData,
} from "@/services/banking/BankAccountServices";

const BankAccountsTab = () => {
  const [items, setItems] = useState<BankAccountData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items: data } = await listBankAccounts(1, 200);
      setItems(Array.isArray(data) ? data : []);
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load bank accounts");
      toast.error("Failed to load bank accounts", {
        description: e?.message ?? "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginated = useMemo(() => items, [items]);

  const handleView = (item: BankAccountData) => {
    console.log("View bank account:", item);
    // TODO: Implement view details
  };

  const handleEdit = (item: BankAccountData) => {
    console.log("Edit bank account:", item);
    // TODO: Implement edit
  };

  const handleDelete = (item: BankAccountData) => {
    console.log("Delete bank account:", item);
    // TODO: Implement delete
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {loading ? (
        <ShimmerTable rowCount={10} columnCount={5} />
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : (
        <DataTable
          data={paginated.map((e) => ({
            ...e,
            id: e._id || e.id || "",
          }))}
          columnStyles={{}}
          columns={getBankAccountColumns(handleView, handleEdit, handleDelete)}
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
