<template>
  <div class="register">
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
import { ref } from 'vue';

export default {
  name: "Register",
  setup() {
    const email = ref('');
    const password = ref('');

    const register = () => {
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(user => {
        alert(user);
      }).catch(err => alert(err.message));
    }

    return {
      register,
      email,
      password,
    }
  }
}
</script>

<style scoped>

</style>
