import React from 'react';

interface ShimmerTableProps {
  columnCount?: number;
  rowCount?: number;
  enableSelection?: boolean;
}

const ShimmerTable: React.FC<ShimmerTableProps> = ({
  columnCount = 5,
  rowCount = 5,
  enableSelection = false,
}) => {
  return (
    <div className="w-full h-full overflow-auto rounded bg-white">
      <table className="min-w-[70vh] w-full text-xs text-left">
        <thead className="sticky top-0 z-10 bg-[#FAFAFA] border-b border-gray-200">
          <tr className="border-b">
            {enableSelection && (
              <th className="p-2 pl-5 h-10 text-left table-10px align-middle whitespace-nowrap font-semibold text-[#1E1E1E]">
                <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
              </th>
            )}
            {Array.from({ length: columnCount }).map((_, i) => (
              <th
                key={i}
                className="p-2 pl-5 h-10 text-left table-10px align-middle whitespace-nowrap text-[#1E1E1E] text-xs font-semibold"
              >
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {enableSelection && (
                <td className="p-2 pl-5 border-b">
                  <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
                </td>
              )}
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="p-2 pl-5 whitespace-nowrap border-b bg-inherit hover:bg-gray-50"
                >
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShimmerTable;
