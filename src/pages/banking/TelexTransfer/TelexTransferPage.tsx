import { useState, useCallback, useRef, useEffect } from "react";
import type { TelexTransferData } from "./types";
import { listTelexTransfers } from "@/services/banking/TelexTransferServices";
import { toast } from "sonner";
import NewTransferModal from "./components/NewTransferModal";
import TelexTransferTable from "./components/TelexTransferTable";
import TelexRecordView from "./components/TelexRecordView";

const TelexTransferPage = () => {
  const [transfers, setTransfers] = useState<TelexTransferData[]>([]);
  const [selectedTransfer, setSelectedTransfer] = useState<TelexTransferData | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  const fetchTransfers = useCallback(async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    try {
      setIsLoading(true);
      const response = await listTelexTransfers(1, 200);
      setTransfers(response.items);
      // Don't auto-select first transfer - wait for user to click
    } catch (error: any) {
      console.error("Failed to fetch telex transfers:", error);
      toast.error(error?.message || "Failed to load transfers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    hasFetchedRef.current = false;
    fetchTransfers();
  }, [fetchTransfers]);

  const handleRowClick = useCallback((transfer: TelexTransferData) => {
    setSelectedTransfer(transfer);
  }, []);

  const handleTransferSuccess = useCallback(() => {
    // Add a small delay to ensure backend has processed the transfer and attachments
    setTimeout(() => {
      hasFetchedRef.current = false;
      fetchTransfers();
    }, 1000);
  }, [fetchTransfers]);

  return (
    <div className="flex h-full bg-gray-50 gap-4">
      {/* Left Side - Table (60%) */}
      <TelexTransferTable
        transfers={transfers}
        onRowClick={handleRowClick}
        onNewTransfer={() => setShowNewModal(true)}
        isLoading={isLoading}
      />

      {/* Right Side - Details (40%) */}
      <TelexRecordView
        transfer={selectedTransfer}
        totalTransfers={transfers.length}
      />

      {/* New Transfer Modal */}
      {showNewModal && (
        <NewTransferModal
          open={showNewModal}
          onClose={() => setShowNewModal(false)}
          onSuccess={handleTransferSuccess}
        />
      )}
    </div>
  );
};

export default TelexTransferPage;
