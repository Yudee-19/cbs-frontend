import React from 'react';
import DataTable from '@/components/ui/table';
import { getLeaveRequestColumns  } from '@/components/columns/leaveRequest/leaveRequest';

interface LeaveRequestTableProps {
  leaveRequests: any[];
}

const LeaveRequestTable: React.FC<LeaveRequestTableProps> = ({
  leaveRequests,
//   onDelete,
}) => {
  return (
    <DataTable
      data={leaveRequests.map((e) => ({ ...e, id: e.id }))}
      columnStyles={{
        
      }}
      columns={getLeaveRequestColumns()}
    />
  );
};

export default LeaveRequestTable;
