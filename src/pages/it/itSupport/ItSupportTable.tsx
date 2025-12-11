import React from 'react';
import DataTable from '@/components/ui/table';
import { getTicketTableColumns } from '@/components/columns/it/itSupport';

interface ItSolutionTableProps {
  tickets: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const ItSolutionTable: React.FC<ItSolutionTableProps> = ({
  tickets,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable
      data={tickets.map((t) => ({ ...t, id: t.id }))}
      columnStyles={{
        
      }}
      columns={getTicketTableColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        (item) => onDelete?.(item)
      )}
    />
  );
};

export default ItSolutionTable;
