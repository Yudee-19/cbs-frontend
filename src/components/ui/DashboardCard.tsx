import  { type ReactNode } from "react";

type DashboardCardProps = {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function DashboardCard({ title, right, children, className = "" }: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-5 ${className}`}>
      {(title || right) && (
        <div className="flex items-center justify-between mb-4">
          {title ? <h3 className="text-lg font-semibold">{title}</h3> : <div />}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}