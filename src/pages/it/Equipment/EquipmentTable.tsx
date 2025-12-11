import React from 'react';
import DataTable from '@/components/ui/table';
import { getNetworkEquipmentColumns } from '@/components/columns/it/equipment';

interface EquipmentTableProps {
  equipment: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const equimentTable: React.FC<EquipmentTableProps> = ({
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
      columns={getNetworkEquipmentColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        (item) => onDelete?.(item)
      )}
    />
  );
};

export default equimentTable;
