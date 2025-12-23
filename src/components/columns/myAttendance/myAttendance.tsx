export const getAttendanceStatusBadge = (status: string) => {
  let classes = "";

  switch (status.toLowerCase()) {
    case "present":
      classes = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "late":
      classes = "bg-orange-100 text-orange-600 border border-orange-200";
      break;
    case "leave":
      classes = "bg-blue-100 text-blue-600 border border-blue-200";
      break;
    default:
      classes = "bg-gray-100 text-gray-600 border border-gray-200";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${classes}`}
    >
      {status}
    </span>
  );
};

export const getAttendanceColumns = () => [
  {
    key: "date",
    header: "Date",
    render: (row: any) =>
      row?.date
        ? new Date(row.date).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "-",
  },
  {
    key: "checkIn",
    header: "Check In",
    render: (row: any) => row?.checkIn ?? "-",
  },
  {
    key: "checkOut",
    header: "Check Out",
    render: (row: any) => row?.checkOut ?? "-",
  },
  {
    key: "hoursWorked",
    header: "Hours Worked",
    render: (row: any) => row?.hoursWorked ?? "-",
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => getAttendanceStatusBadge(row?.status ?? "-"),
  },
];
