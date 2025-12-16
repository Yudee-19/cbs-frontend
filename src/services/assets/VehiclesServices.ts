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

async function handleResponse<T = any>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function listVehicles(
  page = 1,
  perPage = 25
): Promise<{ items: VehicleData[]; total: number }> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleResponse<any>(await fetch(url));
  const items: VehicleData[] = json?.data?.vehicles ?? [];
  const total: number = Number(
    json?.data?.pagination?.totalCount ?? items.length ?? 0
  );
  return { items, total };
}

export async function getVehicle(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse<VehicleData>(res);
}

export async function createVehicle(data: VehicleData) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<VehicleData>(res);
}

export async function updateVehicle(id: number | string, data: Partial<VehicleData>) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<VehicleData>(res);
}

export async function deleteVehicle(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return true;
}