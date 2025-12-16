import axios,  { type AxiosResponse } from 'axios';

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

async function handleAxios<T>(p: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const res = await p;
    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data
        ? typeof err.response.data === 'string'
          ? err.response.data
          : JSON.stringify(err.response.data)
        : err?.message ?? String(err);
    throw new Error(msg);
  }
}

// Normalized list -> { items, total }
export async function listHardware(
  page = 1,
  perPage = 25
): Promise<{ items: Hardware[]; total: number }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { page, limit: perPage } })
  );
  const json = res;

  const items: Hardware[] =
    json?.data?.newHardwares ??
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
  return handleAxios<Hardware>(axios.get(`${API_BASE}/${id}`));
}

export async function createHardware(payload: HardwareData) {
  return handleAxios<Hardware>(axios.post(API_BASE, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function updateHardware(id: string, payload: Partial<HardwareData>) {
  return handleAxios<Hardware>(axios.put(`${API_BASE}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function deleteHardware(id: string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}

// Optional aliases if other code references old names
export const getHardwareById = getHardware;
export const updateHardwareById = updateHardware;