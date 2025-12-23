import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/table";
import { getChequeManagerColumns } from "@/components/columns/banking/chequemanager";
import { listCheques, updateCheque, type ChequeData } from "@/services/banking/ChequeServices";
import { toast } from "sonner";

const ChequeManagerPage = () => {
  const navigate = useNavigate();
  const [cheques, setCheques] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>({});

  const hasFetchedRef = useRef(false);

  const fetchCheques = useCallback(async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    try {
      setLoading(true);
      // Fetch all cheques without pagination (max limit is 200)
      const response = await listCheques(1, 200);
      
      // Transform API data to match table format
      const transformedData = response.items.map((cheque: ChequeData) => ({
        id: cheque._id || cheque.id,
        chequeNo: `Ch-${cheque._id?.slice(-4) || "0000"}`,
        payee: cheque.payeeName,
        date: cheque.chequeDate ? new Date(cheque.chequeDate).toLocaleDateString() : "-",
        amount: {
          primary: `KD ${cheque.amount.toFixed(2)}`,
          secondary: `$ ${(cheque.amount * 3.25).toFixed(2)}`, // Example conversion rate
        },
        printStatus: cheque.printStatus || "Pending",
        transactionStatus: "", // This might come from another field in the API
        rawData: cheque, // Store original data for edit
      }));

      setCheques(transformedData);
    } catch (error: any) {
      console.error("Failed to fetch cheques:", error);
      toast.error(error?.message || "Failed to load cheques");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hasFetchedRef.current = false;
    fetchCheques();
  }, [fetchCheques]);

  const handleEdit = useCallback((row: any) => {
    setEditingRowId(row.id);
    setEditedData({
      id: row.id,
      printStatus: row.printStatus,
      transactionStatus: row.transactionStatus,
    });
  }, []);

  const handleCancel = useCallback(() => {
    setEditingRowId(null);
    setEditedData({});
  }, []);

  const handleSave = useCallback(async (row: any) => {
    try {
      // Update the cheque via API
      await updateCheque(row.id, {
        printStatus: editedData.printStatus as any,
      });

      // Update local state
      setCheques((prev) =>
        prev.map((cheque) =>
          cheque.id === row.id
            ? {
                ...cheque,
                printStatus: editedData.printStatus,
                transactionStatus: editedData.transactionStatus,
              }
            : cheque
        )
      );

      toast.success("Cheque updated successfully");
      setEditingRowId(null);
      setEditedData({});
    } catch (error: any) {
      console.error("Failed to update cheque:", error);
      toast.error(error?.message || "Failed to update cheque");
    }
  }, [editedData]);

  const handlePrintStatusChange = useCallback((row: any, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      printStatus: value,
    }));
    
    // Also update the local state immediately for UI feedback
    setCheques((prev) =>
      prev.map((cheque) =>
        cheque.id === row.id
          ? { ...cheque, printStatus: value }
          : cheque
      )
    );
  }, []);

  const handleTransactionStatusChange = useCallback((row: any, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      transactionStatus: value,
    }));
    
    // Also update the local state immediately for UI feedback
    setCheques((prev) =>
      prev.map((cheque) =>
        cheque.id === row.id
          ? { ...cheque, transactionStatus: value }
          : cheque
      )
    );
  }, []);

  const columns = getChequeManagerColumns(
    handleEdit,
    handleSave,
    handleCancel,
    handlePrintStatusChange,
    handleTransactionStatusChange,
    editingRowId
  );

  return (
    <div className="p-2 sm:p-4 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden gap-0">
        <CardHeader className="bg-white sticky top-0 z-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-3">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-semibold">Cheque Manager</h1>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <div className="overflow-x-auto h-full px-2 sm:px-4">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading cheques...</div>
              </div>
            ) : cheques.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">No cheques found</div>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={cheques}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChequeManagerPage;
