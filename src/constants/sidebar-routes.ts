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
  },

  {
    id: "attendance",
    label: "My Attendance",
    icon: Clock,
    path: "/my-attendance",
  },

  {
    id: "leave-application",
    label: "Leave Application",
    icon: Calendar,
    path: "/leave-application",
  },

  // ---------------- BANKING ----------------
  {
    id: "banking",
    label: "Banking",
    icon: Wallet,
    children: [
      { id: "cheque", label: "Cheque Printing", icon: ReceiptText, path: "/banking/cheque-printing" },
      { id: "telex", label: "Telex Transfer", icon: FileText, path: "/banking/telex-transfer" },
      { id: "cashflow", label: "Cash Flow Forecast", icon: FileSpreadsheet, path: "/banking/cash-flow" },
      { id: "daily-balance", label: "Daily Bank Balance", icon: Landmark, path: "/banking/daily-bank-balance" },
      { id: "balance-sheet", label: "Balance Sheet", icon: Notebook, path: "/banking/balance-sheet" },
      { id: "pnl", label: "P&L Statement", icon: CheckSquare, path: "/banking/pnl-statement" },
    ],
  },

  // --------------- COMPANY DOCUMENTS ----------------
  {
    id: "company-docs",
    label: "Company Documents",
    icon: FileText,
    children: [
      { id: "license", label: "Licence", icon: FileText, path: "/docs/licence" },
      { id: "legal", label: "Legal Docs", icon: FileText, path: "/docs/legal-docs" },
      { id: "audit-docs", label: "Audit", icon: FileText, path: "/docs/audit" },
      { id: "iso", label: "ISO", icon: FileText, path: "/docs/iso" },
    ],
  },

  // ----------------- ASSETS --------------------
  {
    id: "assets",
    label: "Assets",
    icon: Building2,
    children: [
      { id: "land", label: "Land & Building", icon: Building2, path: "/assets/land-building" },
      { id: "vehicle", label: "Vehicle", icon: Car, path: "/assets/vehicle" },
      { id: "equipment", label: "Equipment", icon: Monitor, path: "/assets/equipment" },
      { id: "furniture", label: "Furniture", icon: Monitor, path: "/assets/furniture" },
    ],
  },

  // ----------------- IT --------------------
  {
    id: "it",
    label: "IT",
    icon: Monitor,
    children: [
      { id: "it-hardware", label: "Hardware", icon: Monitor, path: "/it/hardware" },
      { id: "software-license", label: "Software License", icon: FileText, path: "/it/software-license" },
      { id: "network", label: "Network Equipment", icon: Network, path: "/it/network-equipment" },
      { id: "support", label: "IT Support", icon: Headphones, path: "/it/support" },
      { id: "sim", label: "SIM Management", icon: CardSim , path: "/it/sim-management" },
      { id: "hardware-transfer", label: "Hardware Transfer", icon: ArrowLeftRight, path: "/it/hardware-transfer" },
    ],
  },
];
