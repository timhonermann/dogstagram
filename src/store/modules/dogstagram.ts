import { Post } from "@/models";
import { auth, postsCollection } from "@/settings/firebase";
import firebase from "firebase";
import FieldValue = firebase.firestore.FieldValue;

interface DogstagramState {
  posts: Post[];
}

const state: DogstagramState = {
  posts: []
};

const getters = {
  allPosts: (state: DogstagramState) => state.posts
};

const actions = {
  async fetchPosts({ commit }: { commit: Function }) {
    const response = await postsCollection.get();
    const posts: Post[] = [];
    for (const doc of response.docs) {
      const receivedPosts = (doc.data()?.posts as Post[]) ?? [];
      console.log(receivedPosts);
      posts.push(...receivedPosts);
    }
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
    state.posts = posts;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
