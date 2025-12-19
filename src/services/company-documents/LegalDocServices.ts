import axios, { type AxiosResponse } from 'axios';

export interface LegalDocData {
  name: string;
  category: string;
  documentDate: string;    // ISO
  partiesInvolved: string;
  fileKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LegalDoc extends LegalDocData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = "https://company-documnets.onrender.com/api/documents";

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

export async function listDocuments(
  page = 1,
  perPage = 25
): Promise<{ items: LegalDoc[]; total: number }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { page, limit: perPage } })
  );
  const json = res;

  const items: LegalDoc[] =
    Array.isArray(json?.data?.documents) ? json.data.documents :
    Array.isArray(json?.documents) ? json.documents :
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

export async function getDocument(id: string) {
  return handleAxios<LegalDoc>(axios.get(`${API_BASE}/${id}`));
}

export async function createDocument(payload: LegalDocData) {
  return handleAxios<LegalDoc>(axios.post(API_BASE, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function updateDocument(id: string, payload: Partial<LegalDocData>) {
  return handleAxios<LegalDoc>(axios.put(`${API_BASE}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function deleteDocument(id: string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}

export const getDocumentById = getDocument;
export const updateDocumentById = updateDocument;