import axios, { type AxiosResponse } from 'axios';

export interface AuditData {
  name: string;
  type: string;
  periodStart: string;    // ISO
  periodEnd: string;      // ISO
  auditor: string;
  completionDate?: string; // ISO
  fileKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Audit extends AuditData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = "https://company-documnets.onrender.com/api/audits";

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

export async function listAudits(
  page = 1,
  perPage = 25
): Promise<{ items: Audit[]; total: number }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { page, limit: perPage } })
  );
  const json = res;

  const items: Audit[] =
    Array.isArray(json?.data?.audits) ? json.data.audits :
    Array.isArray(json?.audits) ? json.audits :
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

export async function getAudit(id: string) {
  return handleAxios<Audit>(axios.get(`${API_BASE}/${id}`));
}

export async function createAudit(payload: AuditData) {
  return handleAxios<Audit>(axios.post(API_BASE, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function updateAudit(id: string, payload: Partial<AuditData>) {
  return handleAxios<Audit>(axios.put(`${API_BASE}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function deleteAudit(id: string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}

export const getAuditById = getAudit;
export const updateAuditById = updateAudit;