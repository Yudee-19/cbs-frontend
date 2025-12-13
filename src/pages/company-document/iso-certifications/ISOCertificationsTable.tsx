import React from 'react';
import DataTable from '@/components/ui/table';
import { getISOColumns } from '@/components/columns/companyDocument/iSOCertifications';

interface ISOCertificationsTableProps {
  isoCertifications: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const ISOCertificationsTable: React.FC<ISOCertificationsTableProps> = ({
  isoCertifications,
  onViewDetails,
  onEdit,
//   onDelete,
}) => {
  return (
    <DataTable
      data={isoCertifications.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getISOColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        // (item) => onDelete?.(item)
      )}
    />
  );
};

export default ISOCertificationsTable;
