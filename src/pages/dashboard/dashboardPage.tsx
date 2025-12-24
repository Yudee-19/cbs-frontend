import { CheckCircle2, LogIn, LogOut, FileDown, Printer } from "lucide-react";
import DashboardCard from "@/components/ui/DashboardCard";
import MetricDotRow from "@/components/ui/MetricDotRow";
import BadgePill from "@/components/ui/BadgePill";
import ProgressCircle from "@/components/ui/ProgressCircle";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl  space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          <DashboardCard title="Attendance status" right={<span className="text-xs sm:text-sm text-gray-500">Attendance Rate</span>}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <BadgePill color="green">Checked In</BadgePill>
                  <span className="text-xs sm:text-sm text-gray-500">Since 08:30 AM</span>
                </div>
                <p className="text-sm text-gray-600">Excellent attendance!</p>
                <div className="flex flex-wrap items-center gap-2">
                  <button className="text-xs sm:text-sm px-3 py-1 rounded-md bg-blue-50 text-blue-700">View My Attendance</button>
                  <button className="text-xs sm:text-sm px-3 py-1 rounded-md bg-rose-50 text-rose-700">Check Out</button>
                </div>
              </div>
              <div className="self-start sm:self-auto">
                <ProgressCircle value={62} />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Monthly Overview" right={<span className="text-xs sm:text-sm text-gray-500">22 out of 23</span>}>
            <div className="space-y-3">
              <MetricDotRow color="bg-blue-600" label="Days Present" value="22" />
              <MetricDotRow color="bg-rose-500" label="Days Absent" value="1 of this month" />
              <MetricDotRow color="bg-emerald-500" label="Leave Balance" value="12 days" />
              <MetricDotRow color="bg-amber-400" label="Pending Tasks" value="5 Pending" />
            </div>
          </DashboardCard>

          <DashboardCard title="Working Hours" right={<span className="text-xs sm:text-sm text-gray-500">Today’s Hours</span>}>
            <div className="space-y-3">
              <MetricDotRow color="bg-rose-500" label="176.5 hrs" value="Total Hours" />
              <MetricDotRow color="bg-blue-600" label="8.02 hrs" value="Average Daily" />
              <MetricDotRow color="bg-emerald-500" label="5.5 hrs" value="Today's Hours" />
            </div>
          </DashboardCard>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            <DashboardCard title="Leave Summary" right={<span className="text-xs sm:text-sm text-gray-500">Annual leave allocation & usage</span>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <MetricDotRow color="bg-rose-500" label="30 days" value="Total" />
                  <MetricDotRow color="bg-blue-600" label="18 days" value="Used" />
                </div>
                <div className="space-y-2">
                  <MetricDotRow color="bg-rose-500" label="12 days" value="Left" />
                  <MetricDotRow color="bg-blue-600" label="0 days" value="Pending" />
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="My Applications">
              <div className="space-y-4">
                {[
                  { title: "Annual Leave", status: "Approved", color: "green", sub: "Dec 25 - 27, 2024  •  3 days" },
                  { title: "Sick Leave", status: "Pending", color: "amber", sub: "Jan 15, 2024  •  1 days" },
                  { title: "Sick Leave", status: "Pending", color: "rose", sub: "Jan 15, 2024  •  1 days" },
                ].map((i, idx) => (
                  <div key={idx} className="rounded-xl border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{i.title}</div>
                      <BadgePill color={i.color as any}>{i.status}</BadgePill>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{i.sub}</div>
                    <div className="text-[11px] text-gray-400 mt-1">Approved by : Sarah Johnson (HR Manager)</div>
                  </div>
                ))}
                <Button className="w-full bg-primary text-white text-sm py-2 rounded-xl">View All Activities</Button>
              </div>
            </DashboardCard>
          </div>

          {/* Middle column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <DashboardCard title="My Task">
              <div className="space-y-3">
                {[
                  { t: "Complete Q4 Sales Report", due: "Dec 22, 2024", p: "High", c: "rose" },
                  { t: "Complete Q4 Sales Report", due: "Dec 22, 2024", p: "Medium", c: "sky" },
                  { t: "Complete Q4 Sales Report", due: "Dec 22, 2024", p: "Low", c: "green" },
                  { t: "Complete Q4 Sales Report", due: "Dec 22, 2024", p: "Low", c: "green" },
                  { t: "Complete Q4 Sales Report", due: "Dec 22, 2024", p: "Low", c: "green" },
                ].map((it, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border p-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <span className="font-medium text-sm">{it.t}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Due : {it.due}</div>
                    </div>
                    <BadgePill color={it.c as any}>{it.p}</BadgePill>
                  </div>
                ))}

                <div className="grid grid-cols-3 text-center text-xs pt-2">
                  <div>
                    <div className="text-gray-400">Total</div>
                    <div className="font-semibold">5 tasks</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Pending</div>
                    <div className="font-semibold">2 tasks</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Completed</div>
                    <div className="font-semibold">1 tasks</div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Right column (Activity Log) — spans full width on small screens */}
          <div className="sm:col-span-2 lg:col-span-4">
            <DashboardCard title="Activity Log" right={<span className="text-xs sm:text-sm text-gray-500">Recent activities</span>}>
              <div className="space-y-3">
                {[
                  { icon: <LogIn className="w-4 h-4" />, title: "Checked In", meta: "Today  •  08:30 AM", badge: "Successfully", color: "green" },
                  { icon: <CheckCircle2 className="w-4 h-4" />, title: "Leave Application", meta: "Yesterday  •  04:15 PM", badge: "Approved", color: "green" },
                  { icon: <FileDown className="w-4 h-4" />, title: "ISO Certificate 2025", meta: "Yesterday  •  02:30 PM", badge: "Downloaded", color: "sky" },
                  { icon: <Printer className="w-4 h-4" />, title: "Cheque #CH-2945", meta: "2 days ago  •  11:20 AM", badge: "Printed", color: "green" },
                  { icon: <LogOut className="w-4 h-4" />, title: "Checked Out", meta: "2 days ago  •  11:20 AM", badge: "Successfully", color: "green" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 grid place-items-center text-gray-700">{a.icon}</div>
                      <div>
                        <div className="font-medium text-sm">{a.title}</div>
                        <div className="text-xs text-gray-500">{a.meta}</div>
                      </div>
                    </div>
                    <BadgePill color={a.color as any}>{a.badge}</BadgePill>
                  </div>
                ))}
                <Button className="w-full bg-primary text-white text-sm py-2 rounded-xl">View All Activities</Button>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
}