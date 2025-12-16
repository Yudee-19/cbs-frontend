import axios,  {type AxiosResponse } from "axios";

export type SoftwareLicenseData = {
  id?: number | string;
  name: string;
  vendor?: string;
  licenseType?: string;
  licenseKey?: string;
  totalSeats?: number;
  seatsUsed?: number;
  purchaseDate?: string;
  expiryDate?: string;
  renewalCost?: string;
  assignedDepartment?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = "https://company-documnets.onrender.com/api/software";

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
export async function listSoftware(page = 1, perPage = 25): Promise<{ items: SoftwareLicenseData[]; total: number; }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { page, limit: perPage } })
  );
  const json = res;

  const items: SoftwareLicenseData[] =
    json?.data?.softwares ??
    [];

  const total: number = Number(
    json?.data?.pagination?.totalCount ?? json?.total ?? json?.count ?? items.length ?? 0
  );

  return { items, total };
}

export async function getSoftware(id: number | string) {
  return handleAxios<SoftwareLicenseData>(axios.get(`${API_BASE}/${id}`));
}

export async function createSoftware(data: SoftwareLicenseData) {
  return handleAxios<SoftwareLicenseData>(
    axios.post(API_BASE, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function updateSoftware(id: number | string, data: Partial<SoftwareLicenseData>) {
  return handleAxios<SoftwareLicenseData>(
    axios.put(`${API_BASE}/${id}`, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function deleteSoftware(id: number | string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}