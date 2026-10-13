// Type-safe route definitions for React Router. Each route exposes:
// - `path`: the React Router path string (e.g. '/clients/:id').
// - `generate`: builds a real URL from required path params and optional
//   query params, e.g. generate({ id: 12 }, { tab: 'notes' }).

// Extracts param keys from a path string ('/clients/:id' -> 'id').
type PathParam<Path extends string> =
  Path extends `${string}/:${infer Param}/${infer Rest}`
    ? Param | PathParam<`/${Rest}`>
    : Path extends `${string}/:${infer Param}`
      ? Param
      : never;

type Params<Path extends string> = {
  [Key in PathParam<Path>]: string | number;
};

export interface Route<Path extends string> {
  path: Path;
  generate: (
    params: Params<Path>,
    query?: Record<string, string | number | boolean | undefined | null>,
  ) => string;
}

export function defineRoute<Path extends string>(path: Path): Route<Path> {
  return {
    path,
    generate: (params, query) => {
      let url = path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
        const value = params[key as keyof typeof params];
        if (value === undefined || value === null) {
          throw new Error(
            `Missing required path parameter "${key}" for path "${path}"`,
          );
        }
        return encodeURIComponent(String(value));
      });

      if (query) {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(query)) {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        }
        const search = searchParams.toString();
        if (search) url += `?${search}`;
      }

      return url;
    },
  };
}
