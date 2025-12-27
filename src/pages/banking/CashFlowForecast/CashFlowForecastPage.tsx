import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import { usePageMeta } from "@/components/layouts/usePageMeta";
import DataTable from "@/components/ui/table";
import ShimmerTable from "@/components/ui/shimmerTable";
import TablePagination from "@/components/ui/tablePagination";
import { getForecastColumns, type ForecastEntry } from "@/components/columns/banking/cashFlowForecast";
import { 
  listForecasts, 
  createForecast, 
  type ForecastData 
} from "@/services/banking/ForecastServices";
import { ForecastFormDialog } from "./components/ForecastFormDialog";
import { toast } from "sonner";
import svgSprites from "@/assets/svg-sprites.svg";

const CashFlowForecastPage = () => {
  // usePageMeta automatically updates the header based on the current route
  usePageMeta();

  const [forecasts, setForecasts] = useState<ForecastEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [forecastForm, setForecastForm] = useState<Partial<ForecastData>>({
    type: "Inflow",
    currency: "KWD",
    status: "Planned",
  });
  const [submitting, setSubmitting] = useState(false);

  const hasFetchedRef = useRef(false);

  const fetchForecasts = useCallback(async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    try {
      setLoading(true);
      // Fetch all forecasts without pagination (max limit is 200)
      const response = await listForecasts(1, 200);

      // Transform API data to match table format
      const transformedData = response.items.map((forecast: ForecastData) => ({
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
        rawAmount: forecast.amount, // Keep the raw numeric amount for calculations
        rawDate: forecast.date, // Keep the raw date for calculations
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

  const handleAddForecast = () => {
    setForecastForm({
      type: "Inflow",
      currency: "KWD",
      status: "Planned",
    });
    setDialogMode("add");
    setDialogOpen(true);
  };

  const handleForecastSubmit = async () => {
    try {
      setSubmitting(true);

      if (dialogMode === "add") {
        await createForecast(
          forecastForm as Omit<ForecastData, "_id" | "id" | "createdAt" | "updatedAt">
        );
        toast.success("Forecast added successfully");
      }

      setDialogOpen(false);
      setForecastForm({
        type: "Inflow",
        currency: "KWD",
        status: "Planned",
      });
      
      // Refresh data
      hasFetchedRef.current = false;
      fetchForecasts();
    } catch (error: any) {
      toast.error(
        `Failed to ${dialogMode === "add" ? "add" : "update"} forecast`,
        {
          description: error?.message ?? "",
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    if (!submitting) {
      setDialogOpen(false);
      setForecastForm({
        type: "Inflow",
        currency: "KWD",
        status: "Planned",
      });
    }
  };

  const handleImportCSV = () => {
    // TODO: Implement CSV import functionality
    window.open("https://company-documnets.onrender.com/api/forecasts/upload-csv", "_blank");
  };

  const handleExportReport = () => {
    // TODO: Implement export functionality
    window.open("https://company-documnets.onrender.com/api/forecasts/export", "_blank");
  };

  const columns = getForecastColumns();

  const total = forecasts.length;

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return forecasts.slice(start, start + rowsPerPage);
  }, [forecasts, page, rowsPerPage]);

  // Calculate summary metrics from raw forecasts data
  const metrics = useMemo(() => {
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

    forecasts.forEach((forecast: any) => {
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
    forecasts.forEach((forecast: any) => {
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

  return (
    <div className="p-2 sm:p-4 h-full flex flex-col gap-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {loading ? (
          // Skeleton loaders for summary cards
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-3xl">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {/* Current Cash Balance */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Current Cash Balance</p>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">
                    ${metrics.currentCashBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="bg-gray-100 p-3 rounded-3xl">
                  <svg className="h-5 w-5" style={{ color: "rgba(16, 24, 40, 0.6)" }}>
                    <use href={`${svgSprites}#icon-cash-balance`} />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Inflows */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Inflows (This Month)</p>
                  <p className="text-lg sm:text-xl font-semibold text-green-600">
                    ${metrics.totalInflowsThisMonth.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-3xl">
                  <svg className="h-5 w-5" style={{ color: "#04873D" }}>
                    <use href={`${svgSprites}#icon-total-inflows`} />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Outflows */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Outflows (This Month)</p>
                  <p className="text-lg sm:text-xl font-semibold text-red-600">
                    ${metrics.totalOutflowsThisMonth.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="bg-red-100 p-3 rounded-3xl">
                  <svg className="h-5 w-5" style={{ color: "rgba(209, 5, 5, 0.8)" }}>
                    <use href={`${svgSprites}#icon-total-outflows`} />
                  </svg>
                </div>
              </div>
            </div>

            {/* Projected Month-End Cash */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Projected Month-End Cash</p>
                  <p className="text-lg sm:text-xl font-semibold text-blue-600">
                    ${metrics.projectedMonthEndCash.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-3xl">
                  <svg className="h-5 w-5" style={{ color: "rgba(4, 70, 165, 0.8)" }}>
                    <use href={`${svgSprites}#icon-projected-cash`} />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
        
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden gap-0">
        {/* Header */}
        <div className="bg-white sticky top-0 z-20 px-2 sm:px-4 pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-3">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-semibold">Forecast Entries</h1>
              <span className="ml-2 mt-1 text-xs text-gray-500">ROLE : USER</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                className="h-9 px-3 flex items-center gap-2"
                onClick={handleAddForecast}
              >
                <Plus className="h-4 w-4" />
                Add Forecast
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 flex items-center gap-2"
                onClick={handleImportCSV}
              >
                <Upload className="h-4 w-4" />
                Import CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 flex items-center gap-2"
                onClick={handleExportReport}
              >
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <CardContent className="flex-1 overflow-hidden p-0">
          <div className="overflow-x-auto h-full px-2 sm:px-4">
            {loading ? (
              <ShimmerTable columnCount={7} rowCount={10} />
            ) : (
              <DataTable columns={columns} data={paginated} />
            )}
          </div>
        </CardContent>

        {/* Pagination Footer */}
        <div className="border-t bg-white sticky bottom-0 z-20 px-2 sm:px-4">
          <TablePagination
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(p: number) => setPage(p)}
            onRowsPerPageChange={(r: number) => {
              setRowsPerPage(r);
              setPage(1);
            }}
          />
        </div>
      </Card>

      {/* Forecast Form Dialog */}
      <ForecastFormDialog
        open={dialogOpen}
        mode={dialogMode}
        form={forecastForm}
        onChange={(patch) => setForecastForm({ ...forecastForm, ...patch })}
        onSubmit={handleForecastSubmit}
        onClose={handleDialogClose}
        submitting={submitting}
      />
    </div>
  );
};

export default CashFlowForecastPage;
