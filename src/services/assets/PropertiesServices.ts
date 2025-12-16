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

async function handleResponse<T = any>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Normalize to { items, total }
export async function listProperties(
  page = 1,
  perPage = 25
): Promise<{ items: PropertyData[]; total: number }> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleResponse<any>(await fetch(url));
  const items: PropertyData[] = json?.data?.properties ?? [];
  const total: number = Number(json?.data?.pagination?.totalCount ?? items.length ?? 0);
  return { items, total };
}

export async function getProperty(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse<PropertyData>(res);
}

export async function createProperty(data: PropertyData) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<PropertyData>(res);
}

export async function updateProperty(id: number | string, data: Partial<PropertyData>) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<PropertyData>(res);
}

export async function deleteProperty(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return true;
}
