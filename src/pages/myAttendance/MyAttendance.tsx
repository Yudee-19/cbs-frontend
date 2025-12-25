import { useEffect, useState } from "react";
import MyAttendanceTable from "./MyAttendanceTable";

type Stats = {
  totalDays: number;
  present: number;
  absent: number;
  leave: number;
  lateDays: number;
  avgHours: number;
  totalHours: number;
};

export const attendanceDummyData = [
  {
    id: 1,
    date: "2025-11-12",
    checkIn: "08:45:23",
    checkOut: "17:30:12",
    hoursWorked: "8.75",
    status: "Present",
  },
  {
    id: 2,
    date: "2025-11-11",
    checkIn: "09:10:00",
    checkOut: "17:20:00",
    hoursWorked: "8.10",
    status: "Late",
  },
  {
    id: 3,
    date: "2025-11-10",
    checkIn: "08:40:10",
    checkOut: "17:25:45",
    hoursWorked: "8.75",
    status: "Present",
  },
  {
    id: 4,
    date: "2025-11-09",
    checkIn: "-",
    checkOut: "-",
    hoursWorked: "-",
    status: "Leave",
  },
  {
    id: 5,
    date: "2025-11-08",
    checkIn: "08:50:30",
    checkOut: "17:15:00",
    hoursWorked: "8.40",
    status: "Present",
  },
  {
    id: 6,
    date: "2025-11-07",
    checkIn: "09:05:12",
    checkOut: "17:10:18",
    hoursWorked: "8.05",
    status: "Late",
  },
  {
    id: 7,
    date: "2025-11-06",
    checkIn: "08:42:00",
    checkOut: "17:32:10",
    hoursWorked: "8.83",
    status: "Present",
  },
  {
    id: 8,
    date: "2025-11-05",
    checkIn: "-",
    checkOut: "-",
    hoursWorked: "-",
    status: "Leave",
  },
  {
    id: 9,
    date: "2025-11-04",
    checkIn: "08:48:55",
    checkOut: "17:22:30",
    hoursWorked: "8.55",
    status: "Present",
  },
  {
    id: 10,
    date: "2025-11-03",
    checkIn: "09:00:00",
    checkOut: "17:00:00",
    hoursWorked: "8.00",
    status: "Late",
  },
];

export default function MyAttendance() {
  const [now, setNow] = useState(new Date());
  const [checkedIn, setCheckedIn] = useState(false);
  const [status, setStatus] = useState("Not Marked");
  const [connected] = useState(true);
  const [stats] = useState<Stats>({
    totalDays: 22,
    present: 18,
    absent: 0,
    leave: 2,
    lateDays: 2,
    avgHours: 8.5,
    totalHours: 144.0,
  });

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleCheckIn = () => {
    setCheckedIn(true);
    setStatus("Checked In");
  };

  const handleCheckOut = () => {
    if (!checkedIn) {
      // small UI hint instead of alert on desktop — keep alert for fallback
      alert("Please check in first.");
      return;
    }
    setCheckedIn(false);
    setStatus("Checked Out");
  };

  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = now.toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className=" mx-auto">
        {/* Top summary row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col">
            <span className="text-xs text-gray-500">Today's Date</span>
            <span className="mt-2 font-semibold text-sm">{formattedDate}</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col">
            <span className="text-xs text-gray-500">Current Time</span>
            <span className="mt-2 font-semibold text-sm">{formattedTime}</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col">
            <span className="text-xs text-gray-500">Status</span>
            <span className="mt-2 font-semibold text-sm inline-flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  status === "Checked In" ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              {status}
            </span>
          </div>

          <div
            className={`rounded-2xl p-4 flex items-center justify-between shadow-sm lg:col-span-2 ${
              connected ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div>
              <span className="text-xs text-gray-500">Connected To Company Network</span>
              <div className="mt-1 text-sm font-medium text-gray-700">
                {connected ? "You are authorized to mark attendance" : "Network disconnected"}
              </div>
            </div>
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full ${
                connected ? "bg-green-200" : "bg-red-200"
              } text-green-800`}
            >
              {connected ? "✓" : "!"}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column: Check in/out */}
          <div className="lg:col-span-6 space-y-4">
            {/* Check In */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Check In</h3>
                  <p className="text-sm text-gray-500">Click button to mark your arrival</p>
                </div>

                <button
                  onClick={handleCheckIn}
                  disabled={checkedIn}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-shadow ${
                    checkedIn
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed shadow-inner"
                      : "bg-emerald-500 text-white shadow hover:shadow-md"
                  }`}
                >
                  {checkedIn ? "Checked In" : "Check In Now"}
                </button>
              </div>
            </div>

            {/* Check Out */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Check Out</h3>
                  <p className="text-sm text-gray-500">Click button to mark your departure</p>
                </div>

                <div className="flex items-center gap-3">
                  {!checkedIn && (
                    <span className="text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Must check in first</span>
                  )}
                  <button
                    onClick={handleCheckOut}
                    className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-sm transition ${
                      !checkedIn ? "bg-rose-100 text-rose-700" : "bg-rose-500 text-white hover:shadow-md"
                    }`}
                  >
                    Check Out Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Monthly stats */}
          <div className="bg-white rounded-2xl shadow px-6 py-2 border-2 border-sky-200 lg:col-span-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">November 2025</h3>
                <button className="text-xs text-gray-500">▼</button>
              </div>
              <span className="text-sm text-gray-500">Monthly Statistics</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <div className="space-y-1">
                <StatRow color="bg-blue-600" label="Total Days" value={`${stats.totalDays} Days`} />
                <StatRow color="bg-rose-500" label="Present" value={`${stats.present} Days`} />
                <StatRow color="bg-gray-300" label="Absent" value={`${stats.absent} Days`} />
                <StatRow color="bg-pink-300" label="Leave" value={`${stats.leave} Days`} />
              </div>

              <div className="space-y-1">
                <div>
                  <div className="text-xs text-gray-500">Late</div>
                  <div className="font-medium">{stats.lateDays} Days</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Avg Hours</div>
                  <div className="font-medium">{stats.avgHours} Hours</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Total HRS</div>
                  <div className="font-medium">{stats.totalHours} Hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance history table */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Attendance History - Last 8 Days</h3>
            <MyAttendanceTable attendanceRecords={attendanceDummyData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// small presentational helper component inside the same file
function StatRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}