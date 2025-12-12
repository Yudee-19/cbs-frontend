import React from 'react';
import DataTable from '@/components/ui/table';
import { getFurnitureTableColumns } from '@/components/columns/assets/furniture';

interface FurnitureTableProps {
  furniture: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const FurnitureTable: React.FC<FurnitureTableProps> = ({
  furniture,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable
      data={furniture.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getFurnitureTableColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        (item) => onDelete?.(item)
      )}
    />
  );
};

export default FurnitureTable;
