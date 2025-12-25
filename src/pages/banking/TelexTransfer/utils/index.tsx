export const getStatusBadge = (status: string) => {
  let cls = "";

  switch (status?.toLowerCase()) {
    case "approved":
      cls = "bg-green-100 text-green-700";
      break;
    case "pending":
      cls = "bg-red-100 text-red-700";
      break;
    case "draft":
      cls = "bg-gray-100 text-gray-700";
      break;
    default:
      cls = "bg-gray-100 text-gray-700";
  }

  return (
    <span className={`px-3 py-1 rounded-xl text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
};

export const formatCurrency = (amount: number, currency: string): string => {
  return `${currency} ${amount.toFixed(2)}`;
};

export const getRequestId = (transfer: { _id?: string; id?: string; requestId?: string }): string => {
  return transfer.requestId || `TT-${transfer._id?.slice(-6) || transfer.id?.slice(-6) || "000000"}`;
};
