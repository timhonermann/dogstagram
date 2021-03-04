import { ComponentPublicInstance } from "@vue/runtime-core";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./settings/firebase";
import DKToast from "vue-dk-toast";

let app: ComponentPublicInstance;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(DKToast, {
        duration: 3000,
        positionY: "top",
        positionX: "center"
      })
      .mount("#app");
  }
});
