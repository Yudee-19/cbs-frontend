import axios, { type AxiosResponse } from 'axios';

export interface IsoData {
  certificateName: string;
  isoStandard: string;
  issueDate: string;    // ISO
  expiryDate: string;   // ISO
  certifyingBody: string;
  fileKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Iso extends IsoData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = "https://company-documnets.onrender.com/api/iso";

async function handleAxios<T>(p: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const res = await p;
    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data
        ? typeof err.response.data === 'string'
          ? err.response.data
          : JSON.stringify(err.response.data)
        : err?.message ?? String(err);
    throw new Error(msg);
  }
}

export async function listIsos(
  page = 1,
  perPage = 25
): Promise<{ items: Iso[]; total: number }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { page, limit: perPage } })
  );
  const json = res;

  const items: Iso[] =
    Array.isArray(json?.data?.isos) ? json.data.isos :
    Array.isArray(json?.isos) ? json.isos :
    Array.isArray(json?.data) ? json.data :
    [];

  const total: number = Number(
    json?.data?.pagination?.totalCount ??
      json?.total ??
      json?.count ??
      (Array.isArray(items) ? items.length : 0)
  );

  return { items, total };
}

export async function getIso(id: string) {
  return handleAxios<Iso>(axios.get(`${API_BASE}/${id}`));
}

export async function createIso(payload: IsoData) {
  return handleAxios<Iso>(axios.post(API_BASE, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function updateIso(id: string, payload: Partial<IsoData>) {
  return handleAxios<Iso>(axios.put(`${API_BASE}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function deleteIso(id: string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}

export const getIsoById = getIso;
export const updateIsoById = updateIso;