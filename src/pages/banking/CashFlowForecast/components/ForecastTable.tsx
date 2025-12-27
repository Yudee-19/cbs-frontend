import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import DataTable from "@/components/ui/table";
import ShimmerTable from "@/components/ui/shimmerTable";
import TablePagination from "@/components/ui/tablePagination";
import { getForecastColumns } from "@/components/columns/banking/cashFlowForecast";
import type { ForecastEntryWithRaw } from "../types";

interface ForecastTableProps {
  forecasts: ForecastEntryWithRaw[];
  loading: boolean;
  onAddForecast: () => void;
  onImportCSV: () => void;
  onExportReport: () => void;
}

export const ForecastTable = ({
  forecasts,
  loading,
  onAddForecast,
  onImportCSV,
  onExportReport,
}: ForecastTableProps) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const columns = getForecastColumns();
  const total = forecasts.length;

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return forecasts.slice(start, start + rowsPerPage);
  }, [forecasts, page, rowsPerPage]);

  return (
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
              onClick={onAddForecast}
            >
              <Plus className="h-4 w-4" />
              Add Forecast
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 flex items-center gap-2"
              onClick={onImportCSV}
            >
              <Upload className="h-4 w-4" />
              Import CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 flex items-center gap-2"
              onClick={onExportReport}
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
  );
};
