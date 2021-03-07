import { getCurrentInstance } from "vue";
import { Toast } from "vue-dk-toast";

export function useToast(): Toast {
  return getCurrentInstance()?.appContext.provides.$toast;
}
