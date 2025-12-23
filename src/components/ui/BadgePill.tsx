import React from "react";

export default function BadgePill({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: "gray" | "green" | "sky" | "amber" | "rose" | "blue";
}) {
  const map: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-emerald-100 text-emerald-700",
    sky: "bg-sky-100 text-sky-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
    blue: "bg-blue-100 text-blue-700",
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[color]}`}>{children}</span>;
}