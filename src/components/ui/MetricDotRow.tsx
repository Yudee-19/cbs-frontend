

export default function MetricDotRow({
  color = "bg-blue-600",
  label,
  value,
}: {
  color?: string;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-gray-700">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}