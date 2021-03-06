import { Account, Post } from "@/models";
import { postsCollection, usersCollection } from "@/settings/firebase";

export function setupFirestore(userId: string, account: Account): void {
  usersCollection.doc(userId).set({
    account
  });

  postsCollection.doc(userId).set({
    posts: [] as Post[]
  });
}
