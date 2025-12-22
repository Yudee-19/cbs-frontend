import React from 'react';
import DataTable from '@/components/ui/table';
import { getAttendanceColumns } from '@/components/columns/myAttendance/myAttendance';

interface MyAttendanceTableProps {
  attendanceRecords: any[];
}

const MyAttendanceTable: React.FC<MyAttendanceTableProps> = ({
  attendanceRecords,
//   onDelete,
}) => {
  return (
    <DataTable
      data={attendanceRecords.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getAttendanceColumns()}
    />
  );
};

export default MyAttendanceTable;
