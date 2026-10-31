import annaDarryl from "@/assets/mock/anna-darryl.webp";
import lucyStreet from "@/assets/mock/lucy-street.webp";
import valerie from "@/assets/mock/valerie.webp";
import type { WorkspaceSummary } from "@/features/workspace/interface";

export const mockWorkspaceSummary: WorkspaceSummary = {
  id: "ws_q1_2026",
  name: "Q1 2026",
  avatarUrl: valerie,
  workspaceCount: 1,
  member: {
    id: "usr_valerie",
    fullName: "Valerie Izuagbe",
    email: "valerieiz@gmail.com",
    avatarUrl: valerie,
  },
  plan: {
    tier: "starter",
    name: "Starter",
    canCreateWorkspaces: false,
    usage: {
      clients: { used: 1, limit: 1 },
      templates: { used: 1, limit: 2 },
      storageGb: { used: 1.8, limit: 5 },
    },
  },
  recents: [
    {
      id: "cl_anna",
      portalId: "pt_anna",
      name: "Anna Darryl",
      avatarUrl: annaDarryl,
    },
    { id: "cl_kemi", portalId: "pt_kemi", name: "Kemi Owolabi" },
    {
      id: "cl_lucy",
      portalId: "pt_lucy",
      name: "Lucy Street",
      avatarUrl: lucyStreet,
    },
    { id: "cl_diane", portalId: "pt_diane", name: "Diane Johnson" },
  ],
  unread: { inquiries: 8, notifications: 3 },
};
