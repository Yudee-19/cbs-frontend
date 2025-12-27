import {
  LayoutDashboard,
  Calendar,
  Clock,
  FileText,
  ReceiptText,
  FileSpreadsheet,
  Landmark,
  Wallet,
  Notebook,
  CheckSquare,
  Car,
  Building2,
  Monitor,
  Network,
  Headphones,
  CardSim,
  ArrowLeftRight
} from "lucide-react";

export interface MenuItem {
  id: string;
  path?: string;
  label: string;
  icon?: any;
  children?: MenuItem[];
  badge?: number | (() => number);
  title?: string;
  subtitle?: string;
  active?: boolean;
  allowedRoles?: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    title: "Dashboard",
  },

  {
    id: "attendance",
    label: "My Attendance",
    icon: Clock,
    path: "/my-attendance",
    title: "My Attendance",
    subtitle:"user/Attendance Management"
  },

  {
    id: "leave-application",
    label: "Leave Application",
    icon: Calendar,
    path: "/leave-application",
    title: "Leave Application",
    subtitle:"user/Leave Application"
  },

  // ---------------- BANKING ----------------
  {
    id: "banking",
    label: "Banking",
    icon: Wallet,
    children: [
      { id: "cheque", label: "Cheque Printing", icon: ReceiptText, path: "/banking/cheque-printing" , title: "Banking", subtitle:"user/Banking/Cheque Printing"},
      { id: "telex", label: "Telex Transfer", icon: FileText, path: "/banking/telex-transfer" ,title: "Banking", subtitle:"user/Banking/Telex Transfer" },
      { id: "cashflow", label: "Cash Flow Forecast", icon: FileSpreadsheet, path: "/banking/cash-flow-forecast", title: "Banking", subtitle:"user/Banking/Cash Flow Forecast" },
      { id: "daily-balance", label: "Daily Bank Balance", icon: Landmark, path: "/banking/daily-bank-balance",title: "Banking", subtitle:"user/Banking/Daily Bank Balance" },
      { id: "balance-sheet", label: "Balance Sheet", icon: Notebook, path: "/banking/balance-sheet", title: "Banking", subtitle:"user/Banking/Balance Sheet" },
      { id: "pnl", label: "P&L Statement", icon: CheckSquare, path: "/banking/pnl-statement", title: "Banking", subtitle:"user/Banking/P&L Statement" },
    ],
  },

  // --------------- COMPANY DOCUMENTS ----------------
  {
    id: "company-docs",
    label: "Company Documents",
    icon: FileText,
    children: [
      { id: "license", label: "Licence", icon: FileText, path: "/docs/licence" , title: "Company Documents", subtitle:"user/Company Documents/Licence" },
      { id: "legal", label: "Legal Docs", icon: FileText, path: "/docs/legal-docs",title: "Company Documents", subtitle:"user/Company Documents/Legal Docs" },
      { id: "audit-docs", label: "Audit", icon: FileText, path: "/docs/audit", title: "Company Documents", subtitle:"user/Company Documents/Audit" },
      { id: "iso", label: "ISO", icon: FileText, path: "/docs/iso", title: "Company Documents", subtitle:"user/Company Documents/ISO" },
    ],
  },

  // ----------------- ASSETS --------------------
  {
    id: "assets",
    label: "Assets",
    icon: Building2,
    children: [
      { id: "land", label: "Land & Building", icon: Building2, path: "/assets/land-building" , title: "Assets", subtitle:"user/Assets/Land & Building" },
      { id: "vehicle", label: "Vehicle", icon: Car, path: "/assets/vehicle", title: "Assets", subtitle:"user/Assets/Vehicle" },
      { id: "equipment", label: "Equipment", icon: Monitor, path: "/assets/equipment", title: "Assets", subtitle:"user/Assets/Equipment" },
      { id: "furniture", label: "Furniture", icon: Monitor, path: "/assets/furniture", title: "Assets", subtitle:"user/Assets/Furniture" },
    ],
  },

  // ----------------- IT --------------------
  {
    id: "it",
    label: "IT",
    icon: Monitor,
    children: [
      { id: "it-hardware", label: "Hardware", icon: Monitor, path: "/it/hardware" , title: "IT", subtitle:"user/IT/Hardware" },
      { id: "software-license", label: "Software License", icon: FileText, path: "/it/software-license", title: "IT", subtitle:"user/IT/Software License" },
      { id: "network", label: "Network Equipment", icon: Network, path: "/it/network-equipment", title: "IT", subtitle:"user/IT/Network Equipment" },
      { id: "support", label: "IT Support", icon: Headphones, path: "/it/support", title: "IT", subtitle:"user/IT/Support" },
      { id: "sim", label: "SIM Management", icon: CardSim , path: "/it/sim-management", title: "IT", subtitle:"user/IT/SIM Management" },
      { id: "hardware-transfer", label: "Hardware Transfer", icon: ArrowLeftRight, path: "/it/hardware-transfer", title: "IT", subtitle:"user/IT/Hardware Transfer" },
    ],
  },
];
