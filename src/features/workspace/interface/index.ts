export type PlanTier = "starter" | "individual" | "studio";

export type PlanUsage = {
  clients: { used: number; limit: number };
  templates: { used: number; limit: number };
  storageGb: { used: number; limit: number };
};

export type WorkspacePlan = {
  tier: PlanTier;
  name: string;
  /** Only paid tiers can own more than one workspace. */
  canCreateWorkspaces: boolean;
  /** Present when the plan has limits worth surfacing in the sidebar. */
  usage?: PlanUsage;
};

export type RecentClient = {
  id: string;
  portalId: string;
  name: string;
  avatarUrl?: string;
};

export type WorkspaceMember = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
};

export type WorkspaceSummary = {
  id: string;
  name: string;
  avatarUrl?: string;
  /** How many workspaces the signed-in member belongs to. */
  workspaceCount: number;
  member: WorkspaceMember;
  plan: WorkspacePlan;
  recents: RecentClient[];
  unread: { inquiries: number; notifications: number };
};
