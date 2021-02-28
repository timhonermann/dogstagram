<template>
  <div class="register">
    <img class="logo" src="../assets/logo.png" alt="dogstagram Logo" />
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
        <input class="input" type="submit" value="Register" />
        <p>Have an account? <router-link to="/login">Login</router-link></p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import firebase from "firebase";
import { ref } from "vue";
import { auth, usersCollection } from "@/settings/firebase";
import { Account } from "@/models";
import UserCredential = firebase.auth.UserCredential;

export default {
  name: "Register",
  setup() {
    const email = ref("");
    const password = ref("");

    const registerUser = () => {
      auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential: UserCredential) => {
          const name =
            userCredential.user?.email?.toLocaleLowerCase().split("@")[0] ?? "";
          const account: Account = {
            username: name,
            email: email.value.toLowerCase(),
            registeredAt:
              userCredential.user?.metadata.creationTime ??
              Date.now().toString()
          };
          usersCollection.doc(userCredential.user?.uid).set({
            account
          });

          router.replace("/home");
        })
        .catch(err => alert(err.message));
    };

    return {
      registerUser,
      email,
      password,
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
