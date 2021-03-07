import { sortPostsByPostedAtDate, useToast } from "@/functions";
import { setupFirestore } from "@/functions/setup-firestore.function";
import { Account, Comment, Post } from "@/models";
import router from "@/router";
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
import UserCredential = firebase.auth.UserCredential;

interface DogstagramState {
  isLoggedIn: boolean;
  account: Account;
  posts: Post[];
  comments: Map<string, Comment[]>;
  usernames: Map<string, string>;
  isLoading: boolean;
}

const state: DogstagramState = {
  isLoggedIn: false,
  account: {} as Account,
  posts: [],
  comments: new Map<string, Comment[]>(),
  usernames: new Map<string, string>(),
  isLoading: false
};

const getters = {
  isLoggedIn: (state: DogstagramState) => state.isLoggedIn,
  isLoading: (state: DogstagramState) => state.isLoading,
  getAccount: (state: DogstagramState) => state.account,
  allPosts: (state: DogstagramState) => state.posts,
  userPosts: (state: DogstagramState) => {
    return (userId: string) =>
      state.posts.filter((post: Post) => post.userUid == userId);
  },
  getComments: (state: DogstagramState) => {
    return (postUuid: string) => state.comments.get(postUuid);
  },
  getUsername: (state: DogstagramState) => {
    return (userId: string) => state.usernames.get(userId);
  }
};

const actions = {
  login(
    { commit }: { commit: Function },
    payload: { email: string; password: string }
  ) {
    return auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit("setLoggedIn", true);
        router.replace("/");
      });
  },

  logout({ commit }: { commit: Function }) {
    return auth.signOut().then(() => {
      commit("setLoggedIn", false);
      router.replace("/login");
    });
  },

  register(
    { commit }: { commit: Function },
    payload: { email: string; password: string }
  ) {
    return auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential: UserCredential) => {
        let name =
          userCredential.user?.email?.toLocaleLowerCase().split("@")[0] ?? "";
        if (name.length > 16) {
          name = name.substring(0, 16);
        }

        const account: Account = {
          username: name,
          email: payload.email.toLowerCase(),
          registeredAt:
            userCredential.user?.metadata.creationTime ?? Date.now().toString()
        };

        if (userCredential.user?.uid) {
          setupFirestore(userCredential.user?.uid, account).then(() =>
            router.replace("/home")
          );
        }

        commit("setLoggedIn", true);
      });
  },

  fetchPosts({ commit }: { commit: Function }) {
    postsCollection.get().then((response: QuerySnapshot) => {
      const posts: Post[] = [];
      for (const doc of response.docs) {
        const data = doc.data();
        const receivedPosts = (doc.data()?.posts as Post[]) ?? [];
        receivedPosts.map(
          (post: any) => (post.postedAt = post.postedAt.toDate())
        );
        posts.push(...receivedPosts);
      }
      const sortedPosts = sortPostsByPostedAtDate(posts);
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
  },

  fetchAccount({ commit }: { commit: Function }, payload: { userId: string }) {
    usersCollection
      .doc(payload.userId)
      .get()
      .then((documentSnapshot: DocumentSnapshot) => {
        commit("setAccount", documentSnapshot.data()?.account);
      });
  },

  updateUsername(
    { commit }: { commit: Function },
    payload: { userId: string; username: string }
  ) {
    usersCollection
      .doc(payload.userId)
      .update({
        "account.username": payload.username
      })
      .then(() => commit("setAccountUsername", payload));
  },

  fetchUsername({ commit }: { commit: Function }, payload: { userId: string }) {
    usersCollection
      .doc(payload.userId)
      .get()
      .then((documentSnapshot: DocumentSnapshot) => {
        const username = documentSnapshot.data()?.account?.username;

        commit("setUsername", { userId: payload.userId, username: username });
      });
  }
};

const mutations = {
  setLoggedIn: (state: DogstagramState, isLoggedIn: boolean) => {
    state.isLoggedIn = isLoggedIn;
  },

  setIsLoading: (state: DogstagramState, isLoading: boolean) => {
    state.isLoading = isLoading;
  },

  setAccount: (state: DogstagramState, account: Account) => {
    state.account = account;
  },

  setAccountUsername: (
    state: DogstagramState,
    payload: { userId: string; username: string }
  ) => {
    state.account.username = payload.username;
    state.usernames.set(payload.userId, payload.username);
  },

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
  },

  setUsername: (
    state: DogstagramState,
    payload: { userId: string; username: string }
  ) => {
    state.usernames.set(payload.userId, payload.username);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
