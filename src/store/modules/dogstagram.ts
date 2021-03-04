import { Post } from "@/models";
import { auth, postsCollection } from "@/settings/firebase";
import firebase from "firebase";
import admin from "firebase-admin";
import FieldValue = firebase.firestore.FieldValue;

interface DogstagramState {
  posts: Post[];
}

const state: DogstagramState = {
  posts: [
    {
      uuid: "1",
      userUid: "RzQ59mBObwV7U8dI2eF0ZhcrhwQ2",
      caption: "My First Uploaded Image",
      image: "https://picsum.photos/200/300"
    } as Post
  ]
};

const getters = {
  allPosts: (state: DogstagramState) => state.posts
};

const actions = {
  async fetchPosts({ commit }: { commit: Function }) {
    console.log("fetching Posts");
    const response = await postsCollection.get();
    console.log("Respone: ", response);
    const posts: Post[] = [];
    for (const doc of response.docs) {
      const receivedPosts = (doc.data()?.posts as Post[]) ?? [];
      console.log(receivedPosts);
      posts.push(...receivedPosts);
    }
    console.log("posts: ", posts);
    commit("setPosts", posts);
  },

  uploadPost({ commit }: { commit: Function }, post: Post) {
    postsCollection
      .doc(auth.currentUser?.uid)
      .update("posts", FieldValue.arrayUnion(post));
  }
};

const mutations = {
  setPosts: (state: DogstagramState, posts: Post[]) => {
    console.log("Setting: ", posts);
    state.posts = posts;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
