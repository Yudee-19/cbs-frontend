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
        className="min-w-[70vh] w-full text-xs text-left border-separate border-spacing-y-3 border-spacing-x-0"
      >
        <thead className="sticky top-0 z-10  border-b border-gray-200">
          <tr className="data-[state=selected]:bg-muted border-b bg-primary text-white ">
            {enableSelection && (
              <th className="p-2 pl-5  h-10 text-left table-10px align-middle whitespace-nowrap font-semibold first:rounded-l-sm last:rounded-r-sm ">
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
                className={`p-2 pl-5 h-10 table-10px align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-xs ${col.key === 'id' || col.key === 'userId' ? 'font-bold ' : 'font-semibold '} text-center cursor-pointer first:rounded-l-sm last:rounded-r-sm` }
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
                className="cursor-pointer bg-white hover:bg-gray-50"
                onClick={() => onRowClick?.(row)}
              >
                {enableSelection && (
                  <td className="px-4 py-4 first:border-l border-y last:border-r border-gray-200 first:rounded-l-sm last:rounded-r-sm">
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onCheckedChange={() => toggleRow(row.id)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key.toString()}
                    className={`px-4 py-4 whitespace-nowrap first:border-l border-y last:border-r border-gray-200 first:rounded-l-sm last:rounded-r-sm ${
                      col.cellClassName ? col.cellClassName(row) : ''
                    } ${columnStyles?.[col.key.toString()] || 'text-gray-500'} text-center`}
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
