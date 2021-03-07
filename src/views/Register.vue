<template>
  <div class="register">
    <img class="logo" src="../assets/Logo.png" alt="dogstagram Logo" />
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <div class="form-container">
        <input class="input" type="text" placeholder="E-Mail" v-model="email" />
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <button class="input" @click="registerUser">Register</button>
        <p>Have an account? <router-link to="/login">Login</router-link></p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useToast } from "@/functions";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Register",
  setup() {
    const store = useStore();
    const toast = useToast();

    const email = ref("");
    const password = ref("");

    const registerUser = () => {
      store
        .dispatch("register", {
          email: email.value,
          password: password.value
        })
        .then(() => toast("Welcome to dogstagram", { type: "success" }))
        .catch(err => {
          toast(err.message, { type: "error" });
        });
    };

    return {
      registerUser,
      email,
      password
    };
  }
};
</script>

<style scoped lang="scss">
.register {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    width: 300px;
    height: auto;
  }

  .form-container {
    width: 250px;
    display: flex;
    flex-direction: column;

    .input {
      margin-bottom: 5px;
    }
  }
}
</style>
