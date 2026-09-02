import { adminApiFetch } from './admin-client';

export type AdminItem = {
  uid: string;
  email: string;
  displayName: string | null;
  createdAt: string;
};

export type AdminCreateBody = {
  email: string;
  displayName?: string;
};

type AdminRow = {
  uid: string;
  email: string;
  display_name: string | null;
  created_at: string;
};

type CreateAdminResponse = {
  admin?: AdminRow;
  resetLink?: string;
};

function toAdminItem(row: AdminRow): AdminItem {
  return {
    uid: row.uid,
    email: row.email,
    displayName: row.display_name,
    createdAt: row.created_at,
  };
}

export async function listAdmins(): Promise<AdminItem[]> {
  const res = await adminApiFetch('/api/admin/admins');
  const rows = (await res.json()) as AdminRow[];
  return rows.map(toAdminItem);
}

export async function createAdmin(
  body: AdminCreateBody,
): Promise<{ admin: AdminItem; resetLink: string | null }> {
  const res = await adminApiFetch('/api/admin/admins', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const payload = (await res.json()) as CreateAdminResponse;
  return {
    admin: payload.admin ? toAdminItem(payload.admin) : (payload as unknown as AdminItem),
    resetLink: payload.resetLink ?? null,
  };
}

export async function deleteAdmin(uid: string): Promise<void> {
  await adminApiFetch(`/api/admin/admins/${encodeURIComponent(uid)}`, {
    method: 'DELETE',
  });
}