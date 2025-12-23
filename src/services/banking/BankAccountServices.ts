import axios, { type AxiosResponse } from "axios";

export type BankAccountData = {
  _id?: string;
  id?: string;
  bankName: string;
  branch: string;
  accountHolder: string;
  accountNumber: string;
  currency: string;
  currentChequeNumber: string;
  address?: string;
  fileKey?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BankAccountListResponse = {
  items: BankAccountData[];
  total: number;
};

const API_BASE = "https://company-documnets.onrender.com/api/bank-accounts";

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
 * Get all bank accounts with pagination
 */
export async function listBankAccounts(
  page = 1,
  perPage = 100
): Promise<BankAccountListResponse> {
  // API enforces limit <= 200
  const limit = Math.min(perPage, 200);
  const url = `${API_BASE}?page=${page}&limit=${limit}`;
  const json = await handleAxios<any>(axios.get(url));
  const items: BankAccountData[] = json?.data?.bankAccounts ?? json?.data ?? [];
  const total: number = Number(
    json?.data?.pagination?.totalCount ?? items.length ?? 0
  );
  return { items, total };
}

/**
 * Get a single bank account by ID
 */
export async function getBankAccount(id: string) {
  const json = await handleAxios<any>(axios.get(`${API_BASE}/${id}`));
  return json?.data ?? json;
}

/**
 * Create a new bank account
 */
export async function createBankAccount(
  data: Omit<BankAccountData, "_id" | "id" | "createdAt" | "updatedAt">
) {
  return handleAxios<BankAccountData>(
    axios.post(API_BASE, data, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

/**
 * Update an existing bank account
 */
export async function updateBankAccount(
  id: string,
  data: Partial<BankAccountData>
) {
  return handleAxios<BankAccountData>(
    axios.put(`${API_BASE}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

/**
 * Delete a bank account
 */
export async function deleteBankAccount(id: string) {
  try {
    await handleAxios(axios.delete(`${API_BASE}/${id}`));
    return true;
  } catch (err) {
    throw err;
  }
}
