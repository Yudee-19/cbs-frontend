import axios, { type AxiosResponse } from "axios";

export type PropertyData = {
  id?: number | string;
  createdAt?: string;
  updatedAt?: string;
  propertyName: string;
  propertyType?: string;
  location?: string;
  area?: number;
  unit?: string;
  propertyUsage?: string;
  numberOfFloors?: number;
  ownershipType?: string;
  titleDeedNumber?: string;
  purchaseDate?: string;
  purchaseValue?: number | string;
  purchaseCurrency?: string;
  currentValue?: number | string;
  currentCurrency?: string;
  annualMaintenanceCost?: number;
  insuranceExpiryDate?: string;
  status?: string;
};

const API_BASE = "https://company-documnets.onrender.com/api/properties";

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

// Normalize to { items, total }
export async function listProperties(
  page = 1,
  perPage = 25
): Promise<{ items: PropertyData[]; total: number }> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleAxios<any>(axios.get(url));
  const items: PropertyData[] = json?.data?.properties ?? [];
  const total: number = Number(
    json?.data?.pagination?.totalCount ?? items.length ?? 0
  );
  return { items, total };
}

export async function getProperty(id: number | string) {
  return handleAxios<PropertyData>(axios.get(`${API_BASE}/${id}`));
}

export async function createProperty(data: PropertyData) {
  return handleAxios<PropertyData>(axios.post(API_BASE, data, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function updateProperty(
  id: number | string,
  data: Partial<PropertyData>
) {
  return handleAxios<PropertyData>(
    axios.put(`${API_BASE}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

export async function deleteProperty(id: number | string) {
  try {
    await handleAxios(axios.delete(`${API_BASE}/${id}`));
    return true;
  } catch (err) {
    throw err;
  }
}
