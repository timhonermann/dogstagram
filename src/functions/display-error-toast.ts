import { inject } from "vue";
import { Toast } from "vue-dk-toast";

export function displayErrorToast(message: string) {
  const toast = inject<Toast>("$toast");
  if (toast) {
    toast(message, { type: "error" });
  }
}
