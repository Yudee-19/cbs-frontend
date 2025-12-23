import axios, { type AxiosResponse } from "axios";

export type PayeeData = {
  _id?: string;
  id?: string;
  name: string;
  company: string;
  category: string;
  phone: string;
  email: string;
  address?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PayeeListResponse = {
  items: PayeeData[];
  total: number;
};

const API_BASE = "https://company-documnets.onrender.com/api/payees";

async function handleAxios<T = any>(p: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const res = await p;
    return res.data as T;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ??
      err?.response?.data ??
      err?.message ??
      "Request failed";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
}

/**
 * Get all payees with pagination
 */
export async function listPayees(
  page = 1,
  perPage = 100
): Promise<PayeeListResponse> {
  // API enforces limit <= 200
  const limit = Math.min(perPage, 200);
  const url = `${API_BASE}?page=${page}&limit=${limit}`;
  const json = await handleAxios<any>(axios.get(url));
  const items: PayeeData[] = json?.data?.payees ?? json?.data ?? [];
  const total: number = Number(
    json?.data?.pagination?.totalCount ?? items.length ?? 0
  );
  return { items, total };
}

/**
 * Get a single payee by ID
 */
export async function getPayee(id: string) {
  const json = await handleAxios<any>(axios.get(`${API_BASE}/${id}`));
  return json?.data ?? json;
}

/**
 * Create a new payee
 */
export async function createPayee(
  data: Omit<PayeeData, "_id" | "id" | "createdAt" | "updatedAt">
) {
  return handleAxios<PayeeData>(
    axios.post(API_BASE, data, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

/**
 * Update an existing payee
 */
export async function updatePayee(
  id: string,
  data: Partial<PayeeData>
) {
  return handleAxios<PayeeData>(
    axios.put(`${API_BASE}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

/**
 * Delete a payee
 */
export async function deletePayee(id: string) {
  try {
    await handleAxios(axios.delete(`${API_BASE}/${id}`));
    return true;
  } catch (err) {
    throw err;
  }
}
