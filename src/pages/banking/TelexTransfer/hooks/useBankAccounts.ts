import { useState, useEffect, useCallback } from "react";
import { listBankAccounts, type BankAccountData } from "@/services/banking/BankAccountServices";

export const useBankAccounts = (shouldFetch: boolean) => {
  const [bankAccounts, setBankAccounts] = useState<BankAccountData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBankAccounts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await listBankAccounts(1, 100);
      setBankAccounts(response.items);
    } catch (error) {
      console.error("Failed to fetch bank accounts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      fetchBankAccounts();
    }
  }, [shouldFetch, fetchBankAccounts]);

  return { bankAccounts, isLoading };
};
