import React from 'react';
import DataTable from '@/components/ui/table';
import { getLicenseTableColumns } from '@/components/columns/companyDocument/license';

interface LicenseTableProps {
  licenses: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const LicenseTable: React.FC<LicenseTableProps> = ({
  licenses,
  onViewDetails,
  onEdit,
//   onDelete,
}) => {
  return (
    <DataTable
      data={licenses.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getLicenseTableColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        // (item) => onDelete?.(item)
      )}
    />
  );
};

export default LicenseTable;
