import React from 'react';
import DataTable from '@/components/ui/table';
import { getEquipmentTableColumns } from '@/components/columns/assets/equipment';

interface EquipmentTableProps {
  equipment: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({
  equipment,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable
      data={equipment.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getEquipmentTableColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        (item) => onDelete?.(item)
      )}
    />
  );
};

export default EquipmentTable;
