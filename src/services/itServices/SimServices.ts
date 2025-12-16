import axios,  { type AxiosResponse } from "axios";

export type SimData = {
  id?: number | string;
  createdAt?: string;
  updatedAt?: string;
  simNumber: string;
  phoneNumber?: string;
  carrier?: string;
  planType?: string;
  monthlyFee?: number;
  currency?: string;
  extraCharges?: number;
  simCharges?: number;
  dataLimit?: string;
  activationDate?: string;
  expiryDate?: string;
  assignedTo?: string;
  department?: string;
  deviceImei?: string;
  status?: string;
  notes?: string;
};

const API_BASE = "https://company-documnets.onrender.com/api/sims";

async function handleAxios<T>(p: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const res = await p;
    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data
        ? typeof err.response.data === "string"
          ? err.response.data
          : JSON.stringify(err.response.data)
        : err?.message ?? String(err);
    throw new Error(msg);
  }
}

// Normalize to { items, total }
export async function listSims(
  page = 1,
  perPage = 25
): Promise<{ items: SimData[]; total: number }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { page, limit: perPage } })
  );
  const json = res;

  const items: SimData[] =
    json?.data?.sims ??
    [];

  const total: number = Number(
    json?.data?.pagination?.totalCount ?? json?.total ?? json?.count ?? items.length ?? 0
  );

  return { items, total };
}

export async function getSim(id: number | string) {
  return handleAxios<SimData>(axios.get(`${API_BASE}/${id}`));
}

export async function createSim(data: SimData) {
  return handleAxios<SimData>(
    axios.post(API_BASE, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function updateSim(id: number | string, data: Partial<SimData>) {
  return handleAxios<SimData>(
    axios.put(`${API_BASE}/${id}`, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function deleteSim(id: number | string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}