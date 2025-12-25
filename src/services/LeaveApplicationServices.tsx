import axios, { type AxiosResponse } from 'axios';

export interface LeaveApplicationData {
  leaveType: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  reason: string;
  fileKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeaveApplication extends LeaveApplicationData {
  id: string;
  status?: string;
  approvedBy?: string;
  employeeId?: string;
}

const API_BASE = "https://company-documnets.onrender.com/api/leave-applications";

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

export async function listLeaveApplications(
  employeeId: string,
  page = 1,
  perPage = 25
): Promise<{ items: LeaveApplication[]; total: number }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { employeeId, page, limit: perPage } })
  );
  const json = res;

  const items: LeaveApplication[] =
    Array.isArray(json?.data?.leaveApplications) ? json.data.leaveApplications :
    [];

  const total: number = Number(
    json?.data?.pagination?.totalCount ??
      json?.total ??
      json?.count ??
      (Array.isArray(items) ? items.length : 0)
  );

  return { items, total };
}

export async function getLeaveApplication(id: string) {
  return handleAxios<LeaveApplication>(axios.get(`${API_BASE}/${id}`));
}

export async function createLeaveApplication(employeeId: string, payload: LeaveApplicationData) {
  // POST /api/leave-applications/{employeeId}
  return handleAxios<LeaveApplication>(
    axios.post(`${API_BASE}/${encodeURIComponent(employeeId)}`, payload, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

export async function updateLeaveApplication(id: string, payload: Partial<LeaveApplicationData>) {
  return handleAxios<LeaveApplication>(axios.put(`${API_BASE}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  }));
}

export async function deleteLeaveApplication(id: string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}

export const getLeaveApplicationById = getLeaveApplication;
export const updateLeaveApplicationById = updateLeaveApplication;