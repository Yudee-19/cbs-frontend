import React from 'react';
import DataTable from '@/components/ui/table';
import { getSoftwareTableColumns } from '@/components/columns/it/software';

interface SoftwareTableProps {
  software: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const  SoftwareTable: React.FC<SoftwareTableProps> = ({
  software,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable
      data={software.map((s) => ({ ...s, id: s.id }))}
      columnStyles={{
        
      }}
      columns={getSoftwareTableColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        (item) => onDelete?.(item)
      )}
    />
  );
};

export default SoftwareTable;
