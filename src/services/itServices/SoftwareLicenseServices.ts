

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

async function handleResponse<T = any>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Normalize to { items, total }
export async function listSoftware(page = 1, perPage = 25): Promise<{ items: SoftwareLicenseData[]; total: number; }> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleResponse<any>(await fetch(url));
  const items: SoftwareLicenseData[] = json?.data?.softwares ?? [];
  const total: number = Number(json?.data?.pagination?.totalCount ?? items.length ?? 0);
  return { items, total };
}

export async function getSoftware(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse<SoftwareLicenseData>(res);
}

export async function createSoftware(data: SoftwareLicenseData) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<SoftwareLicenseData>(res);
}

export async function updateSoftware(id: number | string, data: Partial<SoftwareLicenseData>) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<SoftwareLicenseData>(res);
}

export async function deleteSoftware(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return true;
}