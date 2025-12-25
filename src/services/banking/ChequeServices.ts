import axios, { type AxiosResponse } from "axios";

export type ChequeData = {
  _id?: string;
  id?: string;
  bankAccount: string;
  payeeName: string;
  amount: number;
  chequeDate: string;
  address?: string;
  printStatus?: "Printed" | "Not Printed";
  transactionStatus?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ChequeListResponse = {
  items: ChequeData[];
  total: number;
};

const API_BASE = "https://company-documnets.onrender.com/api/cheques";

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
 * Get all cheques with pagination
 */
export async function listCheques(
  page = 1,
  perPage = 25
): Promise<ChequeListResponse> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleAxios<any>(axios.get(url));
  const items: ChequeData[] = json?.data?.cheques ?? json?.data ?? [];
  const total: number = Number(
    json?.data?.pagination?.totalCount ?? items.length ?? 0
  );
  return { items, total };
}

/**
 * Get a single cheque by ID
 */
export async function getCheque(id: string) {
  const json = await handleAxios<any>(axios.get(`${API_BASE}/${id}`));
  return json?.data ?? json;
}

/**
 * Create a new cheque
 */
export async function createCheque(data: Omit<ChequeData, "_id" | "id" | "createdAt" | "updatedAt">) {
  return handleAxios<ChequeData>(
    axios.post(API_BASE, data, { 
      headers: { "Content-Type": "application/json" } 
    })
  );
}

/**
 * Update an existing cheque
 */
export async function updateCheque(
  id: string, 
  data: Partial<ChequeData>
) {
  return handleAxios<ChequeData>(
    axios.put(`${API_BASE}/${id}`, data, { 
      headers: { "Content-Type": "application/json" } 
    })
  );
}

/**
 * Delete a cheque
 */
export async function deleteCheque(id: string) {
  try {
    await handleAxios(axios.delete(`${API_BASE}/${id}`));
    return true;
  } catch (err) {
    throw err;
  }
}

/**
 * Update cheque print status
 */
export async function updateChequePrintStatus(
  id: string, 
  printStatus: "Printed" | "Not Printed"
) {
  return updateCheque(id, { printStatus });
}
