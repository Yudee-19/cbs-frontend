import axios,  { type AxiosResponse } from "axios";

export type SupportTicketData = {
  id?: number | string;
  createdAt?: string;
  updatedAt?: string;
  ticketTitle: string;
  category?: string;
  priority?: string;
  department?: string;
  assignTo?: string;
  description?: string;
  submittedBy?: string;
  status?: string;
};

const API_BASE = "https://company-documnets.onrender.com/api/support";

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
export async function listSupportTickets(
  page = 1,
  perPage = 25
): Promise<{ items: SupportTicketData[]; total: number }> {
  const res = await handleAxios<any>(
    axios.get(API_BASE, { params: { page, limit: perPage } })
  );
  const json = res;

  const items: SupportTicketData[] =
    json?.data?.tickets ??
    [];

  const total: number = Number(
    json?.data?.pagination?.totalCount ?? json?.total ?? json?.count ?? items.length ?? 0
  );

  return { items, total };
}

export async function getSupportTicket(id: number | string) {
  return handleAxios<SupportTicketData>(axios.get(`${API_BASE}/${id}`));
}

export async function createSupportTicket(data: SupportTicketData) {
  return handleAxios<SupportTicketData>(
    axios.post(API_BASE, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function updateSupportTicket(
  id: number | string,
  data: Partial<SupportTicketData>
) {
  return handleAxios<SupportTicketData>(
    axios.put(`${API_BASE}/${id}`, data, { headers: { "Content-Type": "application/json" } })
  );
}

export async function deleteSupportTicket(id: number | string) {
  await handleAxios(axios.delete(`${API_BASE}/${id}`));
  return true;
}