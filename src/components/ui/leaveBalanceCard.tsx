type LeaveBalanceCardProps = {
  title: string;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  barColor?: string; // e.g. "bg-emerald-500"
};

export default function LeaveBalanceCard({
  title,
  totalDays,
  usedDays,
  remainingDays,
  barColor = "bg-emerald-500",
}: LeaveBalanceCardProps) {
  const pct = Math.max(0, Math.min(100, Math.round((usedDays / totalDays) * 100)));

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border">
      <h4 className="font-medium">{title}</h4>

      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-500">
        <div>Total Allocation :</div>
        <div className="text-right">{totalDays} days</div>

        <div>Used :</div>
        <div className="text-right">{usedDays} days</div>
      </div>

      <div className="mt-3">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-2 ${barColor} rounded-full transition-all`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-500">
        <div>Remaining :</div>
        <div className="text-right font-semibold text-gray-900">{remainingDays}</div>
      </div>
    </div>
  );
}