export type NetworkEquipmentData = {
	id?: number | string;
	createdAt?: string;
	updatedAt?: string;
	equipmentName: string;
	equipmentType?: string;
	ipAddress?: string;
	macAddress?: string;
	serialNumber?: string;
	numberOfPorts?: number;
	location?: string;
	purchaseDate?: string;
	warrantyExpiry?: string;
	firmwareVersion?: string;
	status?: string;
};

const API_BASE = "https://company-documnets.onrender.com/api/network-equipment";

async function handleResponse<T = any>(res: Response): Promise<T> {
	if (!res.ok) throw new Error(await res.text());
	return res.json();
}

// Normalize to { items, total }
export async function listNetworkEquipment(
	page = 1,
	perPage = 25
): Promise<{ items: NetworkEquipmentData[]; total: number }> {
	const url = `${API_BASE}?page=${page}&limit=${perPage}`;
	const json = await handleResponse<any>(await fetch(url));
	const items: NetworkEquipmentData[] = json?.data?.networkEquipments ?? [];
	const total: number = Number(
		json?.data?.pagination?.totalCount ?? items.length ?? 0
	);
	return { items, total };
}

export async function getNetworkEquipment(id: number | string) {
	const res = await fetch(`${API_BASE}/${id}`);
	return handleResponse<NetworkEquipmentData>(res);
}

export async function createNetworkEquipment(data: NetworkEquipmentData) {
	const res = await fetch(API_BASE, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return handleResponse<NetworkEquipmentData>(res);
}

export async function updateNetworkEquipment(
	id: number | string,
	data: Partial<NetworkEquipmentData>
) {
	const res = await fetch(`${API_BASE}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return handleResponse<NetworkEquipmentData>(res);
}

export async function deleteNetworkEquipment(id: number | string) {
	const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
	if (!res.ok) throw new Error(await res.text());
	return true;
}