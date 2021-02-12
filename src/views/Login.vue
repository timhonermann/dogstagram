<template>
  <div class="login">
    <img class="logo" src="../assets/Logo.png" alt="dogstagram Logo" />
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" placeholder="E-Mail" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="Login" />
      <p>
        Need an account? <router-link to="/register">Register here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
import router from "@/router";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");

    const login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => router.replace("/"))
        .catch(err => alert(err.message));
    };

    return {
      login,
      email,
      password
    };
  }
};
</script>

<style scoped lang="scss">
.login {
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
}
</style>
