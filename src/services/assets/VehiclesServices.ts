import axios, { type AxiosResponse } from "axios";

export type VehicleData = {
  id?: number | string;
  createdAt?: string;
  updatedAt?: string;
  vehicleName: string;
  makeBrand?: string;
  vehicleModel?: string;
  vehicleType?: string;
  year?: number;
  color?: string;
  fuelType?: string;
  chassisNumber?: string;
  engineNumber?: string;
  plateNumber?: string;
  registrationExpiry?: string;
  insuranceProvider?: string;
  insuranceExpiry?: string;
  purchaseDate?: string;
  purchaseValue?: number | string;
  purchaseCurrency?: string;
  currentValue?: number | string;
  currentCurrency?: string;
  assignedTo?: string;
  department?: string;
  mileage?: number;
  lastService?: string;
  nextService?: string;
  status?: string;
  notes?: string;
};

const API_BASE = "https://company-documnets.onrender.com/api/vehicles";

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

export async function listVehicles(
  page = 1,
  perPage = 25
): Promise<{ items: VehicleData[]; total: number }> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleAxios<any>(axios.get(url));
  const items: VehicleData[] = json?.data?.vehicles ?? [];
  const total: number = Number(
    json?.data?.pagination?.totalCount ?? items.length ?? 0
  );
  return { items, total };
}

export async function getVehicle(id: number | string) {
  return handleAxios<VehicleData>(axios.get(`${API_BASE}/${id}`));
}

export async function createVehicle(data: VehicleData) {
  return handleAxios<VehicleData>(
    axios.post(API_BASE, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function updateVehicle(id: number | string, data: Partial<VehicleData>) {
  return handleAxios<VehicleData>(
    axios.put(`${API_BASE}/${id}`, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function deleteVehicle(id: number | string) {
  try {
    await handleAxios(axios.delete(`${API_BASE}/${id}`));
    return true;
  } catch (err) {
    throw err;
  }
}