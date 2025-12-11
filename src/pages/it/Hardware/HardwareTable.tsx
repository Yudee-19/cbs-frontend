import React from 'react';
import DataTable from '@/components/ui/table';
import { getHardwareTableColumns } from '@/components/columns/it/hardware';

interface HardwareTableProps {
  hardware: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const hardwareTable: React.FC<HardwareTableProps> = ({
  hardware,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable
      data={hardware.map((h) => ({ ...h, id: h.id }))}
      columnStyles={{
        
      }}
      columns={getHardwareTableColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        (item) => onDelete?.(item)
      )}
    />
  );
};

export default hardwareTable;
