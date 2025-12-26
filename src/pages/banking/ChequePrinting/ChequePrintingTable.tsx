
import React from 'react';
import DataTable from '@/components/ui/table';
import { getChequeTableColumns } from '@/components/columns/banking/chequeprinting';

interface ChequeReportTableProps {
  chequeReports: any[];
   onPrint?: (row: any) => void,
}

const ChequeReportTable: React.FC<ChequeReportTableProps> = ({
  chequeReports,
  onPrint
 
//   onDelete,
}) => {
  return (
    <DataTable
      data={chequeReports.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getChequeTableColumns(
        (item) => onPrint?.(item)
        // (item) => onDelete?.(item)
      )}
    />
  );
};

export default ChequeReportTable;
