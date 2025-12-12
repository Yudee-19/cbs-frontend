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
    <div className="flex items-center justify-between p-4 rounded-xl shadow-sm bg-white min-w-[220px]">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>

      <div className={`w-10 h-10 flex items-center justify-center rounded-full ${bgColor}`}>
        {icon}
      </div>
    </div>
  );
}
