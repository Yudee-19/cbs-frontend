import axios, { type AxiosResponse } from 'axios';

export interface LicenseData {
  name: string;
  number: string;
  issueDate: string;     // ISO
  expiryDate: string;    // ISO
  issuingAuthority: string;
  fileKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface License extends LicenseData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = "https://company-documnets.onrender.com/api/licenses";

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

export async function listLicenses(
  page = 1,
  perPage = 25
): Promise<{ items: License[]; total: number }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { page, limit: perPage } })
  );
  const json = res;

  const items: License[] =
    Array.isArray(json?.data?.licenses) ? json.data.licenses :
    Array.isArray(json?.licenses) ? json.licenses :
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

export async function getLicense(id: string) {
  return handleAxios<License>(axios.get(`${API_BASE}/${id}`));
}

export async function createLicense(payload: LicenseData) {
  return handleAxios<License>(axios.post(API_BASE, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function updateLicense(id: string, payload: Partial<LicenseData>) {
  return handleAxios<License>(axios.put(`${API_BASE}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function deleteLicense(id: string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}

export const getLicenseById = getLicense;
export const updateLicenseById = updateLicense;