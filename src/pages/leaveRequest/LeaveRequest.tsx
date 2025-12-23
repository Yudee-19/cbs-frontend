import { useEffect, useMemo, useState } from "react";
import StatCard from "@/components/ui/statCard";
import LeaveBalanceCard from "@/components/ui/leaveBalanceCard";
import {
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LeaveRequestTable from "./LeaveRequestTable"; // add
import TablePagination from "@/components/ui/tablePagination";
import { toast } from "sonner";
import {
  listLeaveApplications,
  createLeaveApplication,
  type LeaveApplication,
  type LeaveApplicationData,
} from "@/services/LeaveApplicationServices";
import ShimmerTable from "@/components/ui/shimmerTable";
import { LeaveApplicationFormDialog } from "./LeaveApplicationFormDialog";

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB"); // dd/mm/yyyy
}

function calcDays(startISO?: string, endISO?: string) {
  const s = startISO ? new Date(startISO) : null;
  const e = endISO ? new Date(endISO) : null;
  if (!s || !e || Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return 0;
  const ms = e.getTime() - s.getTime();
  return Math.max(1, Math.floor(ms / 86400000) + 1);
}

export default function LeaveRequest() {
  // Pagination + data (reference: LegalDocumentPage)
  const [items, setItems] = useState<LeaveApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [total, setTotal] = useState<number>(0);

  // Dialog + form state
  type Mode = "add" | "edit";
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [submitting, setSubmitting] = useState(false);
  const emptyForm: LeaveApplicationData = {
    leaveType: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    reason: "",
    fileKey: "",
  };
  const [form, setForm] = useState<LeaveApplicationData>(emptyForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items: resItems, total: totalCount } = await listLeaveApplications("694a2922807c391f4e27bf6b", page, rowsPerPage);
      setItems(Array.isArray(resItems) ? resItems : []);
      setTotal(Number(totalCount) || (Array.isArray(resItems) ? resItems.length : 0));
      setError(null);
    } catch (e: any) {
      setError(e?.message || "Failed to load leave requests.");
      toast.error("Failed to load leave requests", { description: e?.message ?? "Unexpected error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  // Adapt API items to table shape expected by LeaveRequestTable
  const tableData = useMemo(() => {
    return (items || []).map((item, idx) => ({
      id: item.id,
      requestId: item.id || `LV-${new Date().getFullYear()}-${String(idx + 1).padStart(3, "0")}`,
      leaveType: item.leaveType,
      startDate: formatDate(item.startDate),
      endDate: formatDate(item.endDate),
      days: calcDays(item.startDate, item.endDate),
      reason: item.reason,
      appliedOn: formatDate(item.createdAt ?? item.startDate),
      status: item.status ?? "Pending",
      approvedBy: item.approvedBy ?? "",
    }));
  }, [items]);

  // Derive stats from API items
  const pending = items.filter((i) => (i.status ?? "").toLowerCase() === "pending").length;
  const approved = items.filter((i) => (i.status ?? "").toLowerCase() === "approved").length;
  const rejected = items.filter((i) => (i.status ?? "").toLowerCase() === "rejected").length;

  const openAdd = () => {
    setMode("add");
    setForm({
      leaveType: "Emergency Leave",
      startDate: "2025-12-23T00:00:00.000Z",
      endDate: "2025-12-25T00:00:00.000Z",
      reason: "",
    });
    setEditDialogOpen(true);
  };

  const toISODate = (v: string) => {
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      const payload: LeaveApplicationData = {
        leaveType: form.leaveType,
        startDate: toISODate(form.startDate),
        endDate: toISODate(form.endDate),
        reason: form.reason,
      };

      await createLeaveApplication("694a2922807c391f4e27bf6b", payload);
      toast.success("Leave request submitted");
      await fetchData();
    } catch (e: any) {
      toast.error("Submit failed", { description: e?.message ?? "Unexpected error" });
      throw e;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto space-y-6">
        {/* Row 1: request stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Pending Request"
            value={pending.toString().padStart(2, "0")}
            icon={<Clock className="w-4 h-4 text-gray-700" />}
            bgColor="bg-gray-200"
          />
          <StatCard
            title="Approved"
            value={approved.toString().padStart(2, "0")}
            icon={<CheckCircle2 className="w-4 h-4 text-green-700" />}
            bgColor="bg-green-200"
          />
          <StatCard
            title="Rejected"
            value={rejected.toString().padStart(2, "0")}
            icon={<XCircle className="w-4 h-4 text-rose-700" />}
            bgColor="bg-rose-200"
          />
          <StatCard
            title="Total Requests"
            value={total.toString().padStart(2, "0")}
            icon={<FileText className="w-4 h-4 text-indigo-700" />}
            bgColor="bg-indigo-200"
          />
        </div>

        {/* Row 2: leave balance + apply button */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">My Leave Balance -</h3>
              <span className="text-gray-500">2025</span>
            </div>
            <Button onClick={openAdd}>
              <Plus className="w-4 h-4" />
              Apply for leave
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <LeaveBalanceCard
              title="Annual Leave"
              totalDays={30}
              usedDays={9}
              remainingDays={21}
              barColor="bg-emerald-500"
            />
            <LeaveBalanceCard
              title="Sick Leave"
              totalDays={15}
              usedDays={3}
              remainingDays={12}
              barColor="bg-gray-600"
            />
            <LeaveBalanceCard
              title="Emergency Leave"
              totalDays={5}
              usedDays={1}
              remainingDays={4}
              barColor="bg-rose-500"
            />
            <LeaveBalanceCard
              title="Emergency Leave"
              totalDays={5}
              usedDays={1}
              remainingDays={4}
              barColor="bg-indigo-500"
            />
          </div>
        </div>

        {/* Row 3: table + pagination */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border">
          <h3 className="text-lg font-semibold mb-3">My Leave Request</h3>

          {loading ? (
            <ShimmerTable rowCount={10} columnCount={7} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <LeaveRequestTable leaveRequests={tableData} />
          )}

          <div className="mt-3">
            <TablePagination
              total={total}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(p: number) => setPage(p)}
              onRowsPerPageChange={(r: number) => {
                setRowsPerPage(r);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Leave Dialog */}
      <LeaveApplicationFormDialog
        open={editDialogOpen}
        mode={mode}
        form={form}
        onChange={(patch) => setForm((p) => ({ ...p, ...patch }))}
        onSubmit={handleFormSubmit}
        onClose={() => setEditDialogOpen(false)}
        submitting={submitting}
        onFilesChanged={(files) => {
          const first = files[0];
          setForm((p) => ({ ...p, fileKey: first ? first.name : "" }));
        }}
      />
    </div>
  );
}