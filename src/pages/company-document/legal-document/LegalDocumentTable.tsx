import React from 'react';
import DataTable from '@/components/ui/table';
import { getLegalDocumentColumns } from '@/components/columns/companyDocument/legalDocument';

interface LegalDocumentTableProps {
  legalDocuments: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const LegalDocumentTable: React.FC<LegalDocumentTableProps> = ({
  legalDocuments,
  onViewDetails,
  onEdit,
//   onDelete,
}) => {
  return (
    <DataTable
      data={legalDocuments.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getLegalDocumentColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        // (item) => onDelete?.(item)
      )}
    />
  );
};

export default LegalDocumentTable;
