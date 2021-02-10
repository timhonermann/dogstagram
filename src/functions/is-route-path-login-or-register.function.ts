import { RouteLocationNormalizedLoaded } from "vue-router";

export function isRoutePathLoginOrRegister(
  route: RouteLocationNormalizedLoaded
): boolean {
  return route.path === "/login" || route.path === "/register";
}
