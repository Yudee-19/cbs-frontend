import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";
import { listTelexTransfers } from "@/services/banking/TelexTransferServices";
import type { TelexTransferData } from "../types";

export const useTelexTransfers = () => {
  const [transfers, setTransfers] = useState<TelexTransferData[]>([]);
  const [selectedTransfer, setSelectedTransfer] = useState<TelexTransferData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  const fetchTransfers = useCallback(async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    try {
      setIsLoading(true);
      const response = await listTelexTransfers(1, 200);
      setTransfers(response.items);
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
    // Reset fetch ref and refetch after successful creation
    setTimeout(() => {
      hasFetchedRef.current = false;
      fetchTransfers();
    }, 1000);
  }, [fetchTransfers]);

  return {
    transfers,
    selectedTransfer,
    isLoading,
    handleRowClick,
    handleTransferSuccess,
  };
};
