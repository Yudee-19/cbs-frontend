import axios, { type AxiosResponse } from "axios";

export type ForecastData = {
  _id?: string;
  id?: string;
  date: string;
  type: "Inflow" | "Outflow";
  category: string;
  description: string;
  amount: number;
  currency: string;
  bankAccount: string;
  status: "Planned" | "Confirmed";
  createdAt?: string;
  updatedAt?: string;
};

export type ForecastListResponse = {
  items: ForecastData[];
  total: number;
};

const API_BASE = "https://company-documnets.onrender.com/api/forecasts";

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
 * Get all forecasts with pagination
 */
export async function listForecasts(
  page = 1,
  perPage = 25
): Promise<ForecastListResponse> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleAxios<any>(axios.get(url));
  const items: ForecastData[] = json?.data?.forecasts ?? json?.data ?? [];
  const total: number = Number(
    json?.data?.pagination?.totalCount ?? items.length ?? 0
  );
  return { items, total };
}

/**
 * Get a single forecast by ID
 */
export async function getForecast(id: string): Promise<ForecastData> {
  const url = `${API_BASE}/${id}`;
  const json = await handleAxios<any>(axios.get(url));
  return json?.data ?? json;
}

/**
 * Create a new forecast
 */
export async function createForecast(
  data: Omit<ForecastData, "_id" | "id" | "createdAt" | "updatedAt">
): Promise<ForecastData> {
  const json = await handleAxios<any>(axios.post(API_BASE, data));
  return json?.data ?? json;
}

/**
 * Update an existing forecast
 */
export async function updateForecast(
  id: string,
  data: Partial<ForecastData>
): Promise<ForecastData> {
  const url = `${API_BASE}/${id}`;
  const json = await handleAxios<any>(axios.put(url, data));
  return json?.data ?? json;
}

/**
 * Delete a forecast
 */
export async function deleteForecast(id: string): Promise<void> {
  const url = `${API_BASE}/${id}`;
  await handleAxios<any>(axios.delete(url));
}
