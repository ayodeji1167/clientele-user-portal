/**
 * Central registry of react-query keys, grouped per feature, e.g.
 *
 * export const queryKey = {
 *   clients: { getAll: "clients-get-all", getById: "clients-get-by-id" },
 * };
 */
export const queryKey = {
  auth: { me: "auth-me" },
};
