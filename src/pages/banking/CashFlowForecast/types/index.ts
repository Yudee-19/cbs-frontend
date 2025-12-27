export interface MetricsData {
  currentCashBalance: number;
  totalInflowsThisMonth: number;
  totalOutflowsThisMonth: number;
  projectedMonthEndCash: number;
}

export interface ForecastEntryWithRaw {
  id: string;
  date: string;
  type: "Inflow" | "Outflow";
  category: string;
  description: string;
  amount: {
    primary: string;
    secondary: string;
  };
  bankAccount: string;
  status: "Planned" | "Confirmed";
  rawAmount: number;
  rawDate: string;
}
