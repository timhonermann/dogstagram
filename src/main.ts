import { createApp } from 'vue';
import firebase from 'firebase';
import router from './router'
import App from './App.vue';

const firebaseConfig = {
    apiKey: "AIzaSyACjs1obcB7QfVnYN9uid76zur8ZJz3Krc",
    authDomain: "weblab-dogstagram.firebaseapp.com",
    projectId: "weblab-dogstagram",
    storageBucket: "weblab-dogstagram.appspot.com",
    messagingSenderId: "350466434836",
    appId: "1:350466434836:web:40d12b5ce71e3f279b4401"
};

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
