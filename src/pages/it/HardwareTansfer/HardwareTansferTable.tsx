import React from 'react';
import DataTable from '@/components/ui/table';
import { getHardwareTransferColumns } from '@/components/columns/it/hardwareTansfer';

interface HardwareTransferTableProps {
  hardware: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const  HardwareTransferTable: React.FC<HardwareTransferTableProps> = ({
  hardware,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable
      data={hardware.map((s) => ({ ...s, id: s.id }))}
      columnStyles={{
        
      }}
      columns={getHardwareTransferColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        (item) => onDelete?.(item)
      )}
    />
  );
};

export default HardwareTransferTable;
