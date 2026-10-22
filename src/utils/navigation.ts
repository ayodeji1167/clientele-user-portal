/** Whether a nav item is active for the current pathname. */
export function matchPath(pathname: string, href: string, paths?: string[]) {
  if (pathname === href) return true;

  return (
    paths?.some((path) =>
      path === "/" ? pathname === "/" : pathname.startsWith(path),
    ) ?? false
  );
}
