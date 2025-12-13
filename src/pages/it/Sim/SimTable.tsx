import React from 'react';
import DataTable from '@/components/ui/table';
import { getSimTableColumns } from '@/components/columns/it/sim';

interface SimTableProps {
  sim: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const  SimTable: React.FC<SimTableProps> = ({
  sim,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable
      data={sim.map((s) => ({ ...s, id: s.id }))}
      columnStyles={{
        
      }}
      columns={getSimTableColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        (item) => onDelete?.(item)
      )}
    />
  );
};

export default SimTable;
