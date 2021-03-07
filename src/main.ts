import { ComponentPublicInstance } from "@vue/runtime-core";
import { createApp } from "vue";
import DKToast from "vue-dk-toast";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./settings/firebase";

let app: ComponentPublicInstance;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(DKToast, {
        duration: 5000,
        positionY: "bottom",
        positionX: "center"
      })
      .mount("#app");
  }
});
