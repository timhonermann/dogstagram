import { Account, Post } from "@/models";
import { postsCollection, usersCollection } from "@/settings/firebase";

export function setupFirestore(
  userId: string,
  account: Account
): Promise<void> {
  return usersCollection
    .doc(userId)
    .set({
      account
    })
    .then(() =>
      postsCollection.doc(userId).set({
        posts: [] as Post[]
      })
    );
}
