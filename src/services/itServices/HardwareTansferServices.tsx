import axios,  { type AxiosResponse } from "axios";

export type HardwareTransferData = {
  id?: number | string;
  createdAt?: string;
  updatedAt?: string;
  hardwareName: string;
  serialNumber?: string;
  fromUser?: string;
  toUser?: string;
  transferDate?: string;
  expectedReturnDate?: string;
  transferType?: string;
  hardwareCondition?: string;
  transferReason?: string;
  approvedBy?: string;
  additionalNotes?: string;
  status?: string;
};

const API_BASE = "https://company-documnets.onrender.com/api/hardware-transfer";

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
export async function listHardwareTransfers(
  page = 1,
  perPage = 25
): Promise<{ items: HardwareTransferData[]; total: number }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { page, limit: perPage } })
  );
  const json = res;

  const items: HardwareTransferData[] =
    json?.data?.hardwareTransfers ??
    [];

  const total: number = Number(
    json?.data?.pagination?.totalCount ?? json?.total ?? json?.count ?? items.length ?? 0
  );

  return { items, total };
}

export async function getHardwareTransfer(id: number | string) {
  return handleAxios<HardwareTransferData>(axios.get(`${API_BASE}/${id}`));
}

export async function createHardwareTransfer(data: HardwareTransferData) {
  return handleAxios<HardwareTransferData>(
    axios.post(API_BASE, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function updateHardwareTransfer(
  id: number | string,
  data: Partial<HardwareTransferData>
) {
  return handleAxios<HardwareTransferData>(
    axios.put(`${API_BASE}/${id}`, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function deleteHardwareTransfer(id: number | string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}