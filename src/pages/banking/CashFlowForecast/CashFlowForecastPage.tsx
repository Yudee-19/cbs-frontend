import { useState } from "react";
import { usePageMeta } from "@/components/layouts/usePageMeta";
import { createForecast, type ForecastData } from "@/services/banking/ForecastServices";
import { ForecastFormDialog } from "./components/ForecastFormDialog";
import { SummaryCards } from "./components/SummaryCards";
import { ForecastTable } from "./components/ForecastTable";
import { useForecastData } from "./hooks/useForecastData";
import { useMetricsCalculation } from "./hooks/useMetricsCalculation";
import { toast } from "sonner";

const CashFlowForecastPage = () => {
  // usePageMeta automatically updates the header based on the current route
  usePageMeta();

  // Custom hooks
  const { forecasts, loading, refreshForecasts } = useForecastData();
  const metrics = useMetricsCalculation(forecasts);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [forecastForm, setForecastForm] = useState<Partial<ForecastData>>({
    type: "Inflow",
    currency: "KWD",
    status: "Planned",
  });
  const [submitting, setSubmitting] = useState(false);

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
      refreshForecasts();
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
    window.open("https://company-documnets.onrender.com/api/forecasts/upload-csv", "_blank");
  };

  const handleExportReport = () => {
    window.open("https://company-documnets.onrender.com/api/forecasts/export", "_blank");
  };

  return (
    <div className="p-2 sm:p-4 h-full flex flex-col gap-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryCards metrics={metrics} loading={loading} />
      </div>
        
      {/* Forecast Table */}
      <ForecastTable
        forecasts={forecasts}
        loading={loading}
        onAddForecast={handleAddForecast}
        onImportCSV={handleImportCSV}
        onExportReport={handleExportReport}
      />

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
