import { type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;        // lucide icon
  bgColor?: string;        // tailwind color classes
}

export default function StatCard({
  title,
  value,
  icon,
  bgColor = "bg-gray-200",
}: StatCardProps) {
  return (
    <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 rounded-xl shadow-sm bg-white sm:min-w-[220px]">
      <div className="flex-1">
        <p className="text-xs sm:text-sm text-gray-500">{title}</p>
        <h2 className="text-lg sm:text-xl font-semibold">{value}</h2>
      </div>

      <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shrink-0 self-start sm:self-auto ${bgColor}`}>
        {icon}
      </div>
    </div>
  );
}
