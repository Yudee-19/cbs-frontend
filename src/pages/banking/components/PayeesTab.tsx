import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/ui/table";
import ShimmerTable from "@/components/ui/shimmerTable";
import { getPayeeColumns, type PayeeData } from "@/components/columns/banking/payee";

// Dummy payee data - replace with actual API call
const dummyPayees: PayeeData[] = [];

const PayeesTab = () => {
  const [items, setItems] = useState<PayeeData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setItems(dummyPayees);
      setLoading(false);
    }, 500);
  }, []);

  const paginated = useMemo(() => items, [items]);

  const handleView = (item: PayeeData) => {
    console.log("View payee:", item);
    // TODO: Implement view details
  };

  const handleEdit = (item: PayeeData) => {
    console.log("Edit payee:", item);
    // TODO: Implement edit
  };

  const handleDelete = (item: PayeeData) => {
    console.log("Delete payee:", item);
    // TODO: Implement delete
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
            columns={getPayeeColumns(handleView, handleEdit, handleDelete)}
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
