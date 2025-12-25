import axios, { type AxiosResponse } from "axios";
import { API_URLS } from "@/constants/url-constants";

export type TelexTransferData = {
  _id?: string;
  id?: string;
  requestId?: string;
  transferDate: string;
  senderBank: string;
  senderBankName?: string;
  senderAccountNo: string;
  beneficiaryName: string;
  beneficiaryBankName: string;
  beneficiaryAccountNo: string;
  swiftCode?: string;
  branchAddress?: string;
  transferAmount: number;
  currency: string;
  purpose: string;
  authorizedBy?: string;
  status?: "Draft" | "Pending" | "Approved" | "Rejected";
  remarks?: string;
  attachments?: string[];
  activityLog?: Array<{
    action: string;
    user: string;
    timestamp: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
};

export type TelexTransferListResponse = {
  items: TelexTransferData[];
  total: number;
};

const API_BASE = API_URLS.BANKING.TELEX_TRANSFERS;

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
 * Get all telex transfers with pagination and optional sorting
 */
export async function listTelexTransfers(
  page = 1,
  perPage = 200,
  sortBy?: string
): Promise<TelexTransferListResponse> {
  let url = `${API_BASE}?page=${page}&limit=${perPage}`;
  if (sortBy) {
    url += `&sortBy=${sortBy}`;
  }
  const json = await handleAxios<any>(axios.get(url));
  const items: TelexTransferData[] = json?.data?.telexTransfers ?? json?.data ?? [];
  const total: number = Number(
    json?.data?.pagination?.totalCount ?? items.length ?? 0
  );
  return { items, total };
}

/**
 * Get a single telex transfer by ID
 */
export async function getTelexTransfer(id: string) {
  const json = await handleAxios<any>(axios.get(`${API_BASE}/${id}`));
  return json?.data ?? json;
}

/**
 * Create a new telex transfer
 */
export async function createTelexTransfer(
  data: Omit<TelexTransferData, "_id" | "id" | "createdAt" | "updatedAt">
) {
  return handleAxios<any>(
    axios.post(API_BASE, data, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

/**
 * Update an existing telex transfer
 */
export async function updateTelexTransfer(
  id: string,
  data: Partial<TelexTransferData>
) {
  return handleAxios<TelexTransferData>(
    axios.put(`${API_BASE}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

/**
 * Delete a telex transfer
 */
export async function deleteTelexTransfer(id: string) {
  try {
    await handleAxios(axios.delete(`${API_BASE}/${id}`));
    return true;
  } catch (err) {
    throw err;
  }
}
