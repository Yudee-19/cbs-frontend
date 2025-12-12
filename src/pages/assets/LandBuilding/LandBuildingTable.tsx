import React from 'react';
import DataTable from '@/components/ui/table';
import { getLandBuildingColumns } from '@/components/columns/assets/landBuilding';

interface LandBuildingTableProps {
  landBuildings: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const LandBuildingTable: React.FC<LandBuildingTableProps> = ({
  landBuildings,
  onViewDetails,
  onEdit,
//   onDelete,
}) => {
  return (
    <DataTable
      data={landBuildings.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getLandBuildingColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        // (item) => onDelete?.(item)
      )}
    />
  );
};

export default LandBuildingTable;
