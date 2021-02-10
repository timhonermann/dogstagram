<template>
  <div class="register">
    <img class="logo" src="../assets/Logo.png" alt="dogstagram Logo" />
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input type="text" placeholder="E-Mail" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="Register" />
      <p>Have an account? <router-link to="/login">Login</router-link></p>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { ref } from "vue";

export default {
  name: "Register",
  setup() {
    const email = ref("");
    const password = ref("");

    const register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(user => {
          alert(user);
        })
        .catch(err => alert(err.message));
    };

    return {
      register,
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
}
</style>
