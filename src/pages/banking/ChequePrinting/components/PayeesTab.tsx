import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import DataTable from "@/components/ui/table";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import { getPayeeColumns, type PayeeData } from "@/components/columns/banking/payee";
import {
  listPayees,
} from "@/services/banking/PayeeServices";

interface PayeesTabProps {
  onEdit?: (payee: PayeeData) => void;
  onDelete?: (payee: PayeeData) => void;
}

const PayeesTab = ({ onEdit, onDelete }: PayeesTabProps) => {
  const [items, setItems] = useState<PayeeData[]>([]);
  const [loading, setLoading] = useState(true);
  const hasCalledRef = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { items: data } = await listPayees(1, 200);
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      toast.error("Failed to load payees", {
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

  const handleEdit = (item: PayeeData) => {
    if (onEdit) {
      onEdit(item);
    }
  };

  const handleDelete = (item: PayeeData) => {
    if (onDelete) {
      onDelete(item);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {loading ? (
        <ShimmerTable rowCount={10} columnCount={6} />
      ) : (
        <>
          <DataTable
            data={paginated.map((e) => ({
              ...e,
              id: e._id || e.id || "",
            }))}
            columnStyles={{}}
            columns={getPayeeColumns(handleEdit, handleDelete)}
            customNoDataMessage={
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                No payees added yet. Click "Add Payee" to get started.
              </div>
            }
          />
        </>
      )}
    </div>
  );
};

export default PayeesTab;
