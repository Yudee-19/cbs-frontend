import React from 'react';
import DataTable from '@/components/ui/table';
import { getVehicleTableColumns } from '@/components/columns/assets/vehicle';

interface VehicleTableProps {
  vehicle: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicle,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable
      data={vehicle.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getVehicleTableColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        (item) => onDelete?.(item)
      )}
    />
  );
};

export default VehicleTable;
