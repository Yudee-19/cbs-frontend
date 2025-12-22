export const getLeaveStatusBadge = (status: string) => {
  let classes = "";

  switch (status.toLowerCase()) {
    case "approved":
      classes = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "pending":
      classes = "bg-gray-100 text-gray-600 border border-gray-200";
      break;
    case "rejected":
    case "late":
      classes = "bg-red-100 text-red-600 border border-red-200";
      break;
    default:
      classes = "bg-gray-100 text-gray-600 border border-gray-200";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${classes}`}>
      {status}
    </span>
  );
};

export const getLeaveRequestColumns = () => [
  {
    key: "requestId",
    header: "Request ID",
    render: (row: any) => row?.requestId ?? "-",
  },
  {
    key: "leaveType",
    header: "Leave Type",
    render: (row: any) => row?.leaveType ?? "-",
  },
  {
    key: "startDate",
    header: "Start Date",
    render: (row: any) => row?.startDate ?? "-",
  },
  {
    key: "endDate",
    header: "End Date",
    render: (row: any) => row?.endDate ?? "-",
  },
  {
    key: "days",
    header: "Days",
    render: (row: any) => row?.days ?? "-",
  },
  {
    key: "reason",
    header: "Reason",
    render: (row: any) => row?.reason ?? "-",
  },
  {
    key: "appliedOn",
    header: "Applied On",
    render: (row: any) => row?.appliedOn ?? "-",
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => getLeaveStatusBadge(row?.status ?? "-"),
  },
  {
    key: "approvedBy",
    header: "Approved By",
    render: (row: any) => row?.approvedBy ?? "-",
  },
];
