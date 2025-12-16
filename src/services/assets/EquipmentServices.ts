export type EquipmentData = {
  id?: number | string;
  createdAt?: string;
  updatedAt?: string;
  equipmentName: string;
  category?: string;
  manufacturer?: string;
  equipmentModel?: string;
  serialNumber?: string;
  condition?: string;
  location?: string;
  assignedTo?: string;
  purchaseDate?: string;
  purchaseValue?: number | string;
  purchaseCurrency?: string;
  currentValue?: number | string;
  currentCurrency?: string;
  warrantyProvider?: string;
  warrantyExpiry?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  maintenanceContract?: string;
  status?: string;
  technicalSpecifications?: string;
};

const API_BASE = "https://company-documnets.onrender.com/api/equipment";

async function handleResponse<T = any>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Normalize to { items, total }
export async function listEquipment(
  page = 1,
  perPage = 25
): Promise<{ items: EquipmentData[]; total: number }> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleResponse<any>(await fetch(url));
  const items: EquipmentData[] = json?.data?.equipments ?? json?.data?.equipment ?? [];
  const total: number = Number(json?.data?.pagination?.totalCount ?? items.length ?? 0);
  return { items, total };
}

export async function getEquipment(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse<EquipmentData>(res);
}

export async function createEquipment(data: EquipmentData) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<EquipmentData>(res);
}

export async function updateEquipment(id: number | string, data: Partial<EquipmentData>) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<EquipmentData>(res);
}

export async function deleteEquipment(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return true;
}