import svgSprites from "@/assets/svg-sprites.svg";
import type { MetricsData } from "../types";

interface SummaryCardsProps {
  metrics: MetricsData;
  loading: boolean;
}

export const SummaryCards = ({ metrics, loading }: SummaryCardsProps) => {
  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse" style={{ boxShadow: '0px 4px 4px 0px #0000000A' }}>
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
    );
  }

  return (
    <>
      {/* Current Cash Balance */}
      <div className="bg-white rounded-lg border border-gray-200 p-4" style={{ boxShadow: '0px 4px 4px 0px #0000000A' }}>
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
      <div className="bg-white rounded-lg border border-gray-200 p-4" style={{ boxShadow: '0px 4px 4px 0px #0000000A' }}>
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
      <div className="bg-white rounded-lg border border-gray-200 p-4" style={{ boxShadow: '0px 4px 4px 0px #0000000A' }}>
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
      <div className="bg-white rounded-lg border border-gray-200 p-4" style={{ boxShadow: '0px 4px 4px 0px #0000000A' }}>
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
  );
};
