import React from 'react';
import DataTable from '@/components/ui/table';
import { getAuditReportColumns } from '@/components/columns/companyDocument/auditReport';

interface AduitReportTableProps {
  auditReports: any[];
  onViewDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const AduitReportTable: React.FC<AduitReportTableProps> = ({
  auditReports,
  onViewDetails,
  onEdit,
//   onDelete,
}) => {
  return (
    <DataTable
      data={auditReports.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getAuditReportColumns(
        (item) => onViewDetails?.(item),
        (item) => onEdit?.(item),
        // (item) => onDelete?.(item)
      )}
    />
  );
};

export default AduitReportTable;
