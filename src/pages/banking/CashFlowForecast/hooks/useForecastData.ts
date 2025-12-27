import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";
import { listForecasts, type ForecastData } from "@/services/banking/ForecastServices";
import type { ForecastEntryWithRaw } from "../types";

export const useForecastData = () => {
  const [forecasts, setForecasts] = useState<ForecastEntryWithRaw[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  const fetchForecasts = useCallback(async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    try {
      setLoading(true);
      // Fetch all forecasts without pagination (max limit is 200)
      const response = await listForecasts(1, 200);

      // Transform API data to match table format
      const transformedData: ForecastEntryWithRaw[] = response.items.map((forecast: ForecastData) => ({
        id: forecast._id || forecast.id || "",
        date: forecast.date ? new Date(forecast.date).toISOString().split("T")[0] : "-",
        type: forecast.type,
        category: forecast.category,
        description: forecast.description,
        amount: {
          primary: `${forecast.currency} ${forecast.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          secondary: `$ ${(forecast.amount * 3.25).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
        },
        bankAccount: forecast.bankAccount,
        status: forecast.status,
        rawAmount: forecast.amount,
        rawDate: forecast.date,
      }));

      setForecasts(transformedData);
    } catch (error: any) {
      console.error("Failed to fetch forecasts:", error);
      toast.error(error?.message || "Failed to load forecasts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hasFetchedRef.current = false;
    fetchForecasts();
  }, [fetchForecasts]);

  const refreshForecasts = useCallback(() => {
    hasFetchedRef.current = false;
    fetchForecasts();
  }, [fetchForecasts]);

  return {
    forecasts,
    loading,
    refreshForecasts,
  };
};
