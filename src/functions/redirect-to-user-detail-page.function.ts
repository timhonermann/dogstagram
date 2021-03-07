import router from "@/router";

export function redirectToUserDetailPage(userId: string): void {
  router.replace(`/user/${userId}`);
}
