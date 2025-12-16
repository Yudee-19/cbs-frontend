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

async function handleResponse<T = any>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function listFurnitures(
  page = 1,
  perPage = 25
): Promise<{ items: FurnitureData[]; total: number }> {
  const url = `${API_BASE}?page=${page}&limit=${perPage}`;
  const json = await handleResponse<any>(await fetch(url));
  const items: FurnitureData[] = json?.data?.furnitures ?? json?.data?.furniture ?? [];
  const total: number = Number(json?.data?.pagination?.totalCount ?? items.length ?? 0);
  return { items, total };
}

export async function getFurniture(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse<FurnitureData>(res);
}

export async function createFurniture(data: FurnitureData) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<FurnitureData>(res);
}

export async function updateFurniture(id: number | string, data: Partial<FurnitureData>) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<FurnitureData>(res);
}

export async function deleteFurniture(id: number | string) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return true;
}