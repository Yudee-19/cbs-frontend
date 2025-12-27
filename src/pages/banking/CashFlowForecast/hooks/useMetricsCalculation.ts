import { useMemo } from "react";
import type { ForecastEntryWithRaw, MetricsData } from "../types";

export const useMetricsCalculation = (forecasts: ForecastEntryWithRaw[]): MetricsData => {
  return useMemo(() => {
    if (forecasts.length === 0) {
      return {
        currentCashBalance: 0,
        totalInflowsThisMonth: 0,
        totalOutflowsThisMonth: 0,
        projectedMonthEndCash: 0,
      };
    }

    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const currentYear = now.getFullYear();

    // Calculate total inflows and outflows for the current month
    let totalInflows = 0;
    let totalOutflows = 0;
    let currentBalance = 0;

    forecasts.forEach((forecast) => {
      const rawDate = forecast.rawDate || forecast.date;
      if (!rawDate || !forecast.rawAmount) return;
      
      // Parse date string "YYYY-MM-DD" or ISO date
      const dateStr = typeof rawDate === 'string' ? rawDate : new Date(rawDate).toISOString();
      const [year, month] = dateStr.split("-").map(Number);
      
      // Check if forecast is in current month
      if (month === currentMonth && year === currentYear) {
        if (forecast.type === "Inflow") {
          totalInflows += forecast.rawAmount;
        } else if (forecast.type === "Outflow") {
          totalOutflows += forecast.rawAmount;
        }
      }
    });

    // Calculate current balance (all inflows - all outflows up to now)
    forecasts.forEach((forecast) => {
      if (!forecast.rawAmount) return;
      
      if (forecast.type === "Inflow") {
        currentBalance += forecast.rawAmount;
      } else if (forecast.type === "Outflow") {
        currentBalance -= forecast.rawAmount;
      }
    });

    // Projected end balance = current balance (which already includes current month transactions)
    const projectedEndBalance = currentBalance;

    return {
      currentCashBalance: currentBalance,
      totalInflowsThisMonth: totalInflows,
      totalOutflowsThisMonth: totalOutflows,
      projectedMonthEndCash: projectedEndBalance,
    };
  }, [forecasts]);
};
