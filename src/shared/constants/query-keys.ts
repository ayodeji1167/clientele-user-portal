/**
 * Central registry of react-query keys, grouped per feature, e.g.
 *
 * export const queryKey = {
 *   clients: { getAll: "clients-get-all", getById: "clients-get-by-id" },
 * };
 */
export const queryKey = {
  auth: { me: "auth-me" },
  workspace: { summary: "workspace-summary" },
  overview: {
    stat: "overview-stat",
    pendingRevisions: "overview-pending-revisions",
    deadlines: "overview-deadlines",
    meetings: "overview-meetings",
    activity: "overview-activity",
  },
};
