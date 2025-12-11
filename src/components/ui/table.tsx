import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  cellClassName?: (row: T) => string;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  enableSelection?: boolean;
  columnStyles?: Record<string, string>;
}

function DataTable<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  enableSelection = false,
  columnStyles = {},
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<string[]>([]);

  const allSelected = data.length > 0 && selected.length === data.length;
  const someSelected = selected.length > 0 && selected.length < data.length;

  const toggleSelectAll = () => {
    if (allSelected) setSelected([]);
    else setSelected(data.map((r) => r.id));
  };

  const toggleRow = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="w-full h-full overflow-auto  rounded bg-white"
      data-slot="table-container"
    >
      <table
        data-slot="table"
        className="min-w-[70vh] w-full text-xs text-left"
      >
        <thead className="sticky top-0 z-10 bg-[#FAFAFA] border-b border-gray-200">
          <tr className=" hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ">
            {enableSelection && (
              <th className="p-2 pl-5  h-10 text-left table-10px align-middle whitespace-nowrap font-semibold text-[#1E1E1E]">
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? 'indeterminate' : false
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key.toString()}
                className={`p-2 pl-5 h-10 text-left table-10px align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]   text-xs", ${col.key === 'id' || col.key === 'userId' ? 'font-bold text-gray-900' : 'font-semibold text-[#1E1E1E]'}  cursor-pointer`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (enableSelection ? 1 : 0)}
                className="text-center p-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 cursor-pointer bg-white"
                onClick={() => onRowClick?.(row)}
              >
                {enableSelection && (
                  <td className="p-2 pl-5 border-b">
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onCheckedChange={() => toggleRow(row.id)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key.toString()}
                    className={`p-2 pl-5 whitespace-nowrap border-b  hover:bg-gray-50${
                      col.cellClassName ? col.cellClassName(row) : ''
                    } ${columnStyles?.[col.key.toString()] || 'text-gray-500'}`}
                    data-slot="table-cell"
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
