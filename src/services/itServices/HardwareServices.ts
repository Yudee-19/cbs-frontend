// import {API_URLS} from '@/constants/url-constants';
// import axios from 'axios';

export interface HardwareData {
  deviceName: string;
  type: string;
  serialNumber: string;
  operatingSystem: string;
  status: string;
  processor: string;
  ram: string;
  storage: string;
  purchaseDate: string;     // ISO
  warrantyExpiry: string;   // ISO
  assignedTo: string;
  department: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Hardware extends HardwareData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = "https://company-documnets.onrender.com/api/new-hardware";

async function handleResponse<T = any>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Normalized list -> { items, total }
export async function listHardware(
  page = 1,
  perPage = 25
): Promise<{ items: Hardware[]; total: number }> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleResponse<any>(await fetch(url));

  const items: Hardware[] =
    json?.data?.newHardwares ?? // backend shape per your sample
    json?.data?.hardwares ??
    json?.data?.hardware ??
    json?.data?.items ??
    json?.items ??
    (Array.isArray(json?.data) ? json.data : []) ??
    [];

  const total: number = Number(
    json?.data?.pagination?.totalCount ??
      json?.total ??
      json?.count ??
      items.length ??
      0
  );

  return { items, total };
}

export async function getHardware(id: string) {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse<Hardware>(res);
}

export async function createHardware(payload: HardwareData) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Hardware>(res);
}

export async function updateHardware(id: string, payload: Partial<HardwareData>) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Hardware>(res);
}

export async function deleteHardware(id: string) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return true;
}

// Optional aliases if other code references old names
export const getHardwareById = getHardware;
export const updateHardwareById = updateHardware;