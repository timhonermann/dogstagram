import { sortPostsByPostedAtDate } from "@/functions";
import { Account, Comment, Post } from "@/models";
import {
  auth,
  commentsCollection,
  postsCollection,
  usersCollection
} from "@/settings/firebase";
import firebase from "firebase";
import FieldValue = firebase.firestore.FieldValue;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import DocumentData = firebase.firestore.DocumentData;

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
        const comments: Comment[] = documentSnapshot.data()
          ?.comments as Comment[];
        commit("setComments", { postUuid, comments });

        const usernames = new Map<string, string>();
        usersCollection.get().then((querySnapshot: QuerySnapshot) => {
          for (const doc of querySnapshot.docs) {
            const account = doc.data()?.account as Account;
            usernames.set(doc.id, account.username);
          }
          commit("updateCommentUsernames", { postUuid, usernames });
        });
      });
  },

  postComment(
    { commit }: { commit: Function },
    payload: { postUuid: string; comment: Comment }
  ) {
    commentsCollection
      .doc(payload.postUuid)
      .update("comments", FieldValue.arrayUnion(payload.comment))
      .then(() => {
        usersCollection
          .doc(auth.currentUser?.uid)
          .get()
          .then((documentSnapshot: DocumentSnapshot) => {
            const account = documentSnapshot.data()?.account as Account;
            payload.comment.username = account.username;
            commit("addComment", payload);
          });
      });
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
  },

  updateCommentUsernames: (
    state: DogstagramState,
    payload: { postUuid: string; usernames: Map<string, string> }
  ) => {
    const comments: Comment[] = state.comments.get(payload.postUuid) ?? [];
    for (const comment of comments) {
      const username = payload.usernames.get(comment.userUid);
      if (comment.username !== username) {
        comment.username = username;
        state.comments.get(payload.postUuid);
      }
    }
    state.comments.set(payload.postUuid, comments);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
