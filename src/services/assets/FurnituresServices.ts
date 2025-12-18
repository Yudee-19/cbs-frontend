import axios, { type AxiosResponse } from "axios";

export type FurnitureData = {
  id?: number | string;
  createdAt?: string;
  updatedAt?: string;
  itemName: string;
  itemCode?: string;
  category?: string;
  quantity?: number;
  location?: string;
  condition?: string;
  material?: string;
  color?: string;
  dimensions?: string;
  supplier?: string;
  purchaseDate?: string;
  unitValue?: number | string;
  purchaseCurrency?: string;
  currentUnitValue?: number | string;
  currentCurrency?: string;
  warrantyExpiry?: string;
  status?: string;
  notes?: string;
};

const API_BASE = "https://company-documnets.onrender.com/api/furnitures";

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

export async function listFurnitures(
  page = 1,
  perPage = 25
): Promise<{ items: FurnitureData[]; total: number }> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleAxios<any>(axios.get(url));
  const items: FurnitureData[] = json?.data?.furnitures ?? json?.data?.furniture ?? [];
  const total: number = Number(json?.data?.pagination?.totalCount ?? items.length ?? 0);
  return { items, total };
}

export async function getFurniture(id: number | string) {
  return handleAxios<FurnitureData>(axios.get(`${API_BASE}/${id}`));
}

export async function createFurniture(data: FurnitureData) {
  return handleAxios<FurnitureData>(
    axios.post(API_BASE, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function updateFurniture(id: number | string, data: Partial<FurnitureData>) {
  return handleAxios<FurnitureData>(
    axios.put(`${API_BASE}/${id}`, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function deleteFurniture(id: number | string) {
  try {
    await handleAxios(axios.delete(`${API_BASE}/${id}`));
    return true;
  } catch (err) {
    throw err;
  }
}