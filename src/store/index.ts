import { createStore } from "vuex";
import dogstagram from "./modules/dogstagram";
import { Post } from "@/models";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    dogstagram
  }
});
