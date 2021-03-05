import { sortPostsByPostedAtDate } from "@/functions";
import { Comment, Post } from "@/models";
import { auth, commentsCollection, postsCollection } from "@/settings/firebase";
import firebase from "firebase";
import FieldValue = firebase.firestore.FieldValue;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

interface DogstagramState {
  posts: Post[];
  comments: Map<string, Comment[]>;
}

const state: DogstagramState = {
  posts: [],
  comments: new Map<string, Comment[]>()
};

const getters = {
  allPosts: (state: DogstagramState) => state.posts,
  getComments: (state: DogstagramState) => {
    return (postUuid: string) => state.comments.get(postUuid);
  }
};

const actions = {
  fetchPosts({ commit }: { commit: Function }) {
    postsCollection.get().then((response: QuerySnapshot) => {
      const posts: Post[] = [];
      for (const doc of response.docs) {
        const receivedPosts = (doc.data()?.posts as Post[]) ?? [];
        posts.push(...receivedPosts);
      }
      console.log("unsorted: ", posts);
      const sortedPosts = sortPostsByPostedAtDate(posts);
      console.log("sorted: ", sortedPosts);
      commit("setPosts", sortedPosts);
    });
  },

  uploadPost({ commit }: { commit: Function }, post: Post) {
    postsCollection
      .doc(auth.currentUser?.uid)
      .update("posts", FieldValue.arrayUnion(post))
      .then(() => {
        commentsCollection
          .doc(post?.uuid)
          .set({ comments: [] })
          .then(() => commit("addPost", post));
      });
  },

  fetchComments({ commit }: { commit: Function }, postUuid: string) {
    commentsCollection
      .doc(postUuid)
      .get()
      .then((documentSnapshot: DocumentSnapshot) => {
        const comments = documentSnapshot.data()?.comments as Comment[];
        commit("setComments", { postUuid, comments });
      });
  },

  postComment(
    { commit }: { commit: Function },
    payload: { postUuid: string; comment: Comment }
  ) {
    commentsCollection
      .doc(payload.postUuid)
      .update("comments", FieldValue.arrayUnion(payload.comment))
      .then(() => commit("addComment", payload));
  }
};

const mutations = {
  setPosts: (state: DogstagramState, posts: Post[]) => {
    state.posts = posts;
  },

  addPost: (state: DogstagramState, post: Post) => {
    state.posts.push(post);
  },

  setComments: (
    state: DogstagramState,
    payload: { postUuid: string; comments: Comment[] }
  ) => {
    state.comments.set(payload.postUuid, payload.comments);
  },

  addComment: (
    state: DogstagramState,
    payload: { postUuid: string; comment: Comment }
  ) => {
    const comments: Comment[] = state.comments.get(payload.postUuid) ?? [];
    comments.push(payload.comment);
    state.comments.set(payload.postUuid, comments);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
