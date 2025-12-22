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

export const leaveRequestDummyData = [
  {
    id: 1,
    requestId: "LV-2025-008",
    leaveType: "Annual Leave",
    startDate: "20/12/2025",
    endDate: "25/12/2025",
    days: 6,
    reason: "Family Vacation",
    appliedOn: "10/11/2025",
    status: "Approved",
    approvedBy: "MD Al-Saleh (HR)",
  },
  {
    id: 2,
    requestId: "LV-2025-009",
    leaveType: "Sick Leave",
    startDate: "15/12/2025",
    endDate: "16/12/2025",
    days: 2,
    reason: "Medical Rest",
    appliedOn: "14/12/2025",
    status: "Pending",
    approvedBy: "MD Al-Saleh (HR)",
  },
  {
    id: 3,
    requestId: "LV-2025-010",
    leaveType: "Annual Leave",
    startDate: "01/01/2026",
    endDate: "05/01/2026",
    days: 5,
    reason: "New Year Trip",
    appliedOn: "20/12/2025",
    status: "Approved",
    approvedBy: "MD Al-Saleh (HR)",
  },
  {
    id: 4,
    requestId: "LV-2025-011",
    leaveType: "Emergency Leave",
    startDate: "05/12/2025",
    endDate: "05/12/2025",
    days: 1,
    reason: "Family Emergency",
    appliedOn: "05/12/2025",
    status: "Rejected",
    approvedBy: "MD Al-Saleh (HR)",
  },
  {
    id: 5,
    requestId: "LV-2025-012",
    leaveType: "Annual Leave",
    startDate: "28/12/2025",
    endDate: "30/12/2025",
    days: 3,
    reason: "Personal Work",
    appliedOn: "18/12/2025",
    status: "Pending",
    approvedBy: "MD Al-Saleh (HR)",
  },
  {
    id: 6,
    requestId: "LV-2025-013",
    leaveType: "Sick Leave",
    startDate: "22/11/2025",
    endDate: "23/11/2025",
    days: 2,
    reason: "Fever",
    appliedOn: "22/11/2025",
    status: "Approved",
    approvedBy: "MD Al-Saleh (HR)",
  },
  {
    id: 7,
    requestId: "LV-2025-014",
    leaveType: "Annual Leave",
    startDate: "10/12/2025",
    endDate: "12/12/2025",
    days: 3,
    reason: "Outstation Travel",
    appliedOn: "01/12/2025",
    status: "Late",
    approvedBy: "MD Al-Saleh (HR)",
  },
  {
    id: 8,
    requestId: "LV-2025-015",
    leaveType: "Casual Leave",
    startDate: "18/12/2025",
    endDate: "18/12/2025",
    days: 1,
    reason: "Personal Work",
    appliedOn: "17/12/2025",
    status: "Approved",
    approvedBy: "MD Al-Saleh (HR)",
  },
  {
    id: 9,
    requestId: "LV-2025-016",
    leaveType: "Annual Leave",
    startDate: "02/01/2026",
    endDate: "04/01/2026",
    days: 3,
    reason: "Family Function",
    appliedOn: "22/12/2025",
    status: "Pending",
    approvedBy: "MD Al-Saleh (HR)",
  },
  {
    id: 10,
    requestId: "LV-2025-017",
    leaveType: "Sick Leave",
    startDate: "29/11/2025",
    endDate: "29/11/2025",
    days: 1,
    reason: "Doctor Visit",
    appliedOn: "29/11/2025",
    status: "Approved",
    approvedBy: "MD Al-Saleh (HR)",
  },
];


export default function LeaveRequest() {
  // top row stats (example values)
  const pending = 1;
  const approved = 2;
  const rejected = 1;
  const total = 1;

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
            <Button >
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

        {/* Row 3: table */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border">
          <h3 className="text-lg font-semibold mb-3">My Leave Request</h3>
          <LeaveRequestTable leaveRequests={leaveRequestDummyData} />
        </div>
      </div>
    </div>
  );
}