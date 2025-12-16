import axios ,{ type AxiosResponse } from 'axios';

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

async function handleAxios<T>(p: Promise<AxiosResponse<T>>): Promise<T> {
    try {
        const res = await p;
        return res.data;
    } catch (err: any) {
        const msg =
            err?.response?.data
                ? typeof err.response.data === "string"
                    ? err.response.data
                    : JSON.stringify(err.response.data)
                : err?.message ?? String(err);
        throw new Error(msg);
    }
}

// Normalize to { items, total }
export async function listNetworkEquipment(
	page = 1,
	perPage = 25
): Promise<{ items: NetworkEquipmentData[]; total: number }> {
	const res = await handleAxios<any>(
		axios.get(API_BASE, { params: { page, limit: perPage } })
	);
	const json = res;

	const items: NetworkEquipmentData[] =
		json?.data?.networkEquipments ??
		[];

	const total: number = Number(
		json?.data?.pagination?.totalCount ?? json?.total ?? json?.count ?? items.length ?? 0
	);

	return { items, total };
}

export async function getNetworkEquipment(id: number | string) {
	return handleAxios<NetworkEquipmentData>(axios.get(`${API_BASE}/${id}`));
}

export async function createNetworkEquipment(data: NetworkEquipmentData) {
	return handleAxios<NetworkEquipmentData>(
		axios.post(API_BASE, data, { headers: { "Content-Type": "application/json" } })
	);
}

export async function updateNetworkEquipment(
	id: number | string,
	data: Partial<NetworkEquipmentData>
) {
	return handleAxios<NetworkEquipmentData>(
		axios.put(`${API_BASE}/${id}`, data, { headers: { "Content-Type": "application/json" } })
	);
}

export async function deleteNetworkEquipment(id: number | string) {
	await handleAxios(axios.delete(`${API_BASE}/${id}`));
	return true;
}