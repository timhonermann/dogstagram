import { Post } from "@/models";

function getTime(date: Date): number {
  return date ? new Date(date).getTime() : 1;
}

export function sortPostsByPostedAtDate(posts: Post[]): Post[] {
  posts.sort((a: Post, b: Post): number => {
    return getTime(a.postedAt) - getTime(b.postedAt) > 0 ? 1 : -1;
  });

  return posts;
}
